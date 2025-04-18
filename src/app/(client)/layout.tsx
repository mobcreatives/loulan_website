import React, { Suspense } from "react";
import { navItems } from "./data";
import { FloatingNav } from "./_components/layout/floating-navbar";
import Footer from "./_components/layout/footer";
import FloatingReview from "./_components/floating-review/floating-review";
import FloatingContact from "./_components/floating-contact/floating-contact";
import "react-photo-view/dist/react-photo-view.css";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#0A1316]">
      <FloatingNav navItems={navItems} />
      <Suspense>{children}</Suspense>
      <Footer />
      <FloatingContact />
      <FloatingReview />
    </main>
  );
}
