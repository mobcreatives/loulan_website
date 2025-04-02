import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";
import { JSX } from "react";

export type TMenuButtonPros = {
  data: TMenuCategoryDetails;
  icon: JSX.Element;
};

export type TMenuProps = {
  showMenuText?: boolean;
};

export type TUseClientStore = {
  activeTab: TMenuCategoryDetails | null;
  setActiveTab: (tab: TMenuCategoryDetails) => void;
};
