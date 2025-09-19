/**
 * Category Filter Component
 * Client component để filter sản phẩm theo danh mục
 */

"use client";

import React from "react";
import { ProductCategory, Product } from "@/types/api";

interface CategoryFilterProps {
  categories: ProductCategory[];
  products: Product[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

/**
 * Category Filter Component
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  products,
  selectedCategory,
  onCategoryChange,
}) => {
  // Tính số lượng sản phẩm cho mỗi category
  const getProductCount = (categoryName: string) => {
    if (categoryName === "favorite") {
      return products.filter((product) => product.glt.glt_labelprint_favorite)
        .length;
    }
    return products.filter((product) => product.categoryName === categoryName)
      .length;
  };

  // Tạo favorite category
  const favoriteCategory: ProductCategory = {
    categoryId: 999999,
    categoryName: "favorite",
    retailerId: 744514,
    modifiedDate: new Date().toISOString(),
    createdDate: new Date().toISOString(),
    rank: 1,
    glt: {
      glt_color_border: "#ff4d4f",
      glt_is_active: true,
    },
  };

  // Thêm favorite category vào đầu danh sách
  const allCategories = [favoriteCategory, ...categories];

  return (
    <div
      className="category-filter"
      style={{
        marginBottom: "32px",
        padding: "20px",
        background: "#f8f9fa",
        borderRadius: "12px",
        border: "1px solid #e9ecef",
      }}
    >
      <h3
        className="filter-title"
        style={{
          margin: "0 0 16px 0",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Lọc theo danh mục
      </h3>

      <div
        className="filter-buttons"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Favorite Category Button - First and Default */}
        <button
          className={`category-button favorite ${
            selectedCategory === "favorite" ? "active" : ""
          }`}
          onClick={() => onCategoryChange("favorite")}
          style={{
            padding: "10px 16px",
            background: selectedCategory === "favorite" ? "#ff4d4f" : "#fff",
            color: selectedCategory === "favorite" ? "white" : "#666",
            border: `2px solid ${
              selectedCategory === "favorite" ? "#ff4d4f" : "#d9d9d9"
            }`,
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            position: "relative",
          }}
        >
          <span>❤️</span>
          <span>Yêu thích</span>
          <span
            className="product-count"
            style={{
              background:
                selectedCategory === "favorite"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "#f0f0f0",
              color: selectedCategory === "favorite" ? "white" : "#666",
              padding: "2px 6px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: "bold",
              marginLeft: "4px",
            }}
          >
            {getProductCount("favorite")}
          </span>
        </button>

        {/* All Categories Button */}
        <button
          className={`category-button ${
            selectedCategory === null ? "active" : ""
          }`}
          onClick={() => onCategoryChange(null)}
          style={{
            padding: "10px 16px",
            background: selectedCategory === null ? "#1890ff" : "#fff",
            color: selectedCategory === null ? "white" : "#666",
            border: `2px solid ${
              selectedCategory === null ? "#1890ff" : "#d9d9d9"
            }`,
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>📦</span>
          <span>Tất cả</span>
          <span
            className="product-count"
            style={{
              background:
                selectedCategory === null
                  ? "rgba(255, 255, 255, 0.2)"
                  : "#f0f0f0",
              color: selectedCategory === null ? "white" : "#666",
              padding: "2px 6px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: "bold",
              marginLeft: "4px",
            }}
          >
            {products.length}
          </span>
        </button>

        {/* Other Category Buttons */}
        {categories.map((category) => {
          const isActive = selectedCategory === category.categoryName;
          const productCount = getProductCount(category.categoryName);

          return (
            <button
              key={category.categoryId}
              className={`category-button ${isActive ? "active" : ""}`}
              onClick={() => onCategoryChange(category.categoryName)}
              style={{
                padding: "10px 16px",
                background: isActive ? "#1890ff" : "#fff",
                color: isActive ? "white" : "#666",
                border: `2px solid ${isActive ? "#1890ff" : "#d9d9d9"}`,
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
              }}
            >
              <div
                className="category-color-indicator"
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: category.glt.glt_color_border || "#95a5a6",
                  border: "2px solid #fff",
                  boxShadow: "0 0 0 1px #d9d9d9",
                }}
              />
              <span>{category.categoryName}</span>
              <span
                className="product-count"
                style={{
                  background: isActive ? "rgba(255, 255, 255, 0.2)" : "#f0f0f0",
                  color: isActive ? "white" : "#666",
                  padding: "2px 6px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginLeft: "4px",
                }}
              >
                {productCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
