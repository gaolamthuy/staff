/**
 * 404 Not Found Page
 * Handle routing errors and chunk loading issues
 */

import React from "react";
import { Result, Button } from "antd";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function NotFound() {
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
        status="404"
        title="404"
        subTitle="Trang không tồn tại hoặc có lỗi tải trang"
        extra={[
          <Link key="home" href="/">
            <Button type="primary" icon={<HomeOutlined />}>
              Về trang chủ
            </Button>
          </Link>,
          <Button
            key="reload"
            icon={<ReloadOutlined />}
            onClick={() => window.location.reload()}
          >
            Tải lại trang
          </Button>,
        ]}
      />
    </div>
  );
}
