import {
  IBookmarkOutline,
  ICog,
  IPaperPlane,
  IQuestion,
  IUsers,
} from "~/components/Iconography/Icons";

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
      icon: <IBookmarkOutline />,
      isActive: true,
    },
    {
      title: "Members",
      url: "/",
      icon: <IUsers />,
      action: {
        icon: "plus",
        url: "/",
      },
    },

    {
      title: "Workspace Settings",
      url: "/",
      icon: <ICog />,
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
      icon: <IQuestion />,
    },
    {
      title: "Feedback",
      url: "/",
      icon: <IPaperPlane />,
    },
  ],
};
