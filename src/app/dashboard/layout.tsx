import React from "react";
import DashboardSidebar from "./_components/dashboard-sidebar";
import { SidebarProvider } from "@/components";
import DashboardTopbar from "./_components/dashboard-topbar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full bg-[#2e2e2e] px-5 space-y-5 text-white">
        <DashboardTopbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
