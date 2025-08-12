"use client";

import { Archive, MoreHorizontal, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSession } from "next-auth/react";
import axios, { type AxiosResponse } from "axios";
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
import { type Boards, type Prisma } from "@prisma/client";
import Link from "next/link";
import { IPagesStack } from "~/icons";
import { api } from "~/trpc/react";
import { useWebSocket } from "~/lib/WebsocketContext";
import { useEffect } from "react";
import { backendUrl } from "~/constants/backendUrl";

export function NavProjects({
  initialBoards,
}: Readonly<{
  initialBoards:
    | Prisma.UserGetPayload<{
        include: { BoardMembers: { include: { board: true } } };
      }>
    | undefined
    | null;
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

  const { data: boards, refetch } = api.board.getBoards.useQuery(undefined, {
    initialData: initialBoards,
  });

  useEffect(() => {
    if (socket) {
      const handleUpdate = async (payload: string) => {
        await refetch();
      };

      socket.on("board_updated", handleUpdate);

      return () => {
        socket.off("board_updated", handleUpdate);
      };
    }
  }, [socket, refetch]);

  // Archive/Unarchive board mutation
  const archiveBoardMutation = useMutation({
    mutationFn: async ({
      boardId,
      archived,
    }: {
      boardId: string;
      archived: boolean;
    }) => {
      const response: AxiosResponse<Boards> = await axios.patch(
        `${backendUrl}/boards/${boardId}/archive`,
        {
          archived,
          userId: session?.user?.id,
        },
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success(
        variables.archived
          ? "Board archived successfully"
          : "Board unarchived successfully",
      );
      void refetch();
    },
    onError: () => {
      toast.error("Failed to archive board");
    },
  });

  // Delete board mutation
  const deleteBoardMutation = useMutation({
    mutationFn: async (boardId: string) => {
      const response: AxiosResponse<{ success: boolean; message: string }> =
        await axios.delete(`${backendUrl}/boards/${boardId}`, {
          data: { userId: session?.user?.id },
        });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Board deleted successfully");
      setDeleteModalOpen(false);
      setSelectedBoard(null);
      void refetch();
    },
    onError: () => {
      toast.error("Failed to delete board");
    },
  });

  const handleArchiveBoard = (board: {
    id: string;
    name: string;
    archived: boolean;
  }) => {
    archiveBoardMutation.mutate({
      boardId: board.id,
      archived: !board.archived,
    });
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
    if (selectedBoard) {
      deleteBoardMutation.mutate(selectedBoard.id);
    }
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
                      disabled={archiveBoardMutation.isLoading}
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
                        deleteBoardMutation.isLoading || !isOwner(board)
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
              disabled={deleteBoardMutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteBoardMutation.isLoading}
            >
              {deleteBoardMutation.isLoading ? "Deleting..." : "Delete Board"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
