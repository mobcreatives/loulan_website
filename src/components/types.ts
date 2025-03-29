import { JSX } from "react";

export type TFloatingItem = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

export type TFloatingNavProps = {
  navItems: TFloatingItem[];
};

export type TIconComponentProps = {
  className?: string;
};

export type TTextWithLineProps = { className?: string; text: string };
