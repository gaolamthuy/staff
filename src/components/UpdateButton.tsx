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

  const handleUpdate = async () => {
    console.log("🔄 Starting update...");
    setIsUpdating(true);
    try {
      console.log("📡 Calling updateProducts...");
      await updateProducts();
      console.log("✅ Update successful, showing toast...");
      message.success("✅ Cập nhật sản phẩm thành công!");
      
      // Thêm notification để đảm bảo user thấy
      notification.success({
        message: "Cập nhật thành công!",
        description: "Danh sách sản phẩm đã được cập nhật từ server.",
        duration: 3,
        placement: "topRight",
      });
      
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      message.error("❌ Có lỗi xảy ra khi cập nhật sản phẩm");
      
      // Thêm notification error
      notification.error({
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
  );
};
