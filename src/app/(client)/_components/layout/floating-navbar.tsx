"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  TFloatingNavProps,
} from "@/components";
import Image from "next/image";
import { APP_ROUTES, API_ROUTES } from "@/config/routes";
import HamburgerMenu from "./hamburger";
import { useQuery } from "@tanstack/react-query";
import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";
import { TResponse } from "@/global/types"; 
import MenuNavItem from "./_components/menu-nav-item";

type MenuCategoriesResponse = TResponse<TMenuCategoryDetails, "menus">;

export function FloatingNav({ navItems }: Readonly<TFloatingNavProps>) {
  const { _axios } = useAuthAxios();
  const [active, setActive] = useState(navItems[0].link);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useQuery<MenuCategoriesResponse>({
    queryKey: KEYS.MENU_CATEGORIES.GET,
    queryFn: async () => {
      try {
        const response = await _axios.get<MenuCategoriesResponse>(API_ROUTES.MENU_CATEGORIES);
        return response.data;
      } catch {
        throw new Error("Failed to fetch menu categories");
      }
    },
  });

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#0A1316] flex justify-between items-center text-white py-4 px-10 sm:px-24 lg:px-52 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full">
        <Link href={APP_ROUTES.HOME} className="flex items-center">
          <p className="w-20">
            <Image
              className="size-full object-cover"
              src={"/images/logo.png"}
              alt="Logo"
              width={80}
              height={80}
            />
          </p>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <React.Fragment key={item.link}>
              {item.link === APP_ROUTES.MENU ? (
                <MenuNavItem
                  data={data?.menus || []}
                  active={active}
                  setActive={setActive}
                  isOpen={isMenuOpen}
                  onClose={handleMenuClose}
                />
              ) : (
                <Link
                  href={item.link}
                  className={cn(
                    "text-sm capitalize",
                    active === item.link && "text-primary"
                  )}
                  onClick={() => setActive(item.link)}
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center">
          <HamburgerMenu
            navItems={navItems}
            active={active}
            setActive={setActive}
            menuCategories={data?.menus || []}
          />
        </div>
      </div>
    </nav>
  );
}
