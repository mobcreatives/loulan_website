import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";

export type TMenuNavItemProps = {
  data: TMenuCategoryDetails[];
  active: string;
  setActive: (link: string) => void;
  side?: "top" | "right" | "bottom" | "left";
  onClose?: () => void;
  isOpen?: boolean;
};
