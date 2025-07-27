/**
 * Protected Route Component
 * Component bảo vệ route, chỉ cho phép truy cập khi đã đăng nhập
 */

"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected Route Component
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        <LoadingSpinner text="Đang kiểm tra đăng nhập..." />
      </div>
    );
  }

  // Nếu chưa đăng nhập, không render gì cả
  if (!user || !user.isAuthenticated) {
    return null;
  }

  // Nếu đã đăng nhập, hiển thị children
  return <>{children}</>;
};
