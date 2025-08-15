/**
 * Feedback API Client with dependency injection
 * Uses any axios instance (client or server)
 */

import type { AxiosInstance } from "axios";
import hmacAxios from "~/lib/hmac-axios";

// Types based on your Prisma schema and API responses
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
}

export interface Feedback {
  id: string;
  type: string;
  subject: string;
  message: string;
  email: string | null;
  anonymous: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User | null;
}

export interface CreateFeedbackData {
  type: string;
  subject: string;
  message: string;
  email?: string;
  anonymous: boolean;
  userId?: string;
}

export type FeedbackType = "bug" | "feature" | "improvement" | "general";

/**
 * Feedback API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class FeedbackAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * Get all feedback (admin endpoint)
   */
  async getAllFeedback(): Promise<Feedback[]> {
    const response = await this.axios.get<Feedback[]>("/feedback");
    return response.data;
  }

  /**
   * Create new feedback
   */
  async createFeedback(data: CreateFeedbackData): Promise<Feedback> {
    const response = await this.axios.post<Feedback>("/feedback", data);
    return response.data;
  }

  /**
   * Get feedback by user ID (for user's own feedback)
   */
  async getUserFeedback(userId: string): Promise<Feedback[]> {
    const response = await this.axios.get<Feedback[]>(
      `/feedback/user/${userId}`,
    );
    return response.data;
  }

  /**
   * Get single feedback item by ID
   */
  async getFeedback(id: string): Promise<Feedback> {
    const response = await this.axios.get<Feedback>(`/feedback/${id}`);
    return response.data;
  }
}

// Create convenient instances for different environments
export const ClientFeedbackAPI = new FeedbackAPIClient(
  hmacAxios.getAxiosInstance(),
);

// Export the class as default for flexibility
export default FeedbackAPIClient;
