/**
 * Server-side HMAC-enabled Axios client
 * For use in React Server Components and API routes
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
import { getServerAuthSession } from "~/server/auth";

interface HMACPayload {
  userId: string;
  timestamp: number;
  requestData?: unknown;
}

class ServerHMACAxiosClient {
  private axiosInstance: AxiosInstance;
  private hmacSecret: string;

  constructor(baseURL?: string) {
    // Get server-side HMAC secret
    this.hmacSecret = env.HMAC_SECRET;

    if (!this.hmacSecret) {
      console.warn("Server HMAC_SECRET not configured.");
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
      async (config: InternalAxiosRequestConfig) =>
        await this.addHMACHeaders(config),
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
          console.warn(
            "Server HMAC Authentication failed:",
            error.response?.data,
          );
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * Generate HMAC signature for a payload
   */
  private generateHMACSignature(payload: HMACPayload): string {
    if (!this.hmacSecret) {
      throw new Error("Server HMAC_SECRET not configured");
    }

    const hash = CryptoJS.HmacSHA256(JSON.stringify(payload), this.hmacSecret);
    return hash.toString();
  }

  /**
   * Create HMAC authentication headers
   */
  private async createAuthHeaders(requestData?: unknown): Promise<{
    "x-hmac-signature": string;
    "x-hmac-payload": string;
  }> {
    const session = await getServerAuthSession();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const payload: HMACPayload = {
      userId: session.user.id,
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
  private async addHMACHeaders(
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
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
      const authHeaders = await this.createAuthHeaders(requestData);

      // Use Object.assign to properly set headers
      Object.assign(config.headers, authHeaders);

      return config;
    } catch (error) {
      console.error("Failed to generate server HMAC headers:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  /**
   * Get the underlying axios instance for use with MembersAPIClient
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Create and export a default server instance
const serverHMACAxios = new ServerHMACAxiosClient();

export default serverHMACAxios;
