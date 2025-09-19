/**
 * Header Component
 * Component header chứa logo, navigation và theme toggle
 */

"use client";

import React from "react";
import { Button, Dropdown, Menu } from "antd";
import {
  SunOutlined,
  MoonOutlined,
  UserOutlined,
  LogoutOutlined,
  PrinterOutlined,
  FileTextOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme, isLoaded } = useTheme();
  const { user, logout } = useAuth();

  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return (
      <header
        style={{
          padding: "16px 24px",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="header-logo"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ fontSize: "32px", marginRight: "12px" }}>🌾</div>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1890ff",
            }}
          >
            Gạo Lâm Thúy
          </h1>
        </div>
        <div style={{ width: "40px", height: "40px" }} />
      </header>
    );
  }

  // User dropdown menu items
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: `Xin chào, ${user?.email || user?.username || "User"}`,
      disabled: true,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: logout,
    },
  ];

  return (
    <header
      style={{
        padding: "16px 24px",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo Section */}
      <div
        className="header-logo"
        style={{ display: "flex", alignItems: "center" }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src="/icon0.svg"
            alt="Logo Gạo Lâm Thúy"
            style={{ height: 40, marginRight: 12 }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1890ff",
            }}
          >
            Gạo Lâm Thúy
          </h1>
        </a>
      </div>

      {/* Navigation Section */}
      <nav
        className="header-nav"
        style={{ display: "flex", alignItems: "center", gap: "16px" }}
      >
        {/* Home Link */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#666",
            fontSize: "14px",
            fontWeight: "500",
            transition: "color 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <HomeOutlined />
          Trang chủ
        </Link>

        {/* Print Menu */}
        <Dropdown
          menu={{
            items: [
              {
                key: "retail",
                icon: <PrinterOutlined />,
                label: (
                  <Link href="/print/label-retail" style={{ textDecoration: "none", color: "inherit" }}>
                    In tem bán lẻ
                  </Link>
                ),
              },
              {
                key: "purchaseorder",
                icon: <FileTextOutlined />,
                label: (
                  <Link href="/print/label-purchaseorder" style={{ textDecoration: "none", color: "inherit" }}>
                    In tem nhập hàng
                  </Link>
                ),
              },
            ],
          }}
          placement="bottomLeft"
          trigger={["hover"]}
        >
          <Button
            type="text"
            style={{
              color: "#666",
              fontSize: "14px",
              fontWeight: "500",
              height: "auto",
              padding: "4px 8px",
            }}
          >
            In tem
          </Button>
        </Dropdown>

        {/* Theme Toggle Button */}
        <Button
          type="text"
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            color: "#666",
            fontSize: "18px",
          }}
          title={
            isDarkMode ? "Chuyển sang light mode" : "Chuyển sang dark mode"
          }
        />

        {/* User Dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button
            type="text"
            icon={<UserOutlined />}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              height: "40px",
              padding: "0 12px",
              borderRadius: "20px",
              border: "1px solid #d9d9d9",
              background: "transparent",
              color: "#666",
            }}
          >
            <span style={{ fontSize: "14px" }}>{user?.username || "User"}</span>
          </Button>
        </Dropdown>
      </nav>
    </header>
  );
};
