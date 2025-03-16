import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components";
import { navItems } from "./data";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loulan",
  // TODO: Add description here
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} antialiased `}>
        <FloatingNav navItems={navItems} />
        {children}
      </body>
    </html>
  );
}
