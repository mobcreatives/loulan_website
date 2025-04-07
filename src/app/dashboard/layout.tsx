import React from "react";
import DashboardSidebar from "./_components/dashboard-sidebar";
import { SidebarProvider } from "@/components";
import AuthProvider from "../_components/auth-provider";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full px-5 space-y-5 py-4">
          {/* <DashboardTopbar /> */}
          <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
