"use client";
import React from "react";
import MenuCard from "./menu-card";
import { _axios } from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import { useQuery } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";

export default function TrendingFood() {
  const { data: foods } = useQuery({
    queryFn: getAllFoods,
    queryKey: KEYS.FOOD.GET,
  });

  async function getAllFoods() {
    try {
      const response = await _axios.get(API_ROUTES.FOODS);
      return response.data;
    } catch {
      throw new Error("Failed to load food items");
    }
  }

  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-14 flex justify-center">
      <div className="max-w-[1200px] font-oswald flex flex-col items-center">
        <p className="text-center text-[clamp(0.8125rem,0.5781rem+0.75vw,1rem)] text-primary font-bold">
          About Our Food
        </p>
        <h3 className="text-center font-bold text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)]">
          Trending Food Menu
        </h3>
        <div className="p-10 mt-8 rounded-[12px] border-2 border-dotted border-white max-w-300 grid xl:grid-cols-2 gap-10">
          {foods?.foodItems.map((food) => {
            return (
              <MenuCard
                key={food.id}
                description={food.description}
                image={food.imgUrl}
                price={food.price}
                title={food.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
