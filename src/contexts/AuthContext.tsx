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
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  username?: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status on mount
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        } else if (session) {
          setSession(session);
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            username:
              session.user.user_metadata?.username ||
              session.user.email?.split("@")[0],
            isAuthenticated: true,
          });

          // Nếu đã đăng nhập và đang ở trang signin, redirect về trang chủ
          if (pathname === "/signin") {
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);

      if (session) {
        setSession(session);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          username:
            session.user.user_metadata?.username ||
            session.user.email?.split("@")[0],
          isAuthenticated: true,
        });

        // Redirect to home after successful login
        if (event === "SIGNED_IN" && pathname === "/signin") {
          router.push("/");
        }
      } else {
        setSession(null);
        setUser(null);

        // Redirect to signin if signed out
        if (event === "SIGNED_OUT" && pathname !== "/signin") {
          router.push("/signin");
        }
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  /**
   * Đăng nhập với email và password
   * @param email - Email đăng nhập
   * @param password - Mật khẩu
   * @returns Promise<boolean> - Kết quả đăng nhập
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return false;
      }

      if (data.user && data.session) {
        console.log("Login successful:", data.user.email);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error in AuthContext:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Đăng xuất
   */
  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error.message);
      } else {
        console.log("Logout successful");
        // Auth state change listener will handle the rest
      }
    } catch (error) {
      console.error("Logout error in AuthContext:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
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
