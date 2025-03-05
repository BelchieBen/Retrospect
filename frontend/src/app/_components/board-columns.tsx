"use client";
import { type Prisma } from "@prisma/client";
import axios, { type AxiosResponse } from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Button } from "~/components/ui/button";
import { backendUrl } from "~/constants/backendUrl";
import { useWebSocket } from "~/lib/WebsocketContext";
import BoardColumn from "./column";
import { Plus } from "lucide-react";

export default function BoardColumns({
  initialBoard,
}: Readonly<{
  initialBoard: Prisma.BoardsGetPayload<{
    include: { columns: true };
  }>;
}>) {
  const { socket } = useWebSocket();

  const { data: columns, refetch } = useQuery("columns", async () => {
    const response: AxiosResponse<
      Prisma.ColumnGetPayload<{
        include: {
          cards: {
            include: {
              comments: { include: { createdBy: true } };
              column: true;
            };
          };
        };
      }>[]
    > = await axios.get(`${backendUrl}/columns/${initialBoard.id}`);

    return response.data;
  });

  useEffect(() => {
    if (socket) {
      socket.on("column_updated", async () => {
        await refetch();
      });
    }
  }, [socket]);

  const addColumn = async () => {
    if (!initialBoard || !columns) return;
    await axios.post(`${backendUrl}/columns`, {
      boardId: initialBoard.id,
      position: columns.length + 1,
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className={`flex gap-4`}>
        {columns?.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
        <Button variant={"outline"} onClick={addColumn} className="w-fit">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
