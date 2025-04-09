import { APP_ROUTES } from "@/config/routes";
import { IconBrandAppgallery, IconHome, IconMenu, IconMessage2,  } from "@tabler/icons-react";

export const navItems = [
  {
    name: "Home",
    link: APP_ROUTES.HOME,
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Menu",
    link: APP_ROUTES.MENU,
    icon: <IconMenu className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },

  {
    name: "Gallery",
    link: APP_ROUTES.GALLERY,
    icon: <IconBrandAppgallery className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Booking",
    link: APP_ROUTES.CONTACTS,
    icon: <IconMessage2 className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
