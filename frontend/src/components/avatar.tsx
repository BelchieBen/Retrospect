"use client";
import { useSession } from "next-auth/react";
import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export const Avatars = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center justify-start">
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
