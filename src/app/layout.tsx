import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "./_components/tanstack-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loulan Chinese Restaurant and Bar | Authentic Chinese & Korean Cuisine in Kathmandu",
  description:
    "Experience authentic Chinese and Korean cuisine at Loulan Chinese Restaurant and Bar in Thamel, Kathmandu. Reserve your table, explore our menu, view our gallery, or contact us for more information. Open daily from 10 AM to 1 AM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanstackQueryProvider>
        <body className={`${inter.className} antialiased`}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
