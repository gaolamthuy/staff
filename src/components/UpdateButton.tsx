import React, { useState } from "react";
import { Button, message, notification } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { updateProducts } from "@/lib/api";

interface UpdateButtonProps {
  onUpdateSuccess?: () => void;
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({
  onUpdateSuccess,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleUpdate = async () => {
    console.log("🔄 Starting update...");
    setIsUpdating(true);
    try {
      console.log("📡 Calling updateProducts...");
      const result = await updateProducts();
      console.log("✅ Update successful, showing toast...");
      
      // Sử dụng message từ HTTP response
      const responseMessage = result.message || "Cập nhật thành công!";
      message.success(`✅ ${responseMessage}`);
      
      // Sử dụng notification hook với response message
      api.success({
        message: "Cập nhật thành công!",
        description: responseMessage,
        duration: 3,
        placement: "topRight",
      });

      // Không gọi onUpdateSuccess để tránh refresh data
      // if (onUpdateSuccess) {
      //   onUpdateSuccess();
      // }
    } catch (error) {
      console.error("❌ Update error:", error);
      message.error("❌ Có lỗi xảy ra khi cập nhật sản phẩm");

      // Sử dụng notification hook
      api.error({
        message: "Cập nhật thất bại!",
        description: "Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại.",
        duration: 4,
        placement: "topRight",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        loading={isUpdating}
        onClick={handleUpdate}
        style={{
          backgroundColor: "#52c41a",
          borderColor: "#52c41a",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#73d13d";
          e.currentTarget.style.borderColor = "#73d13d";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#52c41a";
          e.currentTarget.style.borderColor = "#52c41a";
        }}
      >
        Cập nhật
      </Button>
    </>
  );
};
