import { APP_ROUTES } from "@/config/routes";
import { IconBrandAppgallery, IconBrandBooking, IconHome, IconMenu, IconMessage, IconUser } from "@tabler/icons-react";

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
    link: APP_ROUTES.BOOKING,
    icon: <IconBrandBooking className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
