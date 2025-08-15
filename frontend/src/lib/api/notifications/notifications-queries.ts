/**
 * React Query hooks for notifications API
 * Provides caching, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ClientNotificationsAPI,
  type GetNotificationsParams,
  type CreateNotificationData,
  type MarkReadData,
  type DismissData,
} from "./notifications-client";
import { useAuthenticatedAxios } from "~/hooks/use-hmac-axios";

// Query keys for consistent caching
export const notificationsKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationsKeys.all, "list"] as const,
  list: (userId: string, params?: GetNotificationsParams) =>
    [...notificationsKeys.lists(), userId, { params }] as const,
  count: (userId: string) =>
    [...notificationsKeys.all, "count", userId] as const,
};

/**
 * Hook to get notifications for a user
 */
export function useNotifications(
  userId: string,
  params?: GetNotificationsParams,
) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: notificationsKeys.list(userId, params),
    queryFn: () => ClientNotificationsAPI.getNotifications(userId, params),
    enabled: isAuthenticated && !!userId,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute for real-time updates
  });
}

/**
 * Hook to get notification count for a user
 */
export function useNotificationCount(userId: string) {
  const { isAuthenticated } = useAuthenticatedAxios();

  return useQuery({
    queryKey: notificationsKeys.count(userId),
    queryFn: () => ClientNotificationsAPI.getNotificationCount(userId),
    enabled: isAuthenticated && !!userId,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for badge updates
  });
}

/**
 * Hook to create a notification
 */
export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotificationData) =>
      ClientNotificationsAPI.createNotification(data),
    onSuccess: (data, variables) => {
      // Invalidate notifications for the target user
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.list(variables.userId),
      });

      // Invalidate notification count for the target user
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.count(variables.userId),
      });

      // Invalidate all notifications to be safe
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      });
    },
  });
}

/**
 * Hook to mark notification as read
 */
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      notificationId,
      data,
    }: {
      notificationId: string;
      data: MarkReadData;
    }) => ClientNotificationsAPI.markAsRead(notificationId, data),
    onSuccess: (data, variables) => {
      // Invalidate notifications for this user
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.list(variables.data.userId),
      });

      // Invalidate notification count
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.count(variables.data.userId),
      });
    },
  });
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      ClientNotificationsAPI.markAllAsRead(userId),
    onSuccess: (data, variables) => {
      // Invalidate all notifications for this user
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.list(variables),
      });

      // Invalidate notification count
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.count(variables),
      });
    },
  });
}

/**
 * Hook to dismiss notification
 */
export function useDismissNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      notificationId,
      data,
    }: {
      notificationId: string;
      data: DismissData;
    }) => ClientNotificationsAPI.dismiss(notificationId, data),
    onSuccess: (data, variables) => {
      // Invalidate notifications for this user
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.list(variables.data.userId),
      });

      // Invalidate notification count
      void queryClient.invalidateQueries({
        queryKey: notificationsKeys.count(variables.data.userId),
      });
    },
  });
}
