"use client";

import { IBell, IQuestion, ISearch } from "~/components/Iconography/Icons";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggle } from "~/app/_components/theme-toggle";
import { useSession } from "next-auth/react";
import Image from "next/image";

export function SiteHeader() {
  const session = useSession();
  return (
    <header className="sticky top-0 z-50 w-full bg-teal80 text-white dark:bg-teal70">
      <div className="flex h-14 w-full items-center justify-between px-4">
        {/* Left Section - Quality Management Dropdown */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-white/10 flex items-center gap-2 font-medium text-white"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-white">
                  <div className="h-3 w-3 rounded-sm bg-teal80 dark:bg-teal70"></div>
                </div>
                Retrospect
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <Link href="/boards" className="w-full">
                  Retrospect Boards
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center Section - Search Bar */}
        <div className="mx-8 max-w-md flex-1">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <ISearch color="white" size={20} />
            </div>
            <Input
              type="search"
              placeholder="Search"
              className="h-9 w-full border-2 border-white bg-transparent pl-10 text-white placeholder:text-white"
            />
          </div>
        </div>

        {/* Right Section - Icons and User */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 relative h-8 w-8 text-white"
          >
            <IBell color="white" size={20} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 h-8 w-8 text-white"
          >
            <IQuestion color="white" size={20} />
          </Button>

          <ThemeToggle />

          {/* User Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.data?.user.image ?? ""} alt="User" />
            <AvatarFallback className="bg-white text-sm font-medium text-[#22a3af]">
              U
            </AvatarFallback>
          </Avatar>

          {/* Brand */}
          <div className="ml-2 font-medium text-white">
            <Image src="/Ideagen_logo.png" width={80} height={40} alt="Logo" />
          </div>
        </div>
      </div>
    </header>
  );
}
