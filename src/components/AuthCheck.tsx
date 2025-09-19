/**
 * Authentication Check Component
 * Component để kiểm tra authentication và ngăn flash content
 */

"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Spin } from "antd";

interface AuthCheckProps {
  children: React.ReactNode;
}

/**
 * Authentication Check Component
 */
export const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        <Spin size="large" />
        <div style={{ marginTop: "16px", color: "#666" }}>
          Đang kiểm tra đăng nhập...
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, hiển thị loading (sẽ redirect bởi AuthRedirect)
  if (!user || !user.isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        <Spin size="large" />
        <div style={{ marginTop: "16px", color: "#666" }}>
          Đang chuyển hướng...
        </div>
      </div>
    );
  }

  // Nếu đã đăng nhập, hiển thị children
  return <>{children}</>;
};
