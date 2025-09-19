/**
 * Loading Page
 * Handle loading states and chunk loading
 */

import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function Loading() {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      flexDirection: "column",
      gap: "16px"
    }}>
      <Spin indicator={antIcon} />
      <div style={{ color: "#666", fontSize: "16px" }}>
        Đang tải trang...
      </div>
    </div>
  );
}
