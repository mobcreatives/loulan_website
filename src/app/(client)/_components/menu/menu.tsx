"use client";

import { DesertIconComponent, TextWithLine } from "@/components";
import { useState } from "react";
import { TMenuEnum, TMenuProps } from "./types";
import MenuButton from "./menu-button";
import { useQuery } from "@tanstack/react-query";
import { getCuisinType } from "@/lib/actions";
import { KEYS } from "@/config/constants";

export default function Menu({ showMenuText = false }: Readonly<TMenuProps>) {
  const { data: cuisines } = useQuery({
    queryFn: getCuisinType,
    queryKey: KEYS.CUISINE.GET,
  });
  console.log("cuisines", cuisines);
  const [activeTab, setActiveTab] = useState<TMenuEnum>("");
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
        {cuisines?.cuisines?.map((cuisine) => {
          return (
            <MenuButton
              key={cuisine.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              text={cuisine?.type}
              icon={<DesertIconComponent />}
            />
          );
        })}
      </div>
    </section>
  );
}
