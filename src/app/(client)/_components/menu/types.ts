import { JSX } from "react";

export type TMenuEnum = string;

export type TMenuButtonPros = {
  text: TMenuEnum;
  icon: JSX.Element;
};

export type TMenuProps = {
  showMenuText?: boolean;
};

export type TUseClientStore = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
