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

  const { data, refetch } = useQuery("columns", async () => {
    const response: AxiosResponse<
      Prisma.ColumnGetPayload<{ include: { cards: true } }>[]
    > = await axios.get(`${backendUrl}/columns/${initialBoard.id}`);

    return response.data;
  });

  useEffect(() => {
    if (socket) {
      socket.on("column_updated", async () => {
        console.log("column_updated");
        await refetch();
      });
    }
  }, [socket]);

  const addColumn = async () => {
    if (!initialBoard || !data) return;
    console.log("DATA LEN", data.length);
    await axios.post(`${backendUrl}/columns`, {
      boardId: initialBoard.id,
      position: data.length + 1,
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className={`flex gap-4`}>
        {data?.map((column) => <BoardColumn key={column.id} column={column} />)}
        <Button variant={"outline"} onClick={addColumn} className="w-fit">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
