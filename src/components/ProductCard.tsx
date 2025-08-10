/**
 * Product Card Component
 * Component hiển thị thông tin sản phẩm và các nút in tem
 */

"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { Product } from "@/types/api";
import { createPrintLabelUrl } from "@/lib/api";
import { CustomPrintModal } from "./CustomPrintModal";

interface ProductCardProps {
  product: Product;
}

/**
 * Format giá tiền theo định dạng Việt Nam
 * Ưu tiên sử dụng basePrice để hiển thị giá chính xác
 */
function formatPrice(product: Product): string {
  // Ưu tiên basePrice trước, sau đó mới đến price, cuối cùng fallback về 0
  const price = product.basePrice ?? 0;
  return price.toLocaleString("vi-VN") + " ₫";
}

/**
 * Get product image URL
 */
function getProductImage(product: Product): string | null {
  // Try images array first
  if (product.images && product.images.length > 0) {
    return product.images[0];
  }

  // Fallback to glt_gallery_original_url
  if (product.glt?.glt_gallery_original_url) {
    return product.glt.glt_gallery_original_url;
  }

  return null;
}

/**
 * Product Card Component
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const productImage = getProductImage(product);

  /**
   * Xử lý in tem với số lượng cố định
   */
  const handlePrintLabel = (quantity: number) => {
    const printUrl = createPrintLabelUrl(product.code, quantity);
    window.open(printUrl, "_blank");
  };

  /**
   * Mở modal in tùy chọn
   */
  const handleOpenCustomModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Đóng modal in tùy chọn
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Xác nhận in tùy chọn
   */
  const handleConfirmCustomPrint = (quantity: number) => {
    handlePrintLabel(quantity);
    handleCloseModal();
  };

  return (
    <>
      <div
        className="product-card"
        style={{
          border: "1px solid #e8e8e8",
          borderRadius: "8px",
          padding: "16px",
          background: "white",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        {/* Product Image - Square */}
        {productImage && !imageError && (
          <div style={{ marginBottom: "16px", textAlign: "center" }}>
            <div
              className="product-image-container"
              style={{
                width: "100%",
                height: "200px", // Square container
                borderRadius: "8px",
                border: "1px solid #f0f0f0",
                background: "#f8f9fa", // Light background for transparent images
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={productImage}
                alt={product.name || "Sản phẩm"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain", // Preserve aspect ratio
                  borderRadius: "6px",
                }}
                onError={() => setImageError(true)}
              />
            </div>
          </div>
        )}

        {/* Product Info */}
        <div style={{ marginBottom: "16px" }}>
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{product.name || "Không có tên"}</span>
            <span
              style={{
                padding: "2px 6px",
                background: "#f0f0f0",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#666",
                fontWeight: "normal",
              }}
            >
              {product.categoryName || "Không phân loại"}
            </span>
          </h3>
          <p
            style={{
              margin: "0 0 4px 0",
              fontSize: "14px",
              color: "#666",
            }}
          >
            {product.fullName || "N/A"}
          </p>
          <p
            className="product-price"
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#1890ff",
            }}
          >
            {formatPrice(product)}
          </p>
        </div>

        {/* Print Buttons */}
        <div
          className="print-buttons"
          style={{ display: "flex", gap: "12px", flexDirection: "column" }}
        >
          <Button
            type="primary"
            size="large"
            icon={<PrinterOutlined />}
            onClick={() => handlePrintLabel(10)}
            style={{ width: "100%", height: "48px" }}
          >
            In 10kg
          </Button>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              type="default"
              size="middle"
              onClick={() => handlePrintLabel(5)}
              style={{ width: "70%", height: "40px" }}
            >
              In 5kg
            </Button>
            <Button
              type="dashed"
              size="middle"
              onClick={handleOpenCustomModal}
              style={{ width: "30%", height: "40px" }}
              title="In tùy chọn"
            >
              Tùy chọn
            </Button>
          </div>
        </div>
      </div>

      <CustomPrintModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCustomPrint}
        productName={product.name || "Sản phẩm"}
        productCode={product.code || ""}
      />
    </>
  );
};
