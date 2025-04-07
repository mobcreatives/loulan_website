import React from "react";
import { navItems } from "./data";
import { FloatingNav } from "./_components/layout/floating-navbar";
import Footer from "./_components/layout/footer";
import FloatingReview from "./_components/floating-review/floating-review";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#0A1316]">
      <FloatingNav navItems={navItems} />
      {children}
      <Footer />
      <FloatingReview />
    </main>
  );
}
