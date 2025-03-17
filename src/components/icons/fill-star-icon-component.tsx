import React from "react";
import { TIconComponentProps } from "../types";
import { cn } from "@/lib/utils";

export default function FillStarIconComponent({
  className,
}: Readonly<TIconComponentProps>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 57 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5 0L35.1232 20.384H56.5562L39.2165 32.982L45.8397 53.366L28.5 40.768L11.1603 53.366L17.7835 32.982L0.443832 20.384H21.8768L28.5 0Z"
        className={cn("fill-[#FFD700]", className)}
      />
    </svg>
  );
}

export { FillStarIconComponent };
