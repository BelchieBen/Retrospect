/**
 * React Query hooks for columns API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ClientColumnsAPI,
  type CreateColumnData,
  type UpdateColumnData,
  type GetColumnsParams,
} from "./columns-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const columnsKeys = {
  all: ["columns"] as const,
  lists: () => [...columnsKeys.all, "list"] as const,
  list: (boardId: string, filters?: GetColumnsParams) =>
    [...columnsKeys.lists(), boardId, { filters }] as const,
};

/**
 * Hook to get columns for a board
 */
export function useColumns(boardId: string, params?: GetColumnsParams) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: columnsKeys.list(boardId, params),
    queryFn: () => ClientColumnsAPI.getColumns(boardId, params),
    enabled: isAuthenticated && !!boardId,
  });
}

/**
 * Hook to create a column
 */
export function useCreateColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateColumnData) => ClientColumnsAPI.createColumn(data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch columns for the board
      void queryClient.invalidateQueries({
        queryKey: columnsKeys.list(variables.boardId),
      });
    },
  });
}

/**
 * Hook to update a column
 */
export function useUpdateColumn() {
  return useMutation({
    mutationFn: ({
      columnId,
      data,
    }: {
      columnId: string;
      data: UpdateColumnData;
    }) => ClientColumnsAPI.updateColumn(columnId, data),
  });
}

/**
 * Hook to delete a column
 */
export function useDeleteColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnId: string) => ClientColumnsAPI.deleteColumn(columnId),
    onSuccess: () => {
      // Invalidate all column queries since we don't know which board this column belonged to
      void queryClient.invalidateQueries({
        queryKey: columnsKeys.all,
      });
    },
  });
}
