"use client";

import React from "react";
import { IButtonWithBorderProps } from "./types";
import { cn } from "@/lib/utils";
export default function ButtonWithBorder({
  text,
  onClick,
  className,
  type = "button",
}: Readonly<IButtonWithBorderProps>) {
  return (
    <button
      className={cn(
        "bg-primary text-black px-6 py-2 rounded-[12px] font-medium capitalize font-fredoka relative before:content-[''] before:absolute before:inset-0 before:left-1 before:scale-y-125 before:w-[100.5%] before:rounded-[12px] before:border-2 before:border-primary before:-z-1 isolate cursor-pointer",
        "hover:scale-105 transition-all duration-300",
        "active:scale-95",
        className
      )}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
