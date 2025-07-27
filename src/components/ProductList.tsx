/**
 * Product List Component
 * Client component để xử lý filter state và hiển thị danh sách sản phẩm
 */

"use client";

import React from "react";
import { ProductCard } from "./ProductCard";
import { CategoryFilter } from "./CategoryFilter";
import { LoadingSpinner } from "./LoadingSpinner";
import { Product, ProductCategory } from "@/types/api";

interface ProductListProps {
  products: Product[];
  categories: ProductCategory[];
  isLoading?: boolean;
  error?: string;
}

/**
 * Product List Component
 */
export const ProductList: React.FC<ProductListProps> = ({
  products,
  categories,
  isLoading = false,
  error,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    "favorite" // Mặc định chọn "Yêu thích"
  );

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? selectedCategory === "favorite"
      ? products.filter((product) => product.glt.glt_labelprint_favorite)
      : products.filter((product) => product.categoryName === selectedCategory)
    : products;

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner text="Đang tải danh sách sản phẩm..." />;
  }

  // Show error state
  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          background: "#fff2f0",
          border: "1px solid #ffccc7",
          borderRadius: "8px",
          color: "#cf1322",
        }}
      >
        <h3>Lỗi tải dữ liệu</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "8px 16px",
            background: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "12px",
          }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        products={products}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px", color: "#666" }}>
          <h3>Không có sản phẩm nào</h3>
          <p>
            {selectedCategory
              ? selectedCategory === "favorite"
                ? "Không có sản phẩm yêu thích nào"
                : `Không có sản phẩm nào trong danh mục "${selectedCategory}"`
              : "Hiện tại không có sản phẩm nào để hiển thị."}
          </p>
        </div>
      ) : (
        <div>
          <h2 style={{ marginBottom: "24px" }}>
            Danh sách sản phẩm ({filteredProducts.length})
            {selectedCategory && (
              <span
                style={{
                  color:
                    selectedCategory === "favorite" ? "#cf1322" : "#1890ff",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                {" "}
                -{" "}
                {selectedCategory === "favorite"
                  ? "Yêu thích"
                  : selectedCategory}
              </span>
            )}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
