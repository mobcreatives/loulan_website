import React from "react";
import FeaturedCard from "./featured-card";
export default function Featured() {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-10 flex justify-center">
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
    </section>
  );
}
