import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Menu",
    link: "/menu",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },

  {
    name: "Gallery",
    link: "/gallery",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Booking",
    link: "/booking",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
