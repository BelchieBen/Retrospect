"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { type User } from "../page";
import { IPlus } from "~/icons";
import { Button } from "~/components/ui/button";
import HelixPalette from "~/styles/palette";
import { useSession } from "next-auth/react";
import { Badge } from "~/app/_components/ui/badge";

export default function UserItem({
  user,
  action,
  onActionClick,
}: {
  user: User;
  action: "add" | "remove";
  onActionClick: (userId: string) => void;
}) {
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral20 p-4 transition-colors hover:bg-neutral05 dark:border-neutral60 dark:hover:bg-neutral20">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
          <AvatarFallback className="bg-teal10 font-medium text-teal70 dark:bg-teal20">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral90 dark:text-white">
              {user.name ?? "Unknown User"}
            </span>
            {user.id === session?.user?.id && (
              <Badge className="text-xs">You</Badge>
            )}
          </div>
          <span className="text-sm text-neutral60 dark:text-neutral40">
            {user.email ?? "No email"}
          </span>
          {user.role === "ADMIN" && (
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              Admin
            </span>
          )}
        </div>
      </div>

      <Button
        variant={action === "add" ? "default" : "outline"}
        size="sm"
        onClick={() => onActionClick(user.id)}
        className={
          action === "add"
            ? "bg-teal60 hover:bg-teal70"
            : "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        }
      >
        {action === "add" ? (
          <>
            <IPlus color={HelixPalette.white} size={16} />
            Add
          </>
        ) : (
          <>
            <span className="text-red-600">×</span>
            Remove
          </>
        )}
      </Button>
    </div>
  );
}
