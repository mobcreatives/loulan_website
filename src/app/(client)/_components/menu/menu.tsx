"use client";

import { DesertIconComponent, TextWithLine } from "@/components";
import { useEffect } from "react";
import { TMenuProps } from "./types";
import MenuButton from "./menu-button";
import { useQuery } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { useAuthAxios } from "@/config/auth-axios";
import { TResponse } from "@/global/types";
import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";
import { API_ROUTES } from "@/config/routes";
import { useClientMenuStore } from "./store";

export default function Menu({ showMenuText = false }: Readonly<TMenuProps>) {
  // hooks
  const { _axios } = useAuthAxios();
  // stores
  const { setActiveTab } = useClientMenuStore();
  // tanstack/react-query
  const { data: menusCategories } = useQuery({
    queryKey: KEYS.MENU_CATEGORIES.GET,
    queryFn: getMenuCategories,
  });
  // handlers
  async function getMenuCategories() {
    try {
      const response = await _axios.get<
        TResponse<TMenuCategoryDetails, "menus">
      >(API_ROUTES.MENU_CATEGORIES);
      return response.data.menus;
    } catch {
      throw new Error("Failed to fetch menu categories");
    }
  }
  // use effect
  useEffect(() => {
    if (menusCategories) {
      setActiveTab(menusCategories[0].name);
    }
  }, [menusCategories, setActiveTab]);
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-14">
      <div className="space-y-3 flex flex-col items-center ">
        {showMenuText && (
          <TextWithLine
            text="Menu"
            className="before:w-[100%] before:h-[1px] before:-bottom-0.5"
          />
        )}
        <TextWithLine
          text="Discover Menu"
          className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
        />
      </div>
      <div className=" w-full flex justify-center gap-5 ">
        {menusCategories?.map((cuisine) => {
          return (
            <MenuButton
              key={cuisine.id}
              text={cuisine?.name}
              icon={<DesertIconComponent />}
            />
          );
        })}
      </div>
    </section>
  );
}
