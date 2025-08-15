/**
 * React Query hooks for comments API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientCommentsAPI, type CreateCommentData } from "./comments-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const commentsKeys = {
  all: ["comments"] as const,
  lists: () => [...commentsKeys.all, "list"] as const,
  list: (cardId: string) => [...commentsKeys.lists(), cardId] as const,
};

/**
 * Hook to get comments for a card
 */
export function useComments(cardId: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: commentsKeys.list(cardId),
    queryFn: () => ClientCommentsAPI.getComments(cardId),
    enabled: isAuthenticated && !!cardId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to create a comment
 */
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentData) =>
      ClientCommentsAPI.createComment(data),
    onSuccess: (data, variables) => {
      // Invalidate comments for this specific card
      void queryClient.invalidateQueries({
        queryKey: commentsKeys.list(variables.cardId),
      });

      // Also invalidate all comments in case they're used elsewhere
      void queryClient.invalidateQueries({
        queryKey: commentsKeys.all,
      });

      // Invalidate columns and cards since comments are nested in cards
      void queryClient.invalidateQueries({
        queryKey: ["columns"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
    },
  });
}
