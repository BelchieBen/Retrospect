/**
 * React Query hooks for board API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ClientBoardAPI,
  type CreateBoardData,
  type CreateBoardFromTemplateData,
  type JoinBoardData,
  type ArchiveBoardData,
  type DeleteBoardData,
  type UserWithBoards,
} from "./board-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const boardKeys = {
  all: ["boards"] as const,
  lists: () => [...boardKeys.all, "list"] as const,
  list: (filters: string) => [...boardKeys.lists(), { filters }] as const,
  details: () => [...boardKeys.all, "detail"] as const,
  detail: (id: string) => [...boardKeys.details(), id] as const,
  recent: () => [...boardKeys.all, "recent"] as const,
  members: (boardId: string) => [...boardKeys.all, "members", boardId] as const,
  dashboardStats: () => [...boardKeys.all, "dashboard", "stats"] as const,
};

/**
 * Hook to get all boards for current user
 */
export function useBoards(initialData?: UserWithBoards | null) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: boardKeys.lists(),
    queryFn: () => ClientBoardAPI.getBoards(),
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutes
    initialData,
  });
}

/**
 * Hook to get recent boards
 */
export function useRecentBoards() {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: boardKeys.recent(),
    queryFn: () => ClientBoardAPI.getRecentBoards(),
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get a specific board
 */
export function useBoard(boardId: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: boardKeys.detail(boardId),
    queryFn: () => ClientBoardAPI.getBoard(boardId),
    enabled: isAuthenticated && !!boardId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to get board members
 */
export function useBoardMembers(boardId: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: boardKeys.members(boardId),
    queryFn: () => ClientBoardAPI.getBoardMembers(boardId),
    enabled: isAuthenticated && !!boardId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get dashboard statistics
 */
export function useDashboardStats() {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: boardKeys.dashboardStats(),
    queryFn: () => ClientBoardAPI.getDashboardStats(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to create a board
 */
export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBoardData) => ClientBoardAPI.createBoard(data),
    onSuccess: () => {
      // Invalidate and refetch boards data
      void queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: boardKeys.recent() });
      void queryClient.invalidateQueries({
        queryKey: boardKeys.dashboardStats(),
      });
    },
  });
}

/**
 * Hook to create a board from template
 */
export function useCreateBoardFromTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBoardFromTemplateData) =>
      ClientBoardAPI.createBoardFromTemplate(data),
    onSuccess: (data) => {
      // Update caches with new board
      queryClient.setQueryData(boardKeys.detail(data.id), data);
      // Invalidate lists
      void queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: boardKeys.recent() });
      void queryClient.invalidateQueries({
        queryKey: boardKeys.dashboardStats(),
      });
    },
  });
}

/**
 * Hook to join a board
 */
export function useJoinBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: JoinBoardData) => ClientBoardAPI.joinBoard(data),
    onSuccess: (_, variables) => {
      // Invalidate board details and members
      void queryClient.invalidateQueries({
        queryKey: boardKeys.detail(variables.boardId),
      });
      void queryClient.invalidateQueries({
        queryKey: boardKeys.members(variables.boardId),
      });
      // Invalidate user's boards list
      void queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: boardKeys.dashboardStats(),
      });
    },
  });
}

/**
 * Hook to archive/unarchive a board
 */
export function useArchiveBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      data,
    }: {
      boardId: string;
      data: ArchiveBoardData;
    }) => ClientBoardAPI.archiveBoard(boardId, data),
    onSuccess: (data, variables) => {
      // Update the specific board in cache
      queryClient.setQueryData(boardKeys.detail(variables.boardId), data);
      // Invalidate lists to reflect archive status changes
      void queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: boardKeys.recent() });
    },
  });
}

/**
 * Hook to delete a board
 */
export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      data,
    }: {
      boardId: string;
      data: DeleteBoardData;
    }) => ClientBoardAPI.deleteBoard(boardId, data),
    onSuccess: (_, variables) => {
      // Remove board from cache
      queryClient.removeQueries({
        queryKey: boardKeys.detail(variables.boardId),
      });
      queryClient.removeQueries({
        queryKey: boardKeys.members(variables.boardId),
      });
      // Invalidate lists
      void queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: boardKeys.recent() });
      void queryClient.invalidateQueries({
        queryKey: boardKeys.dashboardStats(),
      });
    },
  });
}
