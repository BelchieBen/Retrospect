/**
 * HMAC-enabled Axios client for frontend
 * Automatically adds HMAC authentication headers to all requests
 */

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import CryptoJS from "crypto-js";
import { env } from "~/env";

interface HMACPayload {
  userId: string;
  timestamp: number;
  requestData?: unknown;
}

interface HMACAxiosConfig extends AxiosRequestConfig {
  skipHMAC?: boolean; // Allow skipping HMAC for specific requests
}

class HMACAxiosClient {
  private axiosInstance: AxiosInstance;
  private userId: string | null = null;
  private hmacSecret: string;

  constructor(baseURL?: string) {
    // Get HMAC secret from environment
    this.hmacSecret = env.NEXT_PUBLIC_HMAC_SECRET;

    if (!this.hmacSecret) {
      console.warn("HMAC_SECRET not configured.");
    }

    // Create axios instance
    this.axiosInstance = axios.create({
      baseURL: baseURL ?? env.NEXT_PUBLIC_SOCKET_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor for HMAC authentication
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => this.addHMACHeaders(config),
      (error: unknown) =>
        Promise.reject(
          error instanceof Error ? error : new Error(String(error)),
        ),
    );

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.warn("HMAC Authentication failed:", error.response?.data);
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * Set the current user ID for HMAC authentication
   */
  setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Clear the current user ID
   */
  clearUserId(): void {
    this.userId = null;
  }

  /**
   * Generate HMAC signature for a payload
   */
  private generateHMACSignature(payload: HMACPayload): string {
    if (!this.hmacSecret) {
      throw new Error("HMAC_SECRET not configured");
    }

    const hash = CryptoJS.HmacSHA256(JSON.stringify(payload), this.hmacSecret);
    return hash.toString();
  }

  /**
   * Create HMAC authentication headers
   */
  private createAuthHeaders(requestData?: unknown): {
    "x-hmac-signature": string;
    "x-hmac-payload": string;
  } {
    if (!this.userId) {
      throw new Error(
        "User ID not set. Call setUserId() before making authenticated requests.",
      );
    }

    const payload: HMACPayload = {
      userId: this.userId,
      timestamp: Date.now(),
      requestData,
    };

    const signature = this.generateHMACSignature(payload);
    const encodedPayload = btoa(JSON.stringify(payload));

    return {
      "x-hmac-signature": signature,
      "x-hmac-payload": encodedPayload,
    };
  }

  /**
   * Add HMAC headers to axios request config
   */
  private addHMACHeaders(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    // Skip HMAC if explicitly disabled for this request
    if ((config as HMACAxiosConfig).skipHMAC) {
      return config;
    }

    // Skip HMAC if no user ID is set
    if (!this.userId) {
      console.warn(
        "No user ID set for HMAC authentication. Request will be sent without authentication.",
        {
          url: config.url,
          method: config.method,
        },
      );
      return config;
    }

    try {
      // Parse request data for HMAC
      let requestData: unknown;
      if (config.data) {
        try {
          requestData =
            typeof config.data === "string"
              ? JSON.parse(config.data)
              : config.data;
        } catch {
          requestData = config.data;
        }
      }

      // Generate and add HMAC headers
      const authHeaders = this.createAuthHeaders(requestData);

      // Use Object.assign to properly set headers
      Object.assign(config.headers, authHeaders);

      return config;
    } catch (error) {
      console.error("Failed to generate HMAC headers:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  /**
   * Get the underlying axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  // Expose all axios methods with proper typing
  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.get(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.patch(url, data, config);
  }

  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.delete(url, config);
  }

  head<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.head(url, config);
  }

  options<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.options(url, config);
  }

  request<T = unknown, R = AxiosResponse<T>>(
    config: HMACAxiosConfig,
  ): Promise<R> {
    return this.axiosInstance.request(config);
  }
}

// Create and export a default instance
const hmacAxios = new HMACAxiosClient();

// Export the class for creating custom instances
export { HMACAxiosClient };

// Export the default instance
export default hmacAxios;

// Also export as 'axios' for easy replacement in existing code
export { hmacAxios as axios };

// Export types
export type { HMACPayload, HMACAxiosConfig };
