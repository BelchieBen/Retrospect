"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Mail, Shield } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useState } from "react";

interface UserCardProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: "USER" | "ADMIN";
    emailVerified: Date | null;
    image: string | null;
    _count: {
      Boards: number;
      Card: number;
      Comment: number;
      Feedback: number;
    };
  };
  currentUserId: string;
}

export function UserCard({ user, currentUserId }: UserCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const utils = api.useUtils();

  const updateUserRoleMutation = api.user.updateUserRole.useMutation({
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: (updatedUser) => {
      toast.success(`User role updated to ${updatedUser.role}`);
      void utils.user.getAllUsers.invalidate();
      void utils.user.getUserStats.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user role");
    },
    onSettled: () => {
      setIsUpdating(false);
    },
  });

  const handleRoleChange = (newRole: "USER" | "ADMIN") => {
    if (user.id === currentUserId && newRole !== "ADMIN") {
      toast.error("You cannot remove your own admin privileges");
      return;
    }

    updateUserRoleMutation.mutate({
      userId: user.id,
      role: newRole,
    });
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
    }
    return (name[0] ?? "U").toUpperCase();
  };

  const isCurrentUser = user.id === currentUserId;

  return (
    <Card className="border-neutral20 transition-shadow hover:shadow-md dark:border-neutral70">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user.image ?? undefined}
                alt={user.name ?? "User"}
              />
              <AvatarFallback className="bg-teal60 text-white">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-black dark:text-white">
                  {user.name ?? "Unknown User"}
                </h3>
                {isCurrentUser && (
                  <Badge variant="outline" className="text-xs">
                    You
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-neutral60 dark:text-neutral40">
                <Mail className="h-3 w-3" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={user.role === "ADMIN" ? "default" : "secondary"}
                  className="text-xs"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  {user.role}
                </Badge>
                {user.emailVerified && (
                  <Badge variant="outline" className="text-xs text-green-600">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Role Management */}
          <div className="flex flex-col items-end gap-2">
            <Select
              value={user.role}
              onValueChange={handleRoleChange}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-32 border-neutral20 hover:border-teal70 focus:border-teal70 dark:border-neutral70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            {isCurrentUser && (
              <p className="text-xs text-neutral50 dark:text-neutral50">
                Cannot modify own role
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Activity Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-black dark:text-white">
              {user._count.Boards}
            </div>
            <div className="text-xs text-neutral60 dark:text-neutral40">
              Boards
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-black dark:text-white">
              {user._count.Card}
            </div>
            <div className="text-xs text-neutral60 dark:text-neutral40">
              Cards
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-black dark:text-white">
              {user._count.Comment}
            </div>
            <div className="text-xs text-neutral60 dark:text-neutral40">
              Comments
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-black dark:text-white">
              {user._count.Feedback}
            </div>
            <div className="text-xs text-neutral60 dark:text-neutral40">
              Feedback
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
