"use client";

import {
  Command,
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react";

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
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Your Boards</SidebarGroupLabel>
      <SidebarMenu>
        {boards?.map((board) => (
          <SidebarMenuItem key={board.board.name}>
            <SidebarMenuButton asChild>
              <Link href={`/boards/${board.board.id}`}>
                <Command />
                <span>{board.board.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
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
