"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TFloatingNavProps } from "@/components";
import Image from "next/image";
import { APP_ROUTES } from "@/config/routes";

export function FloatingNav({ navItems }: Readonly<TFloatingNavProps>) {
  const [active, setActive] = useState(navItems[0].link);

  return (
    // <AnimatePresence mode="wait">
    //   <motion.div
    //     initial={{
    //       opacity: 1,
    //       y: -100,
    //     }}
    //     animate={{
    //       y: visible ? 0 : -100,
    //       opacity: visible ? 1 : 0,
    //     }}
    //     transition={{
    //       duration: 0.2,
    //     }}
    //     className={cn(
    //       "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
    //       className
    //     )}
    //   >
    // {navItems.map((navItem, idx: number) => (
    //   <Link
    //     key={`link=${navItem.name}-${idx}`}
    //     href={navItem.link}
    //     className={cn(
    //       "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
    //     )}
    //   >
    //     <span className="block sm:hidden">{navItem.icon}</span>
    //     <span className="hidden sm:block text-sm">{navItem.name}</span>
    //   </Link>
    // ))}
    //     <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
    //       <span>Login</span>
    //       <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
    //     </button>
    //   </motion.div>
    // </AnimatePresence>
    <nav className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white flex justify-around py-4 sticky top-0 z-50 items-center">
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
      <div className="flex gap-x-8">
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
        className="bg-primary text-black px-4 rounded-[8px] py-2"
      >
        Reservation
      </Link>
    </nav>
  );
}
