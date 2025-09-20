/**
 * Dashboard Cards Component
 * Client component để handle interactive cards với dark mode support
 */

"use client";

import React from "react";

export const DashboardCards: React.FC = () => {
  // Check for dark mode
  const isDarkMode =
    typeof window !== "undefined" &&
    (document.documentElement.classList.contains("dark-mode") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const cardStyle = {
    width: "300px",
    padding: "32px",
    border: `1px solid var(--card-border)`,
    borderRadius: "8px",
    textAlign: "center" as const,
    backgroundColor: "var(--card-background)",
    boxShadow: `0 2px 8px var(--card-shadow)`,
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const titleStyle = {
    margin: "0 0 16px 0",
    fontSize: "20px",
    fontWeight: "600",
    color: "var(--text-color)",
  };

  const descriptionStyle = {
    color: "var(--text-secondary)",
    margin: "0 0 24px 0",
    lineHeight: "1.5",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* In tem bán lẻ */}
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = isDarkMode
            ? "0 4px 16px rgba(0,0,0,0.5)"
            : "0 4px 16px rgba(0,0,0,0.15)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isDarkMode
            ? "0 2px 8px rgba(0,0,0,0.3)"
            : "0 2px 8px rgba(0,0,0,0.1)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onClick={() => (window.location.href = "/print/label-retail")}
      >
        <div
          style={{ fontSize: "48px", marginBottom: "16px", color: "#52c41a" }}
        >
          🖨️
        </div>
        <h3 style={titleStyle}>In tem bán lẻ</h3>
        <p style={descriptionStyle}>
          In tem cho sản phẩm bán lẻ với thông tin giá, mã sản phẩm
        </p>
        <button
          style={{
            width: "100%",
            padding: "12px 24px",
            backgroundColor: "#52c41a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#73d13d";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#52c41a";
          }}
        >
          Truy cập
        </button>
      </div>

      {/* In tem nhập hàng */}
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = isDarkMode
            ? "0 4px 16px rgba(0,0,0,0.5)"
            : "0 4px 16px rgba(0,0,0,0.15)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isDarkMode
            ? "0 2px 8px rgba(0,0,0,0.3)"
            : "0 2px 8px rgba(0,0,0,0.1)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onClick={() => (window.location.href = "/print/label-purchaseorder")}
      >
        <div
          style={{ fontSize: "48px", marginBottom: "16px", color: "#1890ff" }}
        >
          📄
        </div>
        <h3 style={titleStyle}>In tem nhập hàng</h3>
        <p style={descriptionStyle}>
          In tem cho sản phẩm nhập hàng với thông tin chi tiết
        </p>
        <button
          style={{
            width: "100%",
            padding: "12px 24px",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#40a9ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1890ff";
          }}
        >
          Truy cập
        </button>
      </div>
    </div>
  );
};
