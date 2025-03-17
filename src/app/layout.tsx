import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { navItems } from "./data";
import { FloatingNav } from "./components/layout/floating-navbar";
import Footer from "./components/layout/footer";

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
      <body className={`${fredoka.variable} antialiased bg-[#0A1316]`}>
        <FloatingNav navItems={navItems} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
