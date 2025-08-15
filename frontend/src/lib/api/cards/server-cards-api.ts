/**
 * Server-side Cards API instance
 * Uses server HMAC axios with NextAuth session
 */

import CardsAPIClient from "./cards-client";
import serverHMACAxios from "~/lib/server-hmac-axios";

// Create server-side instance with server HMAC axios
export const ServerCardsAPI = new CardsAPIClient(
  serverHMACAxios.getAxiosInstance(),
);

// Re-export types for convenience
export type {
  User,
  Attachment,
  Card,
  Post,
  CreateCardData,
  UpdateCardData,
  ArchiveCardData,
  DeleteCardData,
} from "./cards-client";
