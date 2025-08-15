/**
 * React Query hooks for users API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientUsersAPI, type CreateUserData } from "./users-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: () => [...usersKeys.lists()] as const,
};

/**
 * Hook to get all users
 */
export function useUsers() {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: usersKeys.list(),
    queryFn: () => ClientUsersAPI.getAllUsers(),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes - users don't change frequently
  });
}

/**
 * Hook to create a user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => ClientUsersAPI.createUser(data),
    onSuccess: () => {
      // Invalidate all user queries
      void queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });

      // Also invalidate members queries since users are used in team management
      void queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
  });
}
