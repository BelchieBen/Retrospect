"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="px-3 py-2 hover:bg-neutral10 data-[state=open]:bg-neutral10 dark:hover:bg-neutral30 dark:data-[state=open]:bg-neutral30"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user.image ?? ""}
                    alt={session?.user.name ?? ""}
                  />
                  <AvatarFallback className="bg-teal70 text-white dark:bg-teal60">
                    {session?.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-black dark:text-white">
                    {session?.user.name}
                  </span>
                  <span className="truncate text-xs text-neutral60 dark:text-neutral50">
                    {session?.user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-neutral60 dark:text-neutral40" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user.image ?? ""}
                      alt={session?.user.name ?? ""}
                    />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/signin">
            <Button>Signin</Button>
          </Link>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
