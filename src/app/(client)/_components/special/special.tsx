"use client";
import Image from "next/image";
import React from "react";
import SpecialVariety from "./special-variety";
import { useQuery } from "@tanstack/react-query";
import { getFood } from "@/app/dashboard/food/helper";
import { KEYS } from "@/config/constants";

export default function Special() {
  const { data: foods } = useQuery({
    queryFn: getFood,
    queryKey: KEYS.FOOD.GET,
  });

  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-5 flex justify-center">
      <div className="relative flex flex-col items-center justify-center lg:flex-row gap-5 isolate">
        <p className="size-90 lg:size-100">
          <Image
            src="/images/bbq.png"
            className="size-full object-cover"
            alt="a plate of freshly cooked barbecue/bbq"
            height={1080}
            width={1920}
          />
        </p>
        <div className="font-fredoka space-y-2 relative before:content-[''] before:w-[120%] lg:before:w-[155%] before:h-[115%] before:bg-[#121A1D] before:absolute before:bottom-0 before:-top-[6%] before:-left-[10%] lg:before:-left-[40%] before:-z-[1] before:rounded-[20px]">
          <h3 className="text-[clamp(2rem,1.8766rem+0.5195vw,2.5rem)] font-medium">
            BBQ
          </h3>
          <div className="space-y-2">
            {foods?.map((food) => {
              return (
                <SpecialVariety
                  key={food.id}
                  price={food.price.toString()}
                  title={food.name}
                  description={food.description}
                  img={""}
                />
              );
            })}
            {/* <SpecialVariety
              description="sticky Asian glaze, charred lime, chilli cashews"
              price={1000}
              title="BBQ baby back ribs"
            />
            <SpecialVariety
              description="miso butter glaze, charred lime wedge, sake bbq"
              price={1100}
              title="Half smoked chicken"
            />
            <SpecialVariety
              description="tossed in Korean hot sauce, pickled radish"
              price={400}
              title="Dusted chicken wings"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
