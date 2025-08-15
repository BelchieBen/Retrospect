/**
 * Server-side Users API instance
 * Uses server HMAC axios with NextAuth session
 */

import UsersAPIClient from "./users-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerUsersAPI = new UsersAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type { User, CreateUserData } from "./users-client";
