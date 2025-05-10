import React from "react";
import { TFeaturedCardPros } from "./types";

export default function FeaturedCard({

  image,
}: Readonly<TFeaturedCardPros>) {
  return (
    <div
      className="font-fredoka rounded-[20px] border-2 border-[#121A1D] px-10 pt-5 pb-10 h-60 w-full md:w-120 lg:w-100 xl:w-110 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: image
          ? `url(${image})`
          : "url(/images/placeholder.svg)",
      }}
    >
      {/* <h4 className="text-[clamp(2.25rem,2.1266rem+0.5195vw,2.75rem)] font-bold">
        {title}
      </h4>
      <p className="max-w-[25ch]">{description}</p> */}
      {/* <div className="absolute bg-primary size-25 rounded-full left-10 -bottom-5 flex items-center justify-center flex-col -space-y-3"> */}
        {/* <p className="text-[#F3274C] font-bold text-[clamp(1.25rem,1.1883rem+0.2597vw,1.5rem)]">
          Rs {price}
        </p> */}
        {/* <p className="text-black">person</p> */}
      </div>
    // </div>
  );
}
