/**
 * Product List Wrapper Component
 * Client component wrapper để handle favorite changes
 */

"use client";

import React, { useState, useEffect } from "react";
import { ProductList } from "./ProductList";
import { UpdateButton } from "./UpdateButton";
import { Product, ProductCategory } from "@/types/api";
import { fetchProductsData } from "@/lib/api";

/**
 * Lấy màu cho category
 */
function getCategoryColor(categoryName: string): string {
  const colorMap: { [key: string]: string } = {
    "Gạo nở": "#ff6b6b",
    "Gạo dẻo": "#4ecdc4",
    "Lúa - Gạo Lứt": "#45b7d1",
    Nếp: "#96ceb4",
    "Gạo chính hãng": "#feca57",
    Tấm: "#ff9ff3",
  };
  return colorMap[categoryName] || "#95a5a6";
}

interface ProductListWrapperProps {
  products: Product[];
  categories: ProductCategory[];
  isLoading?: boolean;
  error?: string;
}

/**
 * Product List Wrapper Component
 */
export const ProductListWrapper: React.FC<ProductListWrapperProps> = ({
  products,
  categories,
  isLoading = false,
  error,
}) => {
  const [localProducts, setLocalProducts] = useState(products);
  const [localCategories, setLocalCategories] = useState(categories);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Refresh data from Supabase to get fresh data
   * This runs on client-side to ensure fresh data even with static export
   */
  // Tắt hoàn toàn việc refresh data để giữ nguyên favorite states
  // useEffect(() => {
  //   // Không refresh data nữa để tránh mất favorite states
  // }, []);

  /**
   * Handle favorite change
   * Cập nhật trạng thái favorite trong local state
   */
  const handleFavoriteChange = (
    productId: string | number,
    isFavorite: boolean
  ) => {
    setLocalProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              glt: {
                ...product.glt,
                glt_labelprint_favorite: isFavorite,
              },
            }
          : product
      )
    );
  };

  /**
   * Handle update success
   * Don't refresh data to preserve favorite states
   */
  const handleUpdateSuccess = () => {
    // Không refresh data để giữ nguyên favorite states
    // Chỉ hiển thị success message
    console.log("Update successful - keeping current favorite states");
  };

  return (
    <div>
      {/* Update Button */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "16px",
        padding: "0 16px"
      }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          Danh sách sản phẩm
        </h2>
        <UpdateButton onUpdateSuccess={handleUpdateSuccess} />
      </div>
      
      <ProductList
        products={localProducts}
        categories={localCategories}
        isLoading={isLoading || isRefreshing}
        error={error}
        onFavoriteChange={handleFavoriteChange}
      />
    </div>
  );
};
