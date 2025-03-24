import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "./_components/tanstack-query-provider";

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
      <TanstackQueryProvider>
        <body className={`${fredoka.variable} antialiased`}>{children}</body>
      </TanstackQueryProvider>
    </html>
  );
}
