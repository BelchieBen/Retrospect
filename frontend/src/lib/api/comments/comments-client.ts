/**
 * Comments API Client with dependency injection
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

export interface Comment {
  id: string;
  value: string;
  cardId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
}

export interface CreateCommentData {
  value: string;
  userId: string;
  cardId: string;
}

/**
 * Comments API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class CommentsAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * Get all comments for a card
   */
  async getComments(cardId: string): Promise<Comment[]> {
    const response = await this.axios.get<Comment[]>(`/comments/${cardId}`);
    return response.data;
  }

  /**
   * Create a new comment
   */
  async createComment(data: CreateCommentData): Promise<Comment> {
    const response = await this.axios.post<Comment>("/comments", data);
    return response.data;
  }
}

// Create convenient instances for different environments
export const ClientCommentsAPI = new CommentsAPIClient(
  hmacAxios.getAxiosInstance(),
);

// Export the class as default for flexibility
export default CommentsAPIClient;
