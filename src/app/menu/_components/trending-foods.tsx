import React from "react";
import MenuCard from "./menu-card";

export default function TrendingFood() {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24  2xl:px-44 bg-[#0A1316] text-white py-10 space-y-14">
      <div className="max-w-[1200px] font-oswald flex flex-col items-center">
        <p className="text-center text-[clamp(0.8125rem,0.5781rem+0.75vw,1rem)] text-primary font-bold">
          About Our Food
        </p>
        <h3 className="text-center font-bold text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)]">
          Trending Food Menu
        </h3>
        <div className="p-10 mt-5 rounded-[12px] border-2 border-dotted border-white max-w-300 grid xl:grid-cols-2 gap-10">
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={200}
            title="CHICAGO DEEP PIZZA"
          />
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={300}
            title="CHINESE PASTA"
          />
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={360}
            title="Chicago Burger King"
          />
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={400}
            title="Chicago chicken wings"
          />
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={250}
            title="Chicago French Fries"
          />
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={450}
            title="Chicago Deep Pasta"
          />
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={230}
            title="Chicago beef jerky"
          />
          <MenuCard
            description="Its the perfect dining experience where Experience quick and efficient"
            image="/images/bbq.png"
            price={400}
            title="Chicago salad recipes"
          />
        </div>
      </div>
    </section>
  );
}
