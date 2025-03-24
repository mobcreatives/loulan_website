"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components";
import React, { useEffect, useState } from "react";
import { sidebarItems } from "../data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const { open } = useSidebar();
  const [activeTab, setActiveTab] = useState(sidebarItems[0].href);
  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);
  return (
    <Sidebar className="px-4 border-primary/50">
      <SidebarHeader className="flex items-center justify-center">
        <div className="flex items-center justify-between w-full py-2">
          <h1 className="font-oswald text-[clamp(1.125rem,0.6563rem+1.5vw,1.5rem)] text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400">
            Loulan
          </h1>
        </div>
        <div className="h-[1.5px] w-full bg-primary mt-1 rounded-full" />
      </SidebarHeader>
      <SidebarContent className=" pt-1 -space-y-1 ">
        {sidebarItems.map((item) => (
          <li key={item.label} className="list-none">
            <Link
              href={item.href}
              onClick={() => setActiveTab(item.href)}
              className={cn(
                `sidebar-item items-center`,
                item.href === activeTab && "active",
                open && "p-3"
              )}
            >
              <item.icon
                size={open ? 22 : 18}
                className={open ? "" : "min-w-5"}
              />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
