import { TSidebarItemsData } from "./types";
import {
  Home,
  Menu,
  FileText,
  Star,
  Calendar,
  MessageSquare,
  Mail,
  Settings,
  Sparkles,
  Image,
} from "lucide-react";

export const sidebarItems: TSidebarItemsData[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Menu Categories",
    href: "/dashboard/menu-categories",
    icon: Menu,
  },
  {
    label: "Food Items",
    href: "/dashboard/food-items",
    icon: FileText,
  },
  {
    label: "Featured Products",
    href: "/dashboard/featured-products",
    icon: Star,
  },
  {
    label: "Popup Products",
    href: "/dashboard/popup-products",
    icon: Sparkles,
  },
  {
    label: "Gallery",
    href: "/dashboard/gallery",
    icon: Image,
  },
  {
    label: "Reservations",
    href: "/dashboard/reservations",
    icon: Calendar,
  },
  {
    label: "Reviews",
    href: "/dashboard/reviews",
    icon: MessageSquare,
  },
  {
    label: "Contact Requests",
    href: "/dashboard/contact-requests",
    icon: Mail,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
