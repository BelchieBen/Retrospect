"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import axios, { type AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";
import { X } from "lucide-react";
import { type Prisma, type Notification } from "@prisma/client";
import HelixPalette from "~/styles/palette";

import { IBell } from "~/components/Iconography/Icons";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useWebSocket } from "~/lib/WebsocketContext";
import { backendUrl } from "~/constants/backendUrl";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export function NotificationDropdown() {
  const { data: session } = useSession();
  const { socket } = useWebSocket();
  const [open, setOpen] = useState(false);

  // Get notifications count
  const { data: notificationCount, refetch: refetchCount } = useQuery(
    ["notificationCount", session?.user?.id],
    async () => {
      if (!session?.user?.id) return null;
      const response: AxiosResponse<{ unreadCount: number }> = await axios.get(
        `${backendUrl}/notifications/${session.user.id}/count`,
      );
      return response.data;
    },
    {
      enabled: !!session?.user?.id,
    },
  );

  // Get notifications list when dropdown is opened
  const {
    data: notifications,
    refetch: refetchNotifications,
    isLoading: isLoadingNotifications,
  } = useQuery(
    ["notifications", session?.user?.id, open],
    async () => {
      if (!session?.user?.id || !open) return null;
      const response: AxiosResponse<
        Prisma.NotificationGetPayload<{ include: { createdByUser: true } }>[]
      > = await axios.get(
        `${backendUrl}/notifications/${session.user.id}?includeRead=false&includeDismissed=false&limit=20`,
      );
      return response.data;
    },
    {
      enabled: !!session?.user?.id && open,
    },
  );

  // Dismiss notification mutation
  const dismissNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const response: AxiosResponse<Notification> = await axios.patch(
        `${backendUrl}/notifications/${notificationId}/dismiss`,
        {
          userId: session?.user?.id,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      void refetchNotifications();
      void refetchCount();
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const response: AxiosResponse<Notification> = await axios.patch(
        `${backendUrl}/notifications/${notificationId}/read`,
        {
          userId: session?.user?.id,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      void refetchNotifications();
      void refetchCount();
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const response: AxiosResponse<{ count: number }> = await axios.patch(
        `${backendUrl}/notifications/${session?.user?.id}/read-all`,
      );
      return response.data;
    },
    onSuccess: () => {
      void refetchNotifications();
      void refetchCount();
    },
  });

  // Listen for real-time notifications
  useEffect(() => {
    if (socket && session?.user?.id) {
      const handleNotificationCreated = () => {
        void refetchCount();
        if (open) {
          void refetchNotifications();
        }
      };

      const handleNotificationUpdated = () => {
        void refetchCount();
        if (open) {
          void refetchNotifications();
        }
      };

      socket.on("notification_created", handleNotificationCreated);
      socket.on("notification_updated", handleNotificationUpdated);

      return () => {
        socket.off("notification_created", handleNotificationCreated);
        socket.off("notification_updated", handleNotificationUpdated);
      };
    }
  }, [socket, session?.user?.id, open, refetchCount, refetchNotifications]);

  const handleDismiss = (notificationId: string) => {
    dismissNotificationMutation.mutate(notificationId);
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoadingNotifications) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 relative h-8 w-8 text-white"
          >
            <IBell color="white" size={20} />
            {(notificationCount?.unreadCount ?? 0) > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {notificationCount?.unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="max-h-96 w-80 overflow-y-auto"
          align="end"
          sideOffset={5}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-neutral90">
                Notifications
              </h3>

              <IBell size={16} color={HelixPalette.neutral90} />
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            <div className={`border-b p-3`}>
              <div className="flex items-start gap-3">
                {/* Creator Avatar */}
                <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />

                {/* Notification Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="mt-2 h-4 w-full" />
                      <Skeleton className="mt-1 h-4 w-full" />
                    </div>

                    {/* Dismiss Button */}
                    <Skeleton className="ml-2 h-5 w-5 rounded-full" />
                  </div>

                  {/* Mark as Read Button */}
                  <div className="mt-2 flex h-5 items-center justify-between gap-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 relative h-8 w-8 text-white"
        >
          <IBell color="white" size={20} />
          {(notificationCount?.unreadCount ?? 0) > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notificationCount?.unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-h-96 w-80 overflow-y-auto"
        align="end"
        sideOffset={5}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-neutral90">
              Notifications
            </h3>

            <IBell size={16} color={HelixPalette.neutral90} />
          </div>
          {notifications && notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs text-teal90 hover:text-teal90"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications?.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-4 text-center text-gray-500">
              <Image
                src="/company_news.png"
                height={96}
                width={96}
                alt="news"
              />
              <p className="text-sm text-neutral80">Your all caught up!</p>
            </div>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification.id}
                className={`border-b p-3 hover:bg-gray-50 ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Creator Avatar */}
                  {notification.createdByUser && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage
                        src={notification.createdByUser.image ?? ""}
                        alt={notification.createdByUser.name ?? "User"}
                      />
                      <AvatarFallback className="text-xs">
                        {notification.createdByUser.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  {/* Notification Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                          {notification.content}
                        </p>
                      </div>

                      {/* Dismiss Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDismiss(notification.id)}
                        className="ml-2 h-6 w-6 p-0 hover:bg-gray-200"
                      >
                        <X size={12} />
                      </Button>
                    </div>

                    {/* Mark as Read Button */}
                    <div className="flex items-center justify-between gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="mt-1 h-auto p-0 text-xs text-teal90 hover:text-teal90"
                        >
                          Mark as read
                        </Button>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {formatRelativeTime(
                          notification.createdAt.toLocaleString(),
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
