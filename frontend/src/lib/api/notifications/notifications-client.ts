/**
 * Notifications API Client with dependency injection
 * Uses any axios instance (client or server)
 */

import type { AxiosInstance } from "axios";
import hmacAxios from "~/lib/hmac-axios";

// Types based on your Prisma schema and API responses
export interface User {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Board {
  id: string;
  name: string | null;
}

export interface Card {
  id: string;
  name: string | null;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: string;
  userId: string;
  createdByUserId: string | null;
  boardId: string | null;
  cardId: string | null;
  read: boolean;
  dismissed: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdByUser?: User | null;
  board?: Board | null;
  card?: Card | null;
}

export interface GetNotificationsParams {
  includeRead?: boolean;
  includeDismissed?: boolean;
  limit?: number;
}

export interface CreateNotificationData {
  title: string;
  content: string;
  type: string;
  userId: string;
  createdByUserId?: string;
  boardId?: string;
  cardId?: string;
}

export interface MarkReadData {
  userId: string;
}

export interface DismissData {
  userId: string;
}

export interface NotificationCount {
  unreadCount: number;
}

export interface MarkAllReadResponse {
  count: number;
}

/**
 * Notifications API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class NotificationsAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * Get notifications for a user
   */
  async getNotifications(
    userId: string,
    params?: GetNotificationsParams,
  ): Promise<Notification[]> {
    const queryParams: Record<string, string> = {};

    if (params?.includeRead !== undefined) {
      queryParams.includeRead = params.includeRead.toString();
    }
    if (params?.includeDismissed !== undefined) {
      queryParams.includeDismissed = params.includeDismissed.toString();
    }
    if (params?.limit !== undefined) {
      queryParams.limit = params.limit.toString();
    }

    const response = await this.axios.get<Notification[]>(
      `/notifications/${userId}`,
      { params: queryParams },
    );
    return response.data;
  }

  /**
   * Get notification count for a user
   */
  async getNotificationCount(userId: string): Promise<NotificationCount> {
    const response = await this.axios.get<NotificationCount>(
      `/notifications/${userId}/count`,
    );
    return response.data;
  }

  /**
   * Create a notification
   */
  async createNotification(
    data: CreateNotificationData,
  ): Promise<Notification> {
    const response = await this.axios.post<Notification>(
      "/notifications",
      data,
    );
    return response.data;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(
    notificationId: string,
    data: MarkReadData,
  ): Promise<Notification> {
    const response = await this.axios.patch<Notification>(
      `/notifications/${notificationId}/read`,
      data,
    );
    return response.data;
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string): Promise<MarkAllReadResponse> {
    const response = await this.axios.patch<MarkAllReadResponse>(
      `/notifications/${userId}/read-all`,
    );
    return response.data;
  }

  /**
   * Dismiss notification
   */
  async dismiss(
    notificationId: string,
    data: DismissData,
  ): Promise<Notification> {
    const response = await this.axios.patch<Notification>(
      `/notifications/${notificationId}/dismiss`,
      data,
    );
    return response.data;
  }
}

// Create convenient instances for different environments
export const ClientNotificationsAPI = new NotificationsAPIClient(
  hmacAxios.getAxiosInstance(),
);

// Export the class as default for flexibility
export default NotificationsAPIClient;
