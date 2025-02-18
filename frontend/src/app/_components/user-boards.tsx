"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export default function UserBoards() {
  const { data: boards, isFetching } = api.board.getBoards.useQuery();

  return (
    <div className="grid grid-cols-4 gap-4">
      {isFetching &&
        !boards &&
        Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      {boards?.BoardMembers.map((board) => (
        <Link
          href={`/boards/${board.board.id}`}
          className="h-24 cursor-pointer rounded-md bg-secondary p-2"
          key={board.board.id}
        >
          <div className="flex h-full w-full flex-col items-start justify-between">
            <p>{board.board.name}</p>
            <Button variant={"link"} className="h-fit w-fit p-1">
              <Users />
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
}
