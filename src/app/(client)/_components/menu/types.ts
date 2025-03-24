import { Dispatch, JSX, SetStateAction } from "react";

export type TMenuEnum = string;

export type TMenuButtonPros = {
  activeTab: TMenuEnum;
  setActiveTab: Dispatch<SetStateAction<TMenuEnum>>;
  text: TMenuEnum;
  icon: JSX.Element;
};

export type TMenuProps = {
  showMenuText?: boolean;
};
