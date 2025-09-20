/**
 * Trang chủ - Dashboard chính
 * Hiển thị menu navigation và thông tin tổng quan
 */

import React from "react";
import { DashboardCards } from "@/components/DashboardCards";

/**
 * Trang chủ - Dashboard
 */
export default function HomePage() {
  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: "var(--background-color, #fff)",
        color: "var(--text-color, #000)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1890ff",
          marginBottom: "16px",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        🌾 Gạo Lâm Thúy - Hệ thống In tem
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "var(--text-secondary, #666)",
          marginBottom: "48px",
          maxWidth: "600px",
          margin: "0 auto 48px auto",
          lineHeight: "1.6",
        }}
      >
        Chào mừng bạn đến với hệ thống quản lý và in tem sản phẩm
      </p>

      {/* Menu Cards */}
      <DashboardCards />
    </div>
  );
}
