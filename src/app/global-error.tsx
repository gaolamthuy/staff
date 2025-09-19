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
  const isChunkError = error.name === "ChunkLoadError" || 
    error.message.includes("ChunkLoadError") ||
    error.message.includes("Loading chunk");

  return (
    <html>
      <body>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "100vh",
          padding: "24px"
        }}>
          <Result
            status={isChunkError ? "warning" : "error"}
            title={isChunkError ? "Lỗi tải trang" : "Có lỗi xảy ra"}
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
                <Button icon={<HomeOutlined />}>
                  Về trang chủ
                </Button>
              </Link>
            ]}
          />
        </div>
      </body>
    </html>
  );
}
