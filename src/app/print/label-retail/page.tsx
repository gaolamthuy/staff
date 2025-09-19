/**
 * Trang In tem bán lẻ
 * Load data từ API thực tế và hiển thị danh sách sản phẩm với filter
 *
 * Note: Using static export, so data is fetched at build time
 * Fresh data is ensured through Supabase client cache-busting
 */

import React from "react";
import { ProductListWrapper } from "@/components/ProductListWrapper";
import { Product, ProductCategory, ApiResponse } from "@/types/api";
import { AuthCheck } from "@/components/AuthCheck";
import { fetchProductsData } from "@/lib/api";

/**
 * Lấy dữ liệu sản phẩm từ API
 * Fetch trực tiếp từ external API để tương thích với static export
 */
async function getProductsData(): Promise<{
  products: Product[];
  categories: ProductCategory[];
  error?: string;
}> {
  try {
    const apiData = await fetchProductsData();

    // Lọc sản phẩm gạo từ danh sách sản phẩm
    const riceCategories = [
      "Gạo nở",
      "Gạo dẻo",
      "Lúa - Gạo Lứt",
      "Nếp",
      "Gạo chính hãng",
      "Tấm",
    ];

    // Đảm bảo apiData có cấu trúc đúng
    if (!apiData || !apiData.products || !Array.isArray(apiData.products)) {
      throw new Error("Invalid API response structure");
    }

    const riceProducts = apiData.products.filter(
      (product: Product) =>
        riceCategories.includes(product.categoryName) && product.unit === "kg"
    );

    // Tạo danh sách categories từ sản phẩm gạo
    const availableCategories: ProductCategory[] = riceProducts.reduce(
      (categories: ProductCategory[], product: Product) => {
        const existingCategory = categories.find(
          (cat) => cat.categoryName === product.categoryName
        );

        if (!existingCategory) {
          categories.push({
            categoryId:
              typeof product.id === "string"
                ? parseInt(product.id)
                : product.id,
            categoryName: product.categoryName,
            retailerId: 744514,
            modifiedDate: new Date().toISOString(),
            createdDate: new Date().toISOString(),
            rank: categories.length + 1,
            glt: {
              glt_is_active: true,
              glt_color_border: getCategoryColor(product.categoryName),
            },
          });
        }

        return categories;
      },
      []
    );

    return {
      products: riceProducts,
      categories: availableCategories,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      categories: [],
      error: "Có lỗi xảy ra khi tải dữ liệu sản phẩm",
    };
  }
}

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

/**
 * Trang In tem bán lẻ - Hiển thị danh sách sản phẩm
 */
export default async function LabelRetailPage() {
  const { products, categories, error } = await getProductsData();

  return (
    <AuthCheck>
      {error ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Lỗi tải dữ liệu</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <ProductListWrapper
            products={products}
            categories={categories}
            isLoading={false}
            error={undefined}
          />
        </div>
      )}
    </AuthCheck>
  );
}
