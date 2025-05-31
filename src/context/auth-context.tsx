"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { APP_ROUTES, API_ROUTES } from "@/config/routes";

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Handle redirects based on the current path
    if (pathname.includes("/booking")) {
      // If on booking page, stay there
      return;
    } else if (pathname === APP_ROUTES.LOGIN || pathname === APP_ROUTES.REGISTER) {
      // If on login/register page, redirect to home
      router.push(APP_ROUTES.HOME);
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

      const userData = await response.json();
      login(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push(APP_ROUTES.HOME);
  };

  // Protect dashboard route
  useEffect(() => {
    if (pathname.startsWith("/dashboard") && (!user || !user.isAdmin)) {
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
        isAdmin: user?.isAdmin || false,
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