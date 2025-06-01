"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { APP_ROUTES, API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { useQuery } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";

interface User {
  username: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { _axios } = useAuthAxios();

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch current user data
  const { data: currentUser, refetch: refetchUser } = useQuery({
    queryKey: KEYS.AUTH.CURRENT_USER,
    queryFn: async () => {
      try {
        const response = await _axios.get(API_ROUTES.AUTH.CURRENT_USER);
        return response.data.user;
      } catch {
        return null;
      }
    },
    enabled: isClient && !!localStorage.getItem("token"),
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const login = (token: string) => {
    if (isClient) {
      localStorage.setItem("token", token);
      refetchUser();
      window.location.reload();
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(API_ROUTES.AUTH.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();
      login(data.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    if (isClient) {
      localStorage.removeItem("token");
    }
    router.push(APP_ROUTES.HOME);
  };

  // Protect dashboard route
  useEffect(() => {
    if (pathname.startsWith("/dashboard") && (!user || user.role !== "ADMIN")) {
      router.push(APP_ROUTES.HOME);
    }
  }, [pathname, user, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAdmin: user?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 