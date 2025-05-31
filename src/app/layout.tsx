import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "./_components/tanstack-query-provider";
import { Toaster as Sonner } from "@/components";
import { AuthProvider } from "@/context/auth-context";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loulan Chinese Restaurant and Bar",
  description: "Chinese Restaurant In Nepal",
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
          <AuthProvider>
            {children}
            <Sonner />
          </AuthProvider>
        </body>
      </TanstackQueryProvider>
    </html>
  );
}
