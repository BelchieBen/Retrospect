import * as React from "react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-workspace";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { api } from "~/trpc/server";
import { IPagesStack } from "./Iconography/Icons";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const boards = await api.board.getBoards();
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))] border-r border-neutral20 bg-white dark:border-neutral70 dark:bg-neutral10"
      {...props}
    >
      <SidebarHeader className="border-b border-neutral20 bg-neutral05 px-4 py-3 dark:border-neutral70 dark:bg-neutral20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-neutral10 dark:hover:bg-neutral30"
            >
              <a href="/" className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-teal70 text-white dark:bg-teal60">
                  <IPagesStack color="white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-black dark:text-white">
                    Spartan
                  </span>
                  <span className="truncate text-xs text-neutral60 dark:text-neutral50">
                    Development
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white px-2 py-4 dark:bg-neutral10">
        <NavMain />
        <NavProjects boards={boards?.BoardMembers} />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-neutral20 bg-neutral05 p-2 dark:border-neutral70 dark:bg-neutral20">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
