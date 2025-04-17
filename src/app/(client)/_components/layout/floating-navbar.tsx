"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TFloatingNavProps,
} from "@/components";
import Image from "next/image";
import { APP_ROUTES } from "@/config/routes";
import HamburgerMenu from "./hamburger";
import { useQuery } from "@tanstack/react-query";
import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";
import { API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";

interface MenuResponse {
  status: string;
  menus: TMenuCategoryDetails[];
}

function MenuDropdown() {
  const { _axios } = useAuthAxios();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch menu categories
  const { data: response, isLoading, error } = useQuery<MenuResponse>({
    queryKey: KEYS.MENU_CATEGORIES.GET,
    queryFn: async () => {
      try {
        const response = await _axios.get<MenuResponse>(API_ROUTES.MENU_CATEGORIES);
        return response.data;
      } catch (error) {
        console.error("Error fetching menu categories:", error);
        throw new Error("Failed to fetch menu categories");
      }
    },
  });

  const categories = response?.menus || [];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center space-x-1">
        <span className="text-sm">Menu</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[200px] bg-[#0A1316] text-white border border-[#0A1316]"
      >
        {isLoading ? (
          <DropdownMenuItem className="text-sm py-2">Loading...</DropdownMenuItem>
        ) : error ? (
          <DropdownMenuItem className="text-sm py-2 text-red-500">
            Error loading categories
          </DropdownMenuItem>
        ) : categories.length > 0 ? (
          categories
            .filter(category => category.isActive)
            .map((category) => (
              <DropdownMenuItem key={category.id} className="py-2">
                <Link
                  href={`${APP_ROUTES.MENU}?category=${category.id}`}
                  className="w-full text-sm hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </DropdownMenuItem>
            ))
        ) : (
          <DropdownMenuItem className="text-sm py-2">No categories available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FloatingNav({ navItems }: Readonly<TFloatingNavProps>) {
  const [active, setActive] = useState(navItems[0].link);
  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  return (
    <nav className="bg-[#0A1316] flex justify-between items-center md:block text-white py-4 px-10 sm:px-24 lg:px-52 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link href={APP_ROUTES.HOME} className="flex items-center">
          <p className="w-20">
            <Image
              className="size-full object-cover"
              src={"/images/logo.png"}
              alt="a minimalistic logo for Loulan"
              width={40}
              height={40}
            />
          </p>
        </Link>
        <div className="md:flex gap-x-8 hidden">
          {navItems.map((navItem, idx: number) => (
            navItem.name === "Menu" ? (
              <MenuDropdown key={`link=${navItem.name}-${idx}`} />
            ) : (
              <Link
                key={`link=${navItem.name}-${idx}`}
                href={navItem.link}
                className={cn(
                  "items-center flex space-x-1 relative",
                  active === navItem.link &&
                    "before:content-[''] before:absolute before:w-full before:h-[1.5px] before:bg-primary before:rounded-full before:bottom-0 before:transition-colors before:duration-500 before:ease-in-out"
                )}
                onClick={() => setActive(navItem.link)}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </Link>
            )
          ))}
        </div>
        <Link
          href={APP_ROUTES.BOOKING}
          className="bg-primary text-black px-4 rounded-[8px] py-2 hidden md:block"
        >
          Reservation
        </Link>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HamburgerMenu />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[125px] space-y-1 md:hidden bg-[#0A1316] text-white border border-[#0A1316]"
          >
            {navItems.map((navItem, idx: number) => (
              navItem.name === "Menu" ? (
                <DropdownMenuItem key={`link=${navItem.name}-${idx}`} className="pb-2">
                  <MenuDropdown />
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  key={`link=${navItem.name}-${idx}`}
                  className="pb-2"
                >
                  <Link
                    href={navItem.link}
                    className={cn(
                      "items-center flex space-x-1 relative",
                      active === navItem.link &&
                        "before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-primary before:rounded-full before:bottom-0 before:transition-colors before:duration-500 before:ease-in-out"
                    )}
                    onClick={() => setActive(navItem.link)}
                  >
                    <span>{navItem.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            ))}
            <DropdownMenuItem className="pb-2">
              <Link
                href={APP_ROUTES.BOOKING}
                className={cn(
                  "items-center flex space-x-1 relative",
                  active === APP_ROUTES.BOOKING &&
                    "before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-primary before:rounded-full before:bottom-0 before:transition-colors before:duration-500 before:ease-in-out"
                )}
              >
                <span>Reservation</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
