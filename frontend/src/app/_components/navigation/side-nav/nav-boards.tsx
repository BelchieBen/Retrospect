"use client";

import { Archive, MoreHorizontal, Trash2, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { type Prisma } from "@prisma/client";
import Link from "next/link";
import { IPagesStack } from "~/icons";
import { useWebSocket } from "~/lib/WebsocketContext";
import {
  useBoards,
  useArchiveBoard,
  useDeleteBoard,
} from "~/lib/api/boards/board-queries";
import { type UserWithBoards } from "~/lib/api/boards/board-client";

export function NavProjects({
  initialBoards,
}: Readonly<{
  initialBoards: UserWithBoards | undefined | null;
}>) {
  const { isMobile } = useSidebar();
  const { socket } = useWebSocket();
  const { data: session } = useSession();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<{
    id: string;
    name: string;
    archived: boolean;
    ownerId: string;
  } | null>(null);

  const { data: boards } = useBoards(initialBoards);

  useEffect(() => {
    if (socket) {
      const handleUpdate = async (_payload: string) => {
        // React Query will automatically refetch due to cache invalidation
        // No manual refetch needed as the mutations handle cache invalidation
      };

      socket.on("board_updated", handleUpdate);

      return () => {
        socket.off("board_updated", handleUpdate);
      };
    }
  }, [socket]);

  // Archive/Unarchive board mutation
  const archiveBoardMutation = useArchiveBoard();

  // Delete board mutation
  const deleteBoardMutation = useDeleteBoard();

  const handleArchiveBoard = (board: {
    id: string;
    name: string;
    archived: boolean;
  }) => {
    if (!session?.user?.id) return;

    archiveBoardMutation.mutate(
      {
        boardId: board.id,
        data: {
          archived: !board.archived,
          userId: session.user.id,
        },
      },
      {
        onSuccess: () => {
          toast.success(
            !board.archived
              ? "Board archived successfully"
              : "Board unarchived successfully",
          );
        },
        onError: () => {
          toast.error("Failed to archive board");
        },
      },
    );
  };

  const handleDeleteBoard = (board: {
    id: string;
    name: string;
    archived: boolean;
    ownerId: string;
  }) => {
    setSelectedBoard(board);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedBoard || !session?.user?.id) return;

    deleteBoardMutation.mutate(
      {
        boardId: selectedBoard.id,
        data: { userId: session.user.id },
      },
      {
        onSuccess: () => {
          toast.success("Board deleted successfully");
          setDeleteModalOpen(false);
          setSelectedBoard(null);
        },
        onError: () => {
          toast.error("Failed to delete board");
        },
      },
    );
  };

  const isOwner = (board: { ownerId: string }) => {
    return session?.user?.id === board.ownerId;
  };

  return (
    <>
      <SidebarGroup className="mt-6 px-2 group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-neutral60 dark:text-neutral40">
          Your Boards
        </SidebarGroupLabel>
        <SidebarMenu>
          {boards?.BoardMembers?.map((boardMember) => {
            const board = boardMember.board;
            return (
              <SidebarMenuItem key={board.id}>
                <SidebarMenuButton
                  asChild
                  className="text-neutral90 hover:bg-neutral10 dark:text-neutral10 dark:hover:bg-neutral30"
                >
                  <Link
                    href={`/boards/${board.id}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2"
                  >
                    <IPagesStack />
                    <span className="font-medium">
                      {board.name}
                      {board.archived && (
                        <span className="ml-2 text-xs text-neutral50 dark:text-neutral50">
                          (Archived)
                        </span>
                      )}
                    </span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      showOnHover
                      className="hover:bg-neutral10 dark:hover:bg-neutral30"
                    >
                      <MoreHorizontal className="size-4 text-neutral60 dark:text-neutral40" />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem
                      onClick={() => handleArchiveBoard(board)}
                      disabled={archiveBoardMutation.isPending}
                    >
                      <Archive className="text-muted-foreground" />
                      <span>
                        {board.archived ? "Unarchive Board" : "Archive Board"}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteBoard(board)}
                      disabled={
                        deleteBoardMutation.isPending || !isOwner(board)
                      }
                      className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                    >
                      <Trash2 className="text-red-600 dark:text-red-400" />
                      <span>Delete Board</span>
                    </DropdownMenuItem>
                    {!isOwner(board) && (
                      <p className="px-2 py-1 text-xs text-neutral50 dark:text-neutral50">
                        Only owner can delete
                      </p>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Delete Board
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete &quot;{selectedBoard?.name}&quot;?
              This action cannot be undone and will permanently delete the board
              and all its contents including columns, cards, and comments.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleteBoardMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteBoardMutation.isPending}
            >
              {deleteBoardMutation.isPending ? "Deleting..." : "Delete Board"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
