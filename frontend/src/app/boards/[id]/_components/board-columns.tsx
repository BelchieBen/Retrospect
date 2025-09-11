"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useWebSocket } from "~/lib/WebsocketContext";
import { useColumns, useCreateColumn } from "~/lib/api/columns/columns-queries";
import { useUpdateCard } from "~/lib/api/cards/cards-queries";
import BoardColumn from "./column";
import { Archive, ArchiveRestore } from "lucide-react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card } from "./card";
import { AvatarGroup } from "~/components/avatar-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useSession } from "next-auth/react";
import { ICopy, IPlus, ITick, IUsers } from "~/icons";
import { toast } from "sonner";
import { type BoardWithDetails } from "~/lib/api/boards/board-client";
import { useShallow } from "zustand/react/shallow";
import { useBoardsStore } from "~/lib/zustand/boards/boards-store-provider";
import {
  useCardsStore,
  CardsStoreContext,
} from "~/lib/zustand/cards/cards-store-provider";
import { useContext } from "react";
import { type Column } from "@prisma/client";

export default function BoardColumns({
  initialBoard,
}: Readonly<{
  initialBoard: BoardWithDetails;
}>) {
  const { socket } = useWebSocket();
  const session = useSession();
  const cardsStoreContext = useContext(CardsStoreContext);

  const localColumns = useBoardsStore(
    useShallow((state) => state.columnsByBoardId[initialBoard.id] ?? []),
  );
  const showArchivedCards = useBoardsStore(
    (state) => state.showArchivedCards[initialBoard.id] ?? false,
  );

  // Get active card from cards store
  const activeCard = useCardsStore((state) => state.activeCard);

  const { setColumns, setShowArchivedCards } = useBoardsStore(
    useShallow((state) => ({
      setColumns: state.setColumns,
      setShowArchivedCards: state.setShowArchivedCards,
    })),
  );

  const { moveCard, reorderCard, setActiveCard, findCard } = useCardsStore(
    useShallow((state) => ({
      moveCard: state.moveCard,
      reorderCard: state.reorderCard,
      setActiveCard: state.setActiveCard,
      findCard: state.findCard,
    })),
  );

  const [copied, setCopied] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const moveCardMutation = useUpdateCard();
  const createColumnMutation = useCreateColumn();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const cardInfo = findCard(active.id as string);
    setActiveCard(cardInfo?.card ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const overId = over.id as string;

    if (cardId === overId) return; // Card dropped on itself

    // Find the card being dragged and its current column
    const activeCardInfo = findCard(cardId);
    if (!activeCardInfo) return;

    const activeColumnId = activeCardInfo.columnId;

    // Handle dropping over a column (empty space)
    const overColumn = localColumns.find((col) => col.id === overId);
    if (overColumn) {
      return handleDropOnColumn(cardId, activeColumnId, overColumn);
    }

    // Handle dropping over another card
    const overCardInfo = findCard(overId);
    if (overCardInfo) {
      const targetColumnId = overCardInfo.columnId;
      return handleDropOnCard(cardId, activeColumnId, targetColumnId, overId);
    }
  };

  const handleDropOnColumn = (
    cardId: string,
    activeColumnId: string,
    overColumn: Column,
  ) => {
    if (activeColumnId === overColumn.id) return; // Same column, no change needed

    // Get cards in target column to determine new position
    if (!cardsStoreContext) return;
    const cardsState = cardsStoreContext.getState();
    const targetCards = cardsState.cardsByColumnId[overColumn.id] ?? [];
    const newPosition = targetCards.length;

    // Optimistic update
    moveCard(cardId, activeColumnId, overColumn.id, newPosition);

    if (!session.data?.user?.id) return;

    // Background API update
    moveCardMutation.mutate({
      cardId,
      data: {
        columnId: overColumn.id,
        position: newPosition,
        userId: session.data.user.id,
      },
    });
  };

  const handleDropOnCard = (
    cardId: string,
    activeColumnId: string,
    targetColumnId: string,
    overCardId: string,
  ) => {
    // Get the target card info to determine position
    const overCardInfo = findCard(overCardId);
    if (!overCardInfo) return;

    const targetPosition = overCardInfo.card.position;

    if (activeColumnId === targetColumnId) {
      // Reordering within the same column
      reorderCard(targetColumnId, cardId, targetPosition);
    } else {
      // Moving between different columns
      moveCard(cardId, activeColumnId, targetColumnId, targetPosition);
    }

    if (!session.data?.user?.id) return;

    // Background API update
    moveCardMutation.mutate({
      cardId,
      data: {
        columnId: targetColumnId,
        position: targetPosition,
        userId: session.data.user.id,
      },
    });
  };

  // Fetch columns only (without cards)
  const { data: columns, refetch: refetchColumns } = useColumns(
    initialBoard.id,
    {
      includeArchived: false, // Don't include cards in columns query
    },
  );

  // Sync Zustand state with fetched data
  useEffect(() => {
    if (columns) {
      setColumns(initialBoard.id, columns);
    }
  }, [columns, setColumns, initialBoard.id]);

  // Handle websocket updates - only for columns (cards are handled in individual column components)
  useEffect(() => {
    if (socket) {
      const handleColumnUpdate = async (payload: string) => {
        const payloadData = JSON.parse(payload) as {
          id: string;
          userId: string;
        };

        if (session.data?.user.id !== payloadData.userId) {
          void refetchColumns();
        }
      };

      socket.on("column_updated", handleColumnUpdate);

      return () => {
        socket.off("column_updated", handleColumnUpdate);
      };
    }
  }, [socket, session.data?.user.id, refetchColumns]);

  const addColumn = () => {
    if (!initialBoard) return;

    createColumnMutation.mutate(
      {
        boardId: initialBoard.id,
        name: null, // Will be set when user edits the column
      },
      {
        onSuccess: () => {
          toast.success("Column added");
          void refetchColumns();
        },
        onError: () => {
          toast.error("Failed to add column");
        },
      },
    );
  };

  const copyBoardUrl = async () => {
    const boardUrl = `${window.location.origin}/boards/${initialBoard.id}`;
    try {
      await navigator.clipboard.writeText(boardUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
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
      <div className="flex h-full flex-col gap-4">
        {/* Board header with controls */}
        <div className="flex flex-shrink-0 items-center justify-between">
          <h1 className="text-2xl font-bold">{initialBoard.name}</h1>
          <div className="flex items-center gap-3">
            <AvatarGroup maxDisplay={4} size="sm" boardId={initialBoard.id} />

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <IUsers size={16} />
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
                          <ITick size={16} color="white" />
                        ) : (
                          <ICopy size={16} />
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
              onClick={() =>
                setShowArchivedCards(initialBoard.id, !showArchivedCards)
              }
              className={
                showArchivedCards
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : ""
              }
            >
              {showArchivedCards ? (
                <>
                  <ArchiveRestore className="h-4 w-4" />
                  Hide Archived
                </>
              ) : (
                <>
                  <Archive className="h-4 w-4" />
                  Show Archived
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 gap-4 overflow-auto pb-4">
          {localColumns?.map((column: Column) => (
            <BoardColumn
              key={column.id}
              column={column}
              showArchivedCards={showArchivedCards}
            />
          ))}
          <Button
            variant={"outline"}
            onClick={addColumn}
            className="min-w-fit flex-shrink-0 self-start"
          >
            <IPlus />
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
