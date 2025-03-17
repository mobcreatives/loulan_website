import React from "react";
import { IButtonWithBorderProps } from "./types";

export default function ButtonWithBorder({
  text,
  onClick,
  type = "button",
}: Readonly<IButtonWithBorderProps>) {
  return (
    <button
      className="bg-primary text-black px-6 py-2 rounded-[12px] font-medium capitalize font-fredoka relative before:content-[''] before:absolute before:inset-0 before:left-2.5 before:scale-y-125 before:scale-x-[107%] before:rounded-[12px] before:border-2 before:border-primary before:-z-1 isolate cursor-pointer"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export { ButtonWithBorder };
