"use client";
import { type Column, type Prisma } from "@prisma/client";
import axios, { type AxiosResponse } from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Button } from "~/components/ui/button";
import { backendUrl } from "~/constants/backendUrl";
import { useWebSocket } from "~/lib/WebsocketContext";
import { api } from "~/trpc/react";

export default function BoardColumns({
  initialBoard,
}: Readonly<{
  initialBoard: Prisma.BoardsGetPayload<{ include: { columns: true } }>;
}>) {
  const { socket } = useWebSocket();

  const { data: board } = api.board.getBoard.useQuery(
    { id: initialBoard.id },
    { initialData: initialBoard },
  );

  const { data, refetch } = useQuery("columns", async () => {
    const response: AxiosResponse<Column[]> = await axios.get(
      `${backendUrl}/columns/${board?.id}`,
    );
    return response.data;
  });

  useEffect(() => {
    if (socket) {
      socket.on("column_updated", async () => {
        console.log("COLUMN UPDATED");
        await refetch();
      });
    }
  }, [socket]);

  const addColumn = async () => {
    if (!board) return;
    await axios.post(`${backendUrl}/columns`, {
      boardId: board.id,
      position: board.columns.length + 1,
    });
  };
  return (
    <div className="h-full w-full">
      <Button variant={"outline"} onClick={addColumn}>
        Add Column
      </Button>
      <div className={`flex h-full w-full gap-4`}>
        {data?.map((column) => (
          <div className="h-40 w-40 bg-red-400" key={column.id}></div>
        ))}
      </div>
    </div>
  );
}
