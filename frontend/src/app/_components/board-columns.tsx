"use client";
import { type Prisma } from "@prisma/client";
import axios, { type AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Button } from "~/components/ui/button";
import { backendUrl } from "~/constants/backendUrl";
import { useWebSocket } from "~/lib/WebsocketContext";
import BoardColumn from "./column";
import {
  Plus,
  Archive,
  ArchiveRestore,
  UserPlus,
  Copy,
  Check,
} from "lucide-react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card } from "~/components/card";
import { AvatarGroup } from "~/components/avatar-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useSession } from "next-auth/react";

type ColumnWithCards = Prisma.ColumnGetPayload<{
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

export default function BoardColumns({
  initialBoard,
}: Readonly<{
  initialBoard: Prisma.BoardsGetPayload<{
    include: {
      columns: true;
      BoardMembers: {
        include: {
          user: true;
        };
      };
    };
  }>;
}>) {
  const { socket } = useWebSocket();
  const session = useSession();
  const [localColumns, setLocalColumns] = useState<ColumnWithCards[]>([]);
  const [showArchivedCards, setShowArchivedCards] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCard, setActiveCard] = useState<Prisma.CardGetPayload<{
    include: {
      comments: { include: { createdBy: true } };
      createdBy: true;
      column: true;
    };
  }> | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const moveCardMutation = useMutation({
    mutationFn: async ({
      cardId,
      newColumnId,
      newPosition,
    }: {
      cardId: string;
      newColumnId: string;
      newPosition: number;
    }) => {
      await axios.put(`${backendUrl}/cards/${cardId}`, {
        columnId: newColumnId,
        position: newPosition,
        userId: session.data?.user.id,
      });
    },
    onSuccess: () => {
      // Backend update successful
    },
    onError: (error) => {
      console.error("Failed to move card:", error);
    },
  });

  const updateLocalColumns = (
    cardId: string,
    newColumnId: string,
    newPosition: number,
  ) => {
    setLocalColumns((currentColumns) => {
      if (!currentColumns.length) return currentColumns;

      const newColumns = JSON.parse(
        JSON.stringify(currentColumns),
      ) as ColumnWithCards[];
      let cardToMove = null;

      // Find and remove the card from its current position
      for (const column of newColumns) {
        if (column?.cards) {
          const cardIndex = column.cards.findIndex(
            (card) => card.id === cardId,
          );
          if (cardIndex !== -1) {
            cardToMove = column.cards[cardIndex];
            column.cards = column.cards.filter((card) => card.id !== cardId);
            break;
          }
        }
      }

      // Add the card to its new position
      if (cardToMove) {
        const targetColumn = newColumns.find((col) => col.id === newColumnId);
        if (targetColumn?.cards) {
          const insertPosition = Math.min(
            newPosition,
            targetColumn.cards.length,
          );
          (cardToMove as { columnId: string; position: number }).columnId =
            newColumnId;
          (cardToMove as { columnId: string; position: number }).position =
            newPosition;
          targetColumn.cards.splice(insertPosition, 0, cardToMove);
        }
      }

      return newColumns;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = findCardById(active.id as string);
    setActiveCard(card);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const overId = over.id as string;

    if (cardId === overId) return; // Card dropped on itself

    // Find the card being dragged and its current column
    const activeCard = findCardById(cardId);
    if (!activeCard) return;

    const activeColumn = findColumnByCardId(cardId);
    if (!activeColumn) return;

    // Handle dropping over a column (empty space)
    const overColumn = findColumnById(overId);
    if (overColumn) {
      return handleDropOnColumn(cardId, activeColumn, overColumn);
    }

    // Handle dropping over another card
    const overCard = findCardById(overId);
    if (overCard) {
      const targetColumn = findColumnByCardId(overId);
      if (!targetColumn) return;

      return handleDropOnCard(cardId, activeColumn, targetColumn, overId);
    }
  };

  const handleDropOnColumn = (
    cardId: string,
    activeColumn: ColumnWithCards,
    overColumn: ColumnWithCards,
  ) => {
    if (activeColumn.id === overColumn.id) return; // Same column, no change needed

    const newPosition = overColumn.cards.length;

    updateLocalColumns(cardId, overColumn.id, newPosition);

    moveCardMutation.mutate({
      cardId,
      newColumnId: overColumn.id,
      newPosition,
    });
  };

  const handleDropOnCard = (
    cardId: string,
    activeColumn: ColumnWithCards,
    targetColumn: ColumnWithCards,
    overCardId: string,
  ) => {
    const activeCardIndex = activeColumn.cards.findIndex(
      (card) => card.id === cardId,
    );
    const targetCardIndex = targetColumn.cards.findIndex(
      (card) => card.id === overCardId,
    );

    if (activeColumn.id === targetColumn.id) {
      // Reordering within the same column
      if (activeCardIndex === targetCardIndex) return; // Same position

      updateLocalColumns(cardId, targetColumn.id, targetCardIndex);

      moveCardMutation.mutate({
        cardId,
        newColumnId: targetColumn.id,
        newPosition: targetCardIndex,
      });
    } else {
      // Moving between different columns
      updateLocalColumns(cardId, targetColumn.id, targetCardIndex);

      moveCardMutation.mutate({
        cardId,
        newColumnId: targetColumn.id,
        newPosition: targetCardIndex,
      });
    }
  };

  const findCardById = (id: string) => {
    for (const column of localColumns ?? []) {
      const card = column.cards.find((card) => card.id === id);
      if (card) return card;
    }
    return null;
  };

  const findColumnById = (id: string): ColumnWithCards | null => {
    return localColumns?.find((column) => column.id === id) ?? null;
  };

  const findColumnByCardId = (cardId: string): ColumnWithCards | null => {
    for (const column of localColumns ?? []) {
      if (column.cards.some((card) => card.id === cardId)) {
        return column;
      }
    }
    return null;
  };

  const { data: columns, refetch } = useQuery(
    ["columns", initialBoard.id, showArchivedCards],
    async () => {
      const response: AxiosResponse<
        Prisma.ColumnGetPayload<{
          include: {
            cards: {
              include: {
                comments: { include: { createdBy: true } };
                createdBy: true;
                column: true;
              };
            };
          };
        }>[]
      > = await axios.get(
        `${backendUrl}/columns/${initialBoard.id}?includeArchived=${showArchivedCards}`,
      );

      return response.data;
    },
  );

  // Sync local state with fetched data
  useEffect(() => {
    if (columns) {
      setLocalColumns(columns);
    }
  }, [columns]);

  // Handle websocket updates - disabled to prevent overwriting local state
  useEffect(() => {
    if (socket) {
      const handleUpdate = async (payload: string) => {
        const payloadData = JSON.parse(payload) as {
          id: string;
          userId: string;
        };
        console.log(
          "Received column update payload:",
          payloadData.userId,
          " SESSION USER ID:",
          session.data?.user.id,
        );
        if (session.data?.user.id !== payloadData.userId) {
          await refetch();
        }
      };

      socket.on("column_updated", handleUpdate);
      socket.on("card_updated", handleUpdate);

      return () => {
        socket.off("column_updated", handleUpdate);
        socket.off("card_updated", handleUpdate);
      };
    }
  }, [socket]);

  const addColumn = async () => {
    if (!initialBoard || !localColumns) return;
    await axios.post(`${backendUrl}/columns`, {
      boardId: initialBoard.id,
      position: localColumns.length + 1,
    });
  };

  const copyBoardUrl = async () => {
    const boardUrl = `${window.location.origin}/boards/${initialBoard.id}`;
    try {
      await navigator.clipboard.writeText(boardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-4">
        {/* Board header with controls */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{initialBoard.name}</h1>
          <div className="flex items-center gap-3">
            <AvatarGroup maxDisplay={4} size="sm" />

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite to Board</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-600">
                      Share this link to invite others to the board:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${typeof window !== "undefined" ? window.location.origin : ""}/boards/${initialBoard.id}`}
                        className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:text-black"
                      />
                      <Button
                        size="sm"
                        onClick={copyBoardUrl}
                        variant={copied ? "default" : "outline"}
                        className={
                          copied ? "bg-green-600 hover:bg-green-700" : ""
                        }
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowArchivedCards(!showArchivedCards)}
              className={
                showArchivedCards
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : ""
              }
            >
              {showArchivedCards ? (
                <>
                  <ArchiveRestore className="mr-2 h-4 w-4" />
                  Hide Archived
                </>
              ) : (
                <>
                  <Archive className="mr-2 h-4 w-4" />
                  Show Archived
                </>
              )}
            </Button>
          </div>
        </div>

        <div className={`flex gap-4`}>
          {localColumns?.map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
          <Button variant={"outline"} onClick={addColumn} className="w-fit">
            <Plus />
          </Button>
        </div>
      </div>
      <DragOverlay>
        {activeCard ? (
          <div className="rotate-3 scale-105 transform shadow-lg">
            <Card card={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
