"use client";

import { SidebarIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "~/app/_components/theme-toggle";

import { SearchForm } from "~/components/search-form";
import { Button } from "~/components/ui/button";
import { useSidebar } from "~/components/ui/sidebar";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
        {/* <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
        <Link href="/">Retrospect</Link>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        <ThemeToggle />
      </div>
    </header>
  );
}
