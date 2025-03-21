"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components";
import React, { cloneElement, useEffect } from "react";
import { sidebarItems } from "../data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const { open } = useSidebar();
  const [activeTab, setActiveTab] = React.useState(sidebarItems[0].href);

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);
  return (
    <>
      {!open && <SidebarTrigger className="cursor-pointer text-white size-5" />}
      <Sidebar className="px-4 bg-[#2e2e2e]">
        <SidebarHeader className="flex items-center justify-center bg-[#2e2e2e]">
          <div className="flex items-center justify-between w-full py-2">
            <h1 className="font-oswald font-semibold text-primary text-[clamp(1.125rem,0.6563rem+1.5vw,1.5rem)]">Loulan</h1>
            {open && (
              <SidebarTrigger className="cursor-pointer text-white size-7 hover:bg-primary hover:text-black p-1 transition duration-500 rounded-full" />
            )}
          </div>
          <div className="h-[1.5px] w-full bg-primary mt-1 rounded-full"/>
        </SidebarHeader>
        <SidebarContent className="bg-[#2e2e2e] pt-1 -space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center text-white py-2.5 rounded-[4px] px-3 transition-colors duration-500",
                activeTab === item.href
                  ? "bg-primary text-black"
                  : "hover:bg-primary/10"
              )}
              onClick={() => setActiveTab(item.href)}
            >
              <p className="size-6">
                {cloneElement(item.icon, {
                  className: cn(
                    "fill-primary",
                    activeTab === item.href && "fill-black"
                  ),
                })}
              </p>
              {open && (
                <span className="ml-3 font-semibold font-epilogue text-[clamp(0.75rem,0.5938rem+0.5vw,0.875rem)] tracking-wider capitalize">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </SidebarContent>
      </Sidebar>
    </>
  );
}
