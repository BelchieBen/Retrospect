import * as React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { IUsers, ICog, IPaperPlane } from "~/icons";
import Link from "next/link";

const adminItems = [
  {
    title: "Feedback Review",
    url: "/admin/feedback",
    icon: <IPaperPlane />,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: <IUsers />,
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    icon: <ICog />,
  },
];

export function NavAdmin() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="mb-2 px-3 font-semibold uppercase tracking-wide text-neutral60 dark:text-neutral40">
        Administration
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {adminItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-neutral90 hover:bg-neutral10 dark:text-neutral10 dark:hover:bg-neutral30"
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3 rounded-md px-3 py-2"
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
