"use client";

import { DesertIconComponent, TextWithLine } from "@/components";
import { useState } from "react";
import { TMenuEnum } from "../types";
import MenuButton from "./menu-button";
import SteakIconComponent from "@/components/icons/steak-icon-component";
import CoffeeIconComponent from "@/components/icons/coffee-icon-component";
import BurgerIconComponent from "@/components/icons/burger-icon-component";
export default function Menu() {
  const [activeTab, setActiveTab] = useState<TMenuEnum>("desert");
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-14">
      <div className="space-y-3 flex flex-col items-center ">
        <TextWithLine
          text="Menu"
          className="before:w-[100%] before:h-[1px] before:-bottom-0.5"
        />
        <TextWithLine
          text="Discover Menu"
          className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
        />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <MenuButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            text="desert"
            icon={<DesertIconComponent />}
          />
          <MenuButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            text="steak"
            icon={<SteakIconComponent />}
          />
          <MenuButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            text="coffee"
            icon={<CoffeeIconComponent />}
          />
          <MenuButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            text="burger"
            icon={<BurgerIconComponent />}
          />
        </div>
      </div>
    </section>
  );
}
