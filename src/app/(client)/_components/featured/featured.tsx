"use client";

import React from "react";
import FeaturedCard from "./featured-card";
import { TextWithLine } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useAuthAxios } from "@/config/auth-axios";
import { API_ROUTES } from "@/config/routes";
import { TResponse } from "@/global/types";
import { TFoodDetails } from "@/app/dashboard/food-items/types";
export default function Featured() {
  const { _axios } = useAuthAxios();
  const { data } = useQuery({
    queryKey: ["get", "featured"],
    queryFn: getFeatured,
  });

  async function getFeatured() {
    const { data } = await _axios.get<TResponse<TFoodDetails, "foodItems">>(
      `${API_ROUTES.FOODS}?isFeatured=true`
    );
    return data.foodItems;
  }
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-10">
      <TextWithLine
        text="Featured Products"
        className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[225px] before:h-[5px] before:-bottom-1 text-center"
      />
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-2 gap-x-8 gap-y-10">
          {Array.isArray(data) &&
            data.map((item) => (
              <FeaturedCard
                key={item.id}
                description={item.description}
                price={item.price}
                title={item.name}
                image={item.imgUrl}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
