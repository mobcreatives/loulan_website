import Image from "next/image";
import React from "react";
import { TMenuCardProps } from "./types";

export default function MenuCard({
  description,
  image,
  price,
  title,
}: Readonly<TMenuCardProps>) {
  return (
    <div className="flex items-center gap-x-3 border-b-2 border-white pb-3 border-dotted">
      <p className="w-30">
        <Image
          src={image}
          className="size-full object-cover rounded-full "
          alt={description}
          height={720}
          width={1080}
        />
      </p>
      <div className="">
        <h4 className="text-[clamp(1rem,0.6875rem+1vw,1.25rem)] uppercase font-semibold">
          {title}
        </h4>
        <p className="text-[clamp(0.75rem,0.4375rem+1vw,1rem)]">
          {description}
        </p>
      </div>
      <p className="text-nowrap text-primary font-bold text-[clamp(1rem,0.6875rem+1vw,1.25rem)]">
        Rs. {price}
      </p>
    </div>
  );
}
