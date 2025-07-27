/**
 * Authentication Context
 * Context quản lý trạng thái đăng nhập và xác thực người dùng
 */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  username: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);

          // Nếu đã đăng nhập và đang ở trang signin, redirect về trang chủ
          if (pathname === "/signin") {
            router.push("/");
          }
        }
      } catch (error) {
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  /**
   * Đăng nhập với username và password
   * @param username - Tên đăng nhập
   * @param password - Mật khẩu
   * @returns Promise<boolean> - Kết quả đăng nhập
   */
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Hardcode credentials từ environment variables
      const expectedUsername =
        process.env.NEXT_PUBLIC_AUTH_USERNAME || "username";
      const expectedPassword =
        process.env.NEXT_PUBLIC_AUTH_PASSWORD || "password123";

      console.log("Auth check:", {
        provided: { username, password },
        expected: { expectedUsername, expectedPassword },
        match: username === expectedUsername && password === expectedPassword,
      });

      if (username === expectedUsername && password === expectedPassword) {
        const userData: User = {
          username,
          isAuthenticated: true,
        };

        // Lưu user vào localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Redirect về trang chủ
        router.push("/");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error in AuthContext:", error);
      return false;
    }
  };

  /**
   * Đăng xuất
   */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/signin");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook để sử dụng AuthContext
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
