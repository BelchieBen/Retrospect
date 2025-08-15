/**
 * Server-side Members API instance
 * Uses server HMAC axios with NextAuth session
 */

import MembersAPIClient from "./members-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerMembersAPI = new MembersAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type {
  User,
  Team,
  TeamMember,
  TeamWithMembers,
  UserTeamMembership,
  CreateTeamData,
  UpdateTeamData,
} from "./members-client";
