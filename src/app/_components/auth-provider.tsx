"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CONSTANTS } from "@/config/constants";
import { APP_ROUTES } from "@/config/routes";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { getItem } = useLocalStorage();
  const token = getItem(CONSTANTS.TOKEN);

  useEffect(() => {
    if (!token) {
      return router.push(APP_ROUTES.LOGIN);
    }
    router.push(APP_ROUTES.DASHBOARD);
  }, [token, router]);

  return <>{children}</>;
}
