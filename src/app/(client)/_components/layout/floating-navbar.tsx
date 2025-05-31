"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TFloatingNavProps } from "@/components";
import Image from "next/image";
import { APP_ROUTES, API_ROUTES } from "@/config/routes";
import HamburgerMenu from "./hamburger";
import { useQuery } from "@tanstack/react-query";
import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";
import { TResponse } from "@/global/types";
import MenuNavItem from "./_components/menu-nav-item";
import LoginDialog from "@/app/(client)/booking/_components/login-dialog";
import { useAuth } from "@/context/auth-context";

type MenuCategoriesResponse = TResponse<TMenuCategoryDetails, "menus">;

export default function FloatingNav({ navItems }: Readonly<TFloatingNavProps>) {
  const { _axios } = useAuthAxios();
  const { user, logout } = useAuth();
  const [active, setActive] = useState(navItems[0].link);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
    <>
      <nav className="bg-[#0A1316] flex justify-between items-center text-white py-4 px-10 sm:px-24 lg:px-52 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href={APP_ROUTES.HOME} className="flex items-center">
            <p className="w-20">
              <Image
                className="size-full object-cover"
                src="/images/logo.png"
                alt="Logo"
                width={80}
                height={80}
              />
            </p>
          </Link>

          {/* Middle navigation items */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
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
                ) : item.link === APP_ROUTES.LOGIN ? null : (
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

          {/* Login/Logout button and hamburger menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                className={cn(
                  "hidden md:block text-sm capitalize bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                )}
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <button
                className={cn(
                  "hidden md:block text-sm capitalize bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 transition-colors",
                  isLoginOpen && "bg-primary/90"
                )}
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </button>
            )}
            <HamburgerMenu
              navItems={navItems}
              active={active}
              setActive={setActive}
              menuCategories={data?.menus || []}
            />
          </div>
        </div>
      </nav>

      <LoginDialog open={isLoginOpen} setOpen={setIsLoginOpen} data={undefined} mutationFunction={async () => {}} />
    </>
  );
}
