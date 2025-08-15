/**
 * Users API Client with dependency injection
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
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  name: string;
}

/**
 * Users API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class UsersAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * Create a new user
   */
  async createUser(data: CreateUserData): Promise<User> {
    const response = await this.axios.post<User>("/users", data);
    return response.data;
  }

  /**
   * Get all users (from members endpoint)
   * This endpoint is used for team membership management
   */
  async getAllUsers(): Promise<User[]> {
    const response = await this.axios.get<User[]>("/members/users");
    return response.data;
  }
}

// Create convenient instances for different environments
export const ClientUsersAPI = new UsersAPIClient(hmacAxios.getAxiosInstance());

// Export the class as default for flexibility
export default UsersAPIClient;
