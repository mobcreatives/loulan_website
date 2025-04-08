import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "./_components/tanstack-query-provider";
import { Toaster as Sonner } from "@/components";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loulan Chinese Restaurant and Bar",
  description: "Chinese Restuarant In Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanstackQueryProvider>
        <body className={`${fredoka.variable} antialiased`}>
          <Sonner />
          {children}
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
