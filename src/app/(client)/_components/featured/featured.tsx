import React from "react";
import FeaturedCard from "./featured-card";
import { TextWithLine } from "@/components";
export default function Featured() {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-10">
      <TextWithLine
        text="Featured Products"
        className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[225px] before:h-[5px] before:-bottom-1 text-center"
      />
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-2 gap-x-8 gap-y-10">
          <FeaturedCard
            description="canonical classics to obscure tiki drinks"
            price={200}
            title="Steaks & BBQ"
            image="/images/banners/bbq-banner.png"
          />
          <FeaturedCard
            description="canonical classics to obscure tiki drinks"
            price={120}
            title="Cocktails"
            image="/images/banners/cocktail-banner.png"
          />
        </div>
      </div>
    </section>
  );
}
