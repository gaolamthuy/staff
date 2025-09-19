/**
 * Print Routes Error Page
 * Handle errors in print routes
 */

"use client";

import React from "react";
import { Result, Button } from "antd";
import {
  ReloadOutlined,
  HomeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PrintError({ error, reset }: ErrorProps) {
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
      <Result
        status={isChunkError ? "warning" : "error"}
        title={isChunkError ? "Lỗi tải trang in tem" : "Có lỗi xảy ra"}
        subTitle={
          isChunkError
            ? "Đang tải lại trang để khắc phục lỗi..."
            : "Vui lòng thử lại hoặc liên hệ hỗ trợ"
        }
        extra={[
          <Button
            key="reload"
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => {
              if (isChunkError) {
                window.location.reload();
              } else {
                reset();
              }
            }}
          >
            {isChunkError ? "Tải lại trang" : "Thử lại"}
          </Button>,
          <Link key="home" href="/">
            <Button icon={<HomeOutlined />}>Về trang chủ</Button>
          </Link>,
          <Link key="retail" href="/print/label-retail">
            <Button icon={<PrinterOutlined />}>In tem bán lẻ</Button>
          </Link>,
        ]}
      />
    </div>
  );
}
