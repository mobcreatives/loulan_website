import React from "react";
import { TTextWithLineProps } from "./types";
import { cn } from "@/lib/utils";

export default function TextWithLine({
  className,
  text,
}: Readonly<TTextWithLineProps>) {
  return (
    <p
      className={cn(
        "before:content-[''] relative before:absolute before:rounded-full before:bg-primary before:left-1/2 before:-translate-x-1/2",
        className
      )}
    >
      {text}
    </p>
  );
}

export { TextWithLine };
