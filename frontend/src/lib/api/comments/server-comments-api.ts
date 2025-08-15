/**
 * Server-side Comments API instance
 * Uses server HMAC axios with NextAuth session
 */

import CommentsAPIClient from "./comments-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerCommentsAPI = new CommentsAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type { User, Comment, CreateCommentData } from "./comments-client";
