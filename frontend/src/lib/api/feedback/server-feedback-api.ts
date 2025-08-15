/**
 * Server-side Feedback API instance
 * Uses server HMAC axios with NextAuth session
 */

import FeedbackAPIClient from "./feedback-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerFeedbackAPI = new FeedbackAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type {
  User,
  Feedback,
  CreateFeedbackData,
  FeedbackType,
} from "./feedback-client";
