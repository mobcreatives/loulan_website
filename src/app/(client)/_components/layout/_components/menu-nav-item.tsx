import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components";
import React, { useState, useEffect } from "react";
import { TMenuNavItemProps } from "../types";
import Link from "next/link";
import { APP_ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MenuNavItem({
  data,
  active,
  setActive,
  side = "bottom",
}: TMenuNavItemProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close dropdown when active route changes
  useEffect(() => {
    setOpen(false);
  }, [active]);

  const menuContent = (
    <>
      {Array.isArray(data) &&
        data
          .filter((category) => category.isActive)
          .map((category) => (
            <Link
              href={`${APP_ROUTES.MENU}?category=${category.id}`}
              key={category.id}
              className={cn(
                "items-center flex space-x-1 relative text-sm capitalize w-fit",
                activeCategory === category.name &&
                  "before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-black before:rounded-full before:bottom-0 before:transition-colors before:duration-500 before:ease-in-out"
              )}
              onClick={() => {
                setActiveCategory(category.name);
                setActive(APP_ROUTES.MENU);
                setOpen(false);
              }}
            >
              <span>{category.name}</span>
            </Link>
          ))}
    </>
  );

  if (isMobile) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "items-center flex space-x-1 relative group",
              active === APP_ROUTES.MENU &&
                "before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-primary before:rounded-full before:bottom-0 before:transition-colors before:duration-500 before:ease-in-out"
            )}
            onClick={() => {
              setActive(APP_ROUTES.MENU);
              setOpen(true);
            }}
          >
            <span>Menus</span>
            <svg
              className={cn(
                `w-4 h-4 transition-transform group-hover:rotate-180`,
                open && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="left"
          className="min-w-[125px] space-y-1 bg-[#0A1316] text-white border border-[#0A1316]"
        >
          {Array.isArray(data) &&
            data
              .filter((category) => category.isActive)
              .map((category) => (
                <DropdownMenuItem key={category.id} className="pb-2" onClick={() => {
                  setActiveCategory(category.name);
                  setActive(APP_ROUTES.MENU);
                  setOpen(false);
                }}>
                  <Link
                    href={`${APP_ROUTES.MENU}?category=${category.id}`}
                    className="w-full"
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger onClick={() => {
        setActive(APP_ROUTES.MENU);
        setOpen(false);
      }}>
        <Link
          href={APP_ROUTES.MENU}
          className={cn(
            "items-center flex space-x-1 relative group",
            active === APP_ROUTES.MENU &&
              "before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-primary before:rounded-full before:bottom-0 before:transition-colors before:duration-500 before:ease-in-out"
          )}
        >
          <span>Menus</span>
          <svg
            className={cn(
              `w-4 h-4 transition-transform group-hover:rotate-180`,
              open && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        align="center"
        className={cn("text-black w-30 space-y-2 pt-3 pb-1")}
        side={side}
      >
        {menuContent}
      </TooltipContent>
    </Tooltip>
  );
}
