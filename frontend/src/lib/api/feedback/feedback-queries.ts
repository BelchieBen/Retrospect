/**
 * React Query hooks for feedback API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientFeedbackAPI, type CreateFeedbackData } from "./feedback-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const feedbackKeys = {
  all: ["feedback"] as const,
  lists: () => [...feedbackKeys.all, "list"] as const,
  list: () => [...feedbackKeys.lists()] as const,
  user: (userId: string) => [...feedbackKeys.all, "user", userId] as const,
  detail: (id: string) => [...feedbackKeys.all, "detail", id] as const,
};

/**
 * Hook to get all feedback (admin endpoint)
 */
export function useAllFeedback() {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: feedbackKeys.list(),
    queryFn: () => ClientFeedbackAPI.getAllFeedback(),
    enabled: isAuthenticated,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get feedback by user ID
 */
export function useUserFeedback(userId: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: feedbackKeys.user(userId),
    queryFn: () => ClientFeedbackAPI.getUserFeedback(userId),
    enabled: isAuthenticated && !!userId,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to get single feedback item
 */
export function useFeedback(id: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: feedbackKeys.detail(id),
    queryFn: () => ClientFeedbackAPI.getFeedback(id),
    enabled: isAuthenticated && !!id,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to create feedback
 */
export function useCreateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeedbackData) =>
      ClientFeedbackAPI.createFeedback(data),
    onSuccess: (data, variables) => {
      // Invalidate all feedback lists
      void queryClient.invalidateQueries({
        queryKey: feedbackKeys.lists(),
      });

      // Invalidate user-specific feedback if not anonymous
      if (!variables.anonymous && variables.userId) {
        void queryClient.invalidateQueries({
          queryKey: feedbackKeys.user(variables.userId),
        });
      }

      // Invalidate all feedback queries to be safe
      void queryClient.invalidateQueries({
        queryKey: feedbackKeys.all,
      });
    },
  });
}
