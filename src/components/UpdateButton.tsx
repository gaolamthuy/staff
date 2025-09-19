import React, { useState } from "react";
import { Button, notification } from "antd";
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
    setIsUpdating(true);
    try {
      const result = await updateProducts();

      // Hiển thị notification với response text từ server
      api.success({
        message: "Cập nhật thành công!",
        description: result.message,
        duration: 4,
        placement: "topRight",
      });

      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("Update error:", error);

      // Hiển thị notification lỗi
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
