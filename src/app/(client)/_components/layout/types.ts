import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";

export type TMenuNavItemProps = {
  data: TMenuCategoryDetails[];
  setActive: React.Dispatch<React.SetStateAction<string>>;
  active: string;
  side?: "top" | "bottom" | "left" | "right";
  isOpen?: boolean;
  onClose?: () => void;
};
