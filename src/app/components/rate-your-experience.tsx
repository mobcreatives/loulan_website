import { FillStarIconComponent } from "@/components";
import React from "react";

export default function RateYourExperience() {
  return (
    <section className="text-white bg-[#121A1D] flex flex-col gap-x-5 gap-y-2 items-center justify-center font-fredoka py-8 md:flex-row">
      <p className="text-[clamp(1.875rem,1.7825rem+0.3896vw,2.25rem)] font-bold text-center flex flex-col items-center justify-center leading-9">
        <span>Rate Your</span>
        <span>Experience</span>
      </p>
      <div className="flex items-center gap-x-2">
        <p className="size-7 md:size-8">
          <FillStarIconComponent />
        </p>
        <p className="size-7 md:size-8">
          <FillStarIconComponent />
        </p>
        <p className="size-7 md:size-8">
          <FillStarIconComponent />
        </p>
        <p className="size-7 md:size-8">
          <FillStarIconComponent />
        </p>
        <p className="size-7 md:size-8">
          <FillStarIconComponent />
        </p>
      </div>
    </section>
  );
}
