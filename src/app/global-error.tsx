/**
 * Global Error Handler
 * Handle all errors including ChunkLoadError
 */

"use client";

import React from "react";
import { Result, Button } from "antd";
import { ReloadOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  // Kiểm tra nếu là ChunkLoadError
  const isChunkError =
    error.name === "ChunkLoadError" ||
    error.message.includes("ChunkLoadError") ||
    error.message.includes("Loading chunk");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#ff4d4f", marginBottom: "16px" }}>
          {isChunkError ? "Lỗi tải trang" : "Có lỗi xảy ra"}
        </h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          {isChunkError
            ? "Đang tải lại trang để khắc phục lỗi..."
            : "Vui lòng thử lại hoặc liên hệ hỗ trợ"}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#1890ff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (isChunkError) {
                window.location.reload();
              } else {
                reset();
              }
            }}
          >
            {isChunkError ? "Tải lại trang" : "Thử lại"}
          </button>
          <a
            href="/"
            style={{
              padding: "8px 16px",
              backgroundColor: "#f5f5f5",
              color: "#666",
              textDecoration: "none",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          >
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}
