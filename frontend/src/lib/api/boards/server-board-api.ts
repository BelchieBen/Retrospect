/**
 * Server-side Board API instance
 * Uses server HMAC axios with NextAuth session
 */

import BoardAPIClient from "./board-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerBoardAPI = new BoardAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type {
  User,
  Board,
  BoardMember,
  Column,
  BoardWithDetails,
  UserWithBoards,
  CreateBoardData,
  CreateBoardFromTemplateData,
  JoinBoardData,
  ArchiveBoardData,
  DeleteBoardData,
  DashboardStats,
} from "./board-client";
