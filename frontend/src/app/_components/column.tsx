"use client";
import { type Prisma } from "@prisma/client";
import axios from "axios";
import { Ellipsis, Plus } from "lucide-react";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation } from "react-query";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
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
import { useDroppable, useDndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DraggableCard({
  card,
}: Readonly<{
  card: Prisma.CardGetPayload<{
    include: {
      comments: { include: { createdBy: true } };
      createdBy: true;
      column: true;
    };
  }>;
}>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card card={card} />
    </div>
  );
}

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: session } = useSession();
  const { active, over } = useDndContext();

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const cardIds = column.cards.map((card) => card.id);

  // Check if we're dragging a card from another column over this column
  const isDraggingOverFromDifferentColumn = useMemo(() => {
    if (!active) return false;

    const isCardFromThisColumn = column.cards.some(
      (card) => card.id === active.id,
    );
    if (isCardFromThisColumn) return false; // Card is from this column

    // Either hovering over the column directly or over a card in this column
    return (
      over?.id === column.id ||
      (over?.id && column.cards.some((card) => card.id === over.id))
    );
  }, [active, over, column.id, column.cards]);

  const deleteColumnMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${backendUrl}/columns/${column.id}`);
    },
    onSuccess: () => {
      setShowDeleteDialog(false);
    },
    onError: (error) => {
      console.error("Failed to delete column:", error);
    },
  });

  const addCardMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`${backendUrl}/cards`, {
        userId: session?.user?.id,
        columnId: column.id,
        boardId: column.boardId,
        title: null,
      });
    },
    onError: (error) => {
      console.error("Failed to add card:", error);
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: async (name: string) => {
      await axios.put(`${backendUrl}/columns/${column.id}`, {
        name,
      });
    },
    onError: (error) => {
      console.error("Failed to save column title:", error);
    },
  });
  useEffect(() => {
    setColumnName(column.name ?? "");
  }, [column]);

  const saveColumnTitle = useCallback(
    (name: string) => {
      updateColumnMutation.mutate(name);
    },
    [updateColumnMutation],
  );

  const debouncedSaveColumnTitle = useMemo(
    () => debounce(saveColumnTitle, 500),
    [saveColumnTitle],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setColumnName(newValue);
    debouncedSaveColumnTitle(newValue);
  };

  const addCard = () => {
    addCardMutation.mutate();
  };

  const deleteColumn = async () => {
    deleteColumnMutation.mutate();
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
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
              onClick={handleDeleteClick}
            >
              Delete column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Column</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the column &quot;{columnName}
              &quot;? This action cannot be undone and will also delete all
              cards in this column.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleteColumnMutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteColumn}
              disabled={deleteColumnMutation.isLoading}
            >
              {deleteColumnMutation.isLoading ? "Deleting..." : "Delete Column"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div
        ref={setNodeRef}
        className={`flex min-h-[100px] flex-col gap-4 p-2 transition-all duration-200 ${isDraggingOverFromDifferentColumn ? "rounded-lg border-2 border-dashed border-blue-300 bg-blue-50" : ""}`}
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {column.cards.map((card) => (
            <div key={card.id}>
              <DraggableCard card={card} />
            </div>
          ))}

          {/* Show drop indicator when dragging over from different column */}
          {isDraggingOverFromDifferentColumn && (
            <div className="flex min-h-[60px] animate-pulse items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-blue-100 p-3">
              <div className="text-sm font-medium text-blue-600">
                Drop card here
              </div>
            </div>
          )}
        </SortableContext>
      </div>
      <div className="flex p-1">
        <Button
          variant={"ghost"}
          className="w-full justify-start hover:bg-accent"
          onClick={addCard}
          disabled={addCardMutation.isLoading}
        >
          <Plus /> {addCardMutation.isLoading ? "Adding..." : "Add a card"}
        </Button>
      </div>
    </div>
  );
}
