/**
 * Columns API Client with dependency injection
 * Uses any axios instance (client or server)
 */

import type { AxiosInstance } from "axios";
import hmacAxios from "~/lib/hmac-axios";
import { type Prisma } from "@prisma/client";

// Types based on your Prisma schema and API responses
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
}

export interface Comment {
  id: string;
  content: string;
  cardId: string;
  createdById: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Card {
  id: string;
  name: string | null;
  content: string | null;
  position: number;
  columnId: string;
  createdById: string;
  archived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  createdBy: User;
  column: Column;
}

export interface Column {
  id: string;
  name: string | null;
  position: number;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColumnWithCards extends Column {
  cards: Card[];
}

export interface CreateColumnData {
  boardId: string;
  name: string | null;
}

export interface UpdateColumnData {
  name: string;
  userId: string;
}

export interface GetColumnsParams {
  includeArchived?: boolean;
}

/**
 * Columns API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class ColumnsAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * Get columns for a board with optional cards
   */
  async getColumns(
    boardId: string,
    params?: GetColumnsParams,
  ): Promise<
    Prisma.ColumnGetPayload<{
      include: {
        cards: true;
      };
    }>[]
  > {
    const queryParams = params?.includeArchived
      ? { includeArchived: "true" }
      : {};

    const response = await this.axios.get<
      Prisma.ColumnGetPayload<{
        include: {
          cards: true;
        };
      }>[]
    >(`/columns/${boardId}`, { params: queryParams });
    return response.data;
  }

  /**
   * Create a new column
   */
  async createColumn(data: CreateColumnData): Promise<Column> {
    const response = await this.axios.post<Column>("/columns", data);
    return response.data;
  }

  /**
   * Update a column
   */
  async updateColumn(
    columnId: string,
    data: UpdateColumnData,
  ): Promise<Column> {
    const response = await this.axios.put<Column>(`/columns/${columnId}`, data);
    return response.data;
  }

  /**
   * Delete a column
   */
  async deleteColumn(columnId: string): Promise<{ id: string }> {
    const response = await this.axios.delete<{ id: string }>(
      `/columns/${columnId}`,
    );
    return response.data;
  }
}

// Create convenient instances for different environments
export const ClientColumnsAPI = new ColumnsAPIClient(
  hmacAxios.getAxiosInstance(),
);

// Export the class as default for flexibility
export default ColumnsAPIClient;
