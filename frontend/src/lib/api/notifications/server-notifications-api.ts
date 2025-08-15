/**
 * Server-side Notifications API instance
 * Uses server HMAC axios with NextAuth session
 */

import NotificationsAPIClient from "./notifications-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerNotificationsAPI = new NotificationsAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type {
  User,
  Board,
  Card,
  Notification,
  GetNotificationsParams,
  CreateNotificationData,
  MarkReadData,
  DismissData,
  NotificationCount,
  MarkAllReadResponse,
} from "./notifications-client";
