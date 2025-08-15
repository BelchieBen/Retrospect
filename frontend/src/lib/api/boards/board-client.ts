/**
 * Board API Client with dependency injection
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

export interface Board {
  id: string;
  name: string;
  ownerId: string;
  archived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardMember {
  id: string;
  boardId: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  name: string;
  position: number;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardWithDetails extends Board {
  columns: Column[];
  BoardMembers: BoardMember[];
}

export interface UserWithBoards {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
  BoardMembers: Array<{
    id: string;
    boardId: string;
    userId: string;
    board: Board;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface CreateBoardData {
  title: string;
  ownerId: string;
}

export interface CreateBoardFromTemplateData {
  templateId: string;
  boardName: string;
  columns: Array<{
    name: string;
    position: number;
  }>;
}

export interface JoinBoardData {
  userId: string;
  boardId: string;
}

export interface ArchiveBoardData {
  archived: boolean;
  userId: string;
}

export interface DeleteBoardData {
  userId: string;
}

export interface DashboardStats {
  totalBoards: number;
  teamMembers: number;
  recentActivity: number;
}

/**
 * Board API Client
 * Uses dependency injection for axios instance (client or server)
 */
export class BoardAPIClient {
  private axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * Get all boards for the current user
   */
  async getBoards(): Promise<UserWithBoards | null> {
    const response = await this.axios.get<UserWithBoards | null>("/boards");
    return response.data;
  }

  /**
   * Get recent boards for the current user (last 3)
   */
  async getRecentBoards(): Promise<
    Array<{
      id: string;
      boardId: string;
      userId: string;
      board: Board;
      createdAt: string;
      updatedAt: string;
    }>
  > {
    const response = await this.axios.get<
      Array<{
        id: string;
        boardId: string;
        userId: string;
        board: Board;
        createdAt: string;
        updatedAt: string;
      }>
    >("/boards/recent");
    return response.data;
  }

  /**
   * Get a specific board with details
   */
  async getBoard(boardId: string): Promise<BoardWithDetails | null> {
    const response = await this.axios.get<BoardWithDetails | null>(
      `/boards/${boardId}`,
    );
    return response.data;
  }

  /**
   * Get board members
   */
  async getBoardMembers(boardId: string): Promise<BoardMember[]> {
    const response = await this.axios.get<BoardMember[]>(
      `/boards/${boardId}/members`,
    );
    return response.data;
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await this.axios.get<DashboardStats>(
      "/boards/dashboard/stats",
    );
    return response.data;
  }

  /**
   * Create a new board
   */
  async createBoard(data: CreateBoardData): Promise<Board> {
    const response = await this.axios.post<Board>("/boards", data);
    return response.data;
  }

  /**
   * Create a board from template
   */
  async createBoardFromTemplate(
    data: CreateBoardFromTemplateData,
  ): Promise<BoardWithDetails> {
    const response = await this.axios.post<BoardWithDetails>(
      "/boards/from-template",
      data,
    );
    return response.data;
  }

  /**
   * Join a board
   */
  async joinBoard(data: JoinBoardData): Promise<{
    success: boolean;
    alreadyMember: boolean;
  }> {
    const response = await this.axios.post<{
      success: boolean;
      alreadyMember: boolean;
    }>("/boards/join", data);
    return response.data;
  }

  /**
   * Archive or unarchive a board
   */
  async archiveBoard(boardId: string, data: ArchiveBoardData): Promise<Board> {
    const response = await this.axios.patch<Board>(
      `/boards/${boardId}/archive`,
      data,
    );
    return response.data;
  }

  /**
   * Delete a board
   */
  async deleteBoard(
    boardId: string,
    data: DeleteBoardData,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const response = await this.axios.delete<{
      success: boolean;
      message: string;
    }>(`/boards/${boardId}`, { data });
    return response.data;
  }
}

// Create convenient instances for different environments
export const ClientBoardAPI = new BoardAPIClient(hmacAxios.getAxiosInstance());

// Export the class as default for flexibility
export default BoardAPIClient;
