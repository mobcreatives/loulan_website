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
          <DropdownMenuContent align="end" className="min-w-[125px] space-y-1 md:hidden">
            {navItems.map((navItem, idx: number) => (
              <DropdownMenuItem key={`link=${navItem.name}-${idx}`} className="pb-2">
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
