"use client";
import { SidebarTrigger } from "@/components";
import React from "react";

export default function DashboardTopbar() {
  return (
    <nav className="flex items-center py-4 w-full border border-primary/10 px-3 mt-2 rounded-[12px] bg-[#3d3d3d]">
      <div className="flex items-center gap-x-2">
        <SidebarTrigger className="cursor-pointer size-7 hover:bg-primary hover:text-black p-1 transition duration-500 rounded-full text-primary" />
        <p className="text-[20px] text-primary font-fredoka font-medium">User Name</p>
      </div>
    </nav>
  );
}
