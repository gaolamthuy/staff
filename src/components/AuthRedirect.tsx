/**
 * Authentication Redirect Component
 * Component để handle authentication redirects
 */

"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

/**
 * Authentication Redirect Component
 */
export const AuthRedirect: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Chỉ redirect khi đã load xong và không phải trang signin
    if (!isLoading && pathname !== "/signin") {
      if (!user || !user.isAuthenticated) {
        router.replace("/signin");
      }
    }
  }, [user, isLoading, pathname, router]);

  // Không render gì cả
  return null;
};
