"use client";

import { APP_ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import MenuNavItem from "./_components/menu-nav-item";
import { TMenuCategoryDetails } from "@/app/dashboard/menu-categories/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginDialog from "@/app/(client)/booking/_components/login-dialog";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/(auth)/login/helper";
import { toast } from "sonner";

type THamburgerMenuProps = {
  navItems: {
    name: string;
    link: string;
  }[];
  active: string;
  setActive: (link: string) => void;
  menuCategories: TMenuCategoryDetails[];
};

export default function HamburgerMenu({
  navItems,
  active,
  setActive,
  menuCategories,
}: Readonly<THamburgerMenuProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { mutateAsync } = useMutation({
    mutationKey: ["login", "user"],
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successful");
      setIsLoginOpen(false);
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden group"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              stroke="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className={cn(
                "w-7 h-7 fill-[#E9C507] overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&>_path]:[transition:transform_.35s_ease]",
                isOpen && "rotate-45"
              )}
            >
              <path
                className={cn(
                  "group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]",
                  isOpen && "[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
                )}
                d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
              ></path>
              <path
                className={cn(
                  "group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]",
                  isOpen && "[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
                )}
                d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
              ></path>
              <path
                className={cn(
                  "group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]",
                  isOpen && "[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
                )}
                d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
              ></path>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-[#0A1316] text-white border-none"
        >
          <div className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Fragment key={item.link}>
                {item.link === APP_ROUTES.MENU ? (
                  <MenuNavItem
                    data={menuCategories}
                    active={active}
                    setActive={setActive}
                  />
                ) : (
                  <Link
                    href={item.link}
                    className={cn(
                      "text-sm capitalize py-2",
                      active === item.link && "text-primary"
                    )}
                    onClick={() => {
                      setActive(item.link);
                      setIsOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </Fragment>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary py-2.5 rounded-[6px] font-medium cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setIsLoginOpen(true);
              }}
            >
              Login
            </motion.button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <LoginDialog
        open={isLoginOpen}
        setOpen={setIsLoginOpen}
        data={null}
        mutationFunction={mutateAsync}
      />
    </>
  );
}
