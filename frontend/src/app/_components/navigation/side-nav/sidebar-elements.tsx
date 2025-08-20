import {
  IBookmarkOutline,
  ICog,
  IFileText,
  IPaperPlane,
  IQuestion,
  IUsers,
} from "~/icons";

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
    },
    {
      title: "Templates",
      url: "/templates",
      icon: <IFileText />,
    },
    {
      title: "Members",
      url: "/members",
      icon: <IUsers />,
    },
    {
      title: "Team Members",
      url: "/members",
      icon: <IUsers />,
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
      url: "/feedback",
      icon: <IPaperPlane />,
    },
  ],
};
