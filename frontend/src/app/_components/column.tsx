"use client";
import { type Prisma } from "@prisma/client";
import axios from "axios";
import { Ellipsis, Plus } from "lucide-react";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { backendUrl } from "~/constants/backendUrl";
import debounce from "lodash/debounce";
import { useSession } from "next-auth/react";
import { Card } from "~/components/card";

export default function BoardColumn({
  column,
}: Readonly<{
  column: Prisma.ColumnGetPayload<{
    include: {
      cards: {
        include: {
          comments: { include: { createdBy: true } };
          createdBy: true;
          column: true;
        };
      };
    };
  }>;
}>) {
  const [columnName, setColumnName] = useState(column.name ?? "");
  const { data: session } = useSession();
  useEffect(() => {
    setColumnName(column.name ?? "");
  }, [column]);

  const saveColumnTitle = async (name: string) => {
    setColumnName(name);
    await axios.put(`${backendUrl}/columns/${column.id}`, {
      name,
    });
  };

  const debouncedSaveColumnTitle = useCallback(
    debounce((name: string) => saveColumnTitle(name), 500),
    [column.id],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
    void debouncedSaveColumnTitle(e.target.value);
  };

  const addCard = async () => {
    await axios.post(`${backendUrl}/cards`, {
      userId: session?.user?.id,
      columnId: column.id,
      boardId: column.boardId,
      title: null,
    });
  };

  const deleteColumn = async () => {
    await axios.delete(`${backendUrl}/columns/${column.id}`);
  };

  return (
    <div className="flex h-fit w-72 flex-col rounded-md bg-sidebar">
      <div className="flex justify-between">
        <input
          className="m-1 h-9 w-full rounded-sm bg-transparent px-2 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          type="text"
          value={columnName}
          onChange={handleChange}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="flex w-full justify-center">
              <DropdownMenuLabel>Column Actions</DropdownMenuLabel>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={addCard}>Add card</DropdownMenuItem>
              <DropdownMenuItem>Copy column</DropdownMenuItem>
              <DropdownMenuItem>Move column</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Move all cards in column</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Archive all cards in this column
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer bg-danger focus:bg-red-500"
              onClick={deleteColumn}
            >
              Delete column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-4 p-2">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      <div className="flex p-1">
        <Button
          variant={"ghost"}
          className="w-full justify-start hover:bg-accent"
          onClick={addCard}
        >
          <Plus /> Add a card
        </Button>
      </div>
    </div>
  );
}
