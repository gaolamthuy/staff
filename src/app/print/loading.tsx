/**
 * Print Routes Loading Page
 * Handle loading states in print routes
 */

import React from "react";
import { Spin } from "antd";
import { LoadingOutlined, PrinterOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function PrintLoading() {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      flexDirection: "column",
      gap: "16px"
    }}>
      <PrinterOutlined style={{ fontSize: 48, color: "#1890ff" }} />
      <Spin indicator={antIcon} />
      <div style={{ color: "#666", fontSize: "16px" }}>
        Đang tải trang in tem...
      </div>
    </div>
  );
}
