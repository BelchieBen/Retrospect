/**
 * Server-side Columns API instance
 * Uses server HMAC axios with NextAuth session
 */

import ColumnsAPIClient from "./columns-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerColumnsAPI = new ColumnsAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type {
  User,
  Comment,
  Card,
  Column,
  ColumnWithCards,
  CreateColumnData,
  UpdateColumnData,
  GetColumnsParams,
} from "./columns-client";
