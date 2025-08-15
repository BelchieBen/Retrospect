/**
 * Cards API Client with dependency injection
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
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Card {
  id: string;
  name: string | null;
  content: string | null;
  description: string | null;
  position: number;
  columnId: string;
  boardId: string;
  createdById: string;
  archived: boolean;
  archivedAt: Date | null;
  gifUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  attachments?: Attachment[];
  createdBy?: User;
}

export interface Post {
  id: string;
  // Add other post fields if needed
}

export interface CreateCardData {
  title: string | null;
  userId: string;
  columnId: string;
  boardId: string;
}

export interface UpdateCardData {
  name?: string | null;
  description?: string;
  gifUrl?: string;
  columnId?: string | null;
  position?: number | null;
  attachments?: { name: string; url: string }[] | null;
  userId: string;
}

export interface ArchiveCardData {
  archived: boolean;
  userId: string;
}

export interface DeleteCardData {
  userId: string;
}

/**
 * Cards API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class CardsAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * Get all posts (legacy endpoint)
   */
  async getPosts(): Promise<Post[]> {
    const response = await this.axios.get<Post[]>("/cards");
    return response.data;
  }

  /**
   * Create a new card
   */
  async createCard(data: CreateCardData): Promise<Card> {
    const response = await this.axios.post<Card>("/cards", data);
    return response.data;
  }

  /**
   * Update a card
   * Handles both simple updates and position/column changes
   */
  async updateCard(cardId: string, data: UpdateCardData): Promise<Card> {
    const response = await this.axios.put<Card>(`/cards/${cardId}`, data);
    return response.data;
  }

  /**
   * Archive or unarchive a card
   */
  async archiveCard(cardId: string, data: ArchiveCardData): Promise<Card> {
    const response = await this.axios.patch<Card>(
      `/cards/${cardId}/archive`,
      data,
    );
    return response.data;
  }

  /**
   * Delete a card permanently
   */
  async deleteCard(
    cardId: string,
    data: DeleteCardData,
  ): Promise<{ id: string }> {
    const response = await this.axios.delete<{ id: string }>(
      `/cards/${cardId}`,
      { data },
    );
    return response.data;
  }

  /**
   * Move a card to a different column and/or position
   * This is a convenience method for updateCard with position changes
   */
  async moveCard(
    cardId: string,
    columnId: string,
    position: number,
    userId: string,
  ): Promise<Card> {
    return this.updateCard(cardId, {
      columnId,
      position,
      userId,
    });
  }

  /**
   * Update card content only (name, description, gif, attachments)
   * This is a convenience method for updateCard without position changes
   */
  async updateCardContent(
    cardId: string,
    data: {
      name?: string | null;
      description?: string;
      gifUrl?: string;
      attachments?: { name: string; url: string }[] | null;
      userId: string;
    },
  ): Promise<Card> {
    return this.updateCard(cardId, data);
  }
}

// Create convenient instances for different environments
export const ClientCardsAPI = new CardsAPIClient(hmacAxios.getAxiosInstance());

// Export the class as default for flexibility
export default CardsAPIClient;
