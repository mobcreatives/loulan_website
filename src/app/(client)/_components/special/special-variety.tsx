import React from "react";
import { TSpecialVarietyProps } from "./types";

export default function SpecialVariety({
  title,
  description,
  price,
  img,
}: Readonly<TSpecialVarietyProps>) {
  return (
    <div className="flex justify-between border-b-3 border-dashed pb-2.5">
      <div className="font-fredoka space-y-0.5">
        <img src={img} className="h-16 w-16 rounded-full" alt="food images" />
        <h4 className="text-[clamp(1.25rem,1.1883rem+0.2597vw,1.5rem)] font-semibold capitalize">
          {title}
        </h4>
        <p className="font-epilogue text-sm text-[#555555] truncate">
          {description}
        </p>
      </div>
      <p className="text-primary font-medium text-[clamp(1.25rem,1.1883rem+0.2597vw,1.5rem)] text-nowrap">
        Rs. {price}
      </p>
    </div>
  );
}
