import {
  BookMarked,
  Users,
  Plus,
  Settings2,
  LifeBuoy,
  Send,
} from "lucide-react";

export const SidebarElements = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Boards",
      url: "/boards",
      icon: BookMarked,
      isActive: true,
    },
    {
      title: "Members",
      url: "/",
      icon: Users,
      action: {
        icon: Plus,
        url: "/",
      },
    },

    {
      title: "Workspace Settings",
      url: "/",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/",
        },
        {
          title: "Team",
          url: "/",
        },
        {
          title: "Billing",
          url: "/",
        },
        {
          title: "Limits",
          url: "/",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/",
      icon: Send,
    },
  ],
};
