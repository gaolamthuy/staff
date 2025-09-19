/**
 * Print Routes 404 Page
 * Handle 404 errors in print routes
 */

import React from "react";
import { Result, Button } from "antd";
import { HomeOutlined, PrinterOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function PrintNotFound() {
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
        subTitle="Trang in tem không tồn tại"
        extra={[
          <Link key="home" href="/">
            <Button type="primary" icon={<HomeOutlined />}>
              Về trang chủ
            </Button>
          </Link>,
          <Link key="retail" href="/print/label-retail">
            <Button icon={<PrinterOutlined />}>In tem bán lẻ</Button>
          </Link>,
        ]}
      />
    </div>
  );
}
