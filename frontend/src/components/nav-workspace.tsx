"use client";

import { Folder, MoreHorizontal, Share, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
import { IPagesStack } from "./Iconography/Icons";

export function NavProjects({
  boards,
}: Readonly<{
  boards:
    | Prisma.BoardMembersGetPayload<{ include: { board: true } }>[]
    | undefined
    | null;
}>) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="mt-6 px-2 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-neutral60 dark:text-neutral40">
        Your Boards
      </SidebarGroupLabel>
      <SidebarMenu>
        {boards?.map((board) => (
          <SidebarMenuItem key={board.board.name}>
            <SidebarMenuButton
              asChild
              className="text-neutral90 hover:bg-neutral10 dark:text-neutral10 dark:hover:bg-neutral30"
            >
              <Link
                href={`/boards/${board.board.id}`}
                className="flex items-center gap-3 rounded-md px-3 py-2"
              >
                <IPagesStack />
                <span className="font-medium">{board.board.name}</span>
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
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
