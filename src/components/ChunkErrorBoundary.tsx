/**
 * Chunk Error Boundary
 * Handle ChunkLoadError và các lỗi webpack chunk loading
 */

"use client";

import React, { Component, ReactNode } from "react";
import { Result, Button } from "antd";
import { ReloadOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

interface ChunkErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ChunkErrorBoundaryProps {
  children: ReactNode;
}

export class ChunkErrorBoundary extends Component<
  ChunkErrorBoundaryProps,
  ChunkErrorBoundaryState
> {
  constructor(props: ChunkErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ChunkErrorBoundaryState {
    // Kiểm tra nếu là ChunkLoadError
    if (error.name === "ChunkLoadError" || error.message.includes("ChunkLoadError")) {
      return { hasError: true, error };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ChunkErrorBoundary caught an error:", error, errorInfo);
    
    // Nếu là ChunkLoadError, thử reload trang
    if (error.name === "ChunkLoadError" || error.message.includes("ChunkLoadError")) {
      // Delay một chút rồi reload
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "50vh",
          padding: "24px"
        }}>
          <Result
            status="warning"
            title="Lỗi tải trang"
            subTitle="Đang tải lại trang để khắc phục lỗi..."
            extra={[
              <Button 
                key="reload" 
                type="primary"
                icon={<ReloadOutlined />}
                onClick={() => window.location.reload()}
              >
                Tải lại ngay
              </Button>,
              <Link key="home" href="/">
                <Button icon={<HomeOutlined />}>
                  Về trang chủ
                </Button>
              </Link>
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
