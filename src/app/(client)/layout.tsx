import React, { Suspense } from "react";
import { navItems } from "./data";
import FloatingNavbar from "./_components/layout/floating-navbar";
import Footer from "./_components/layout/footer";
import FloatingReview from "./_components/floating-review/floating-review";
import FloatingContact from "./_components/floating-contact/floating-contact";
import { WhatsApp } from "@/components/WhatsApp";
import "react-photo-view/dist/react-photo-view.css";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#0A1316]">
      <FloatingNavbar navItems={navItems} />
      <Suspense>{children}</Suspense>
      <Footer />
      <FloatingContact />
      <FloatingReview />
      <WhatsApp 
        phoneNumber="9851240960"
        message="Hello! Can I make a booking?"
        minimized={true}
      />
    </main>
  );
}
