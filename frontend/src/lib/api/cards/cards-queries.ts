/**
 * React Query hooks for cards API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ClientCardsAPI,
  type CreateCardData,
  type UpdateCardData,
  type ArchiveCardData,
  type DeleteCardData,
} from "./cards-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const cardsKeys = {
  all: ["cards"] as const,
  lists: () => [...cardsKeys.all, "list"] as const,
  posts: () => [...cardsKeys.all, "posts"] as const,
};

/**
 * Hook to get all posts (legacy endpoint)
 */
export function usePosts() {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: cardsKeys.posts(),
    queryFn: () => ClientCardsAPI.getPosts(),
    enabled: isAuthenticated,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to create a card
 */
export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCardData) => ClientCardsAPI.createCard(data),
    onSuccess: (data, variables) => {
      // Invalidate posts and any column data that might include cards
      void queryClient.invalidateQueries({
        queryKey: cardsKeys.all,
      });

      // Also invalidate columns for this board since cards are nested in columns
      void queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });
}

/**
 * Hook to update a card
 */
export function useUpdateCard() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, data }: { cardId: string; data: UpdateCardData }) =>
      ClientCardsAPI.updateCard(cardId, data),
    // onSuccess: (data, variables) => {
    //   // Invalidate all card-related queries
    //   void queryClient.invalidateQueries({
    //     queryKey: cardsKeys.all,
    //   });

    //   // Also invalidate columns since cards are nested in columns
    //   void queryClient.invalidateQueries({
    //     queryKey: ["columns"],
    //   });
    // },
  });
}

/**
 * Hook to move a card (convenience hook for position changes)
 */
export function useMoveCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cardId,
      columnId,
      position,
      userId,
    }: {
      cardId: string;
      columnId: string;
      position: number;
      userId: string;
    }) => ClientCardsAPI.moveCard(cardId, columnId, position, userId),
    onSuccess: () => {
      // Invalidate all card and column queries for drag & drop updates
      void queryClient.invalidateQueries({
        queryKey: cardsKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });
}

/**
 * Hook to update card content only (convenience hook)
 */
export function useUpdateCardContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cardId,
      data,
    }: {
      cardId: string;
      data: {
        name?: string | null;
        description?: string;
        gifUrl?: string;
        attachments?: { name: string; url: string }[] | null;
        userId: string;
      };
    }) => ClientCardsAPI.updateCardContent(cardId, data),
    onSuccess: () => {
      // Invalidate card and column queries
      void queryClient.invalidateQueries({
        queryKey: cardsKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });
}

/**
 * Hook to archive or unarchive a card
 */
export function useArchiveCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, data }: { cardId: string; data: ArchiveCardData }) =>
      ClientCardsAPI.archiveCard(cardId, data),
    onSuccess: () => {
      // Invalidate all card and column queries
      void queryClient.invalidateQueries({
        queryKey: cardsKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });
}

/**
 * Hook to delete a card
 */
export function useDeleteCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, data }: { cardId: string; data: DeleteCardData }) =>
      ClientCardsAPI.deleteCard(cardId, data),
    onSuccess: () => {
      // Invalidate all card and column queries
      void queryClient.invalidateQueries({
        queryKey: cardsKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });
}
