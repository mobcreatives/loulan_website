import React from "react";
import DashboardSidebar from "./_components/dashboard-sidebar";
import { SidebarProvider } from "@/components";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
