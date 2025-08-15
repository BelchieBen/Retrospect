"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { useWebSocket } from "~/lib/WebsocketContext";
import { useEffect } from "react";
import { useBoardMembers } from "~/lib/api/boards/board-queries";

interface AvatarGroupProps {
  maxDisplay?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  boardId: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
};

export function AvatarGroup({
  maxDisplay = 5,
  size = "md",
  className,
  boardId,
}: Readonly<AvatarGroupProps>) {
  const { socket } = useWebSocket();
  const { data: users, refetch } = useBoardMembers(boardId);

  const displayUsers = users?.slice(0, maxDisplay);
  const remainingCount = users ? users.length - maxDisplay : 0;

  useEffect(() => {
    if (socket) {
      socket.on("user_joined", async () => {
        await refetch();
      });
    }
  }, [socket, refetch]);

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <TooltipProvider>
      <div className={cn("flex -space-x-2", className)}>
        {displayUsers?.map((user, index) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <Avatar
                className={cn(
                  sizeClasses[size],
                  "cursor-pointer border-2 border-white ring-2 ring-gray-100 transition-transform hover:z-10 hover:scale-110",
                  index > 0 && "ml-[-8px]",
                )}
              >
                <AvatarImage
                  src={user.user.image ?? ""}
                  alt={user.user.name ?? "User"}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white">
                  {getInitials(user.user.name)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{user.user.name ?? user.user.email ?? "Unknown User"}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                className={cn(
                  sizeClasses[size],
                  "ml-[-8px] cursor-pointer border-2 border-white bg-gray-100 font-medium text-gray-600 ring-2 ring-gray-100",
                )}
              >
                <AvatarFallback className="bg-gray-200 font-semibold text-gray-700">
                  +{remainingCount}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>
                {remainingCount} more member{remainingCount > 1 ? "s" : ""}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
