import { DashboardIconComponent, MenuIconComponent } from "@/components";
import { TSidebarItemsData } from "./types";

export const sidebarItems: TSidebarItemsData[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIconComponent />,
  },
  {
    label: "Menu",
    href: "/dashboard/menu",
    icon: <MenuIconComponent />,
  },
  {
    label: "cuisine",
    href: "/dashboard/cuisine",
    icon: <DashboardIconComponent />,
  },
];
