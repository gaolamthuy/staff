/**
 * API Route cho sản phẩm
 * Endpoint: /api/products
 */

import { NextResponse } from "next/server";
import { fetchProductsData } from "@/lib/api";
import { ProductCategory } from "@/types/api";

/**
 * API route để lấy danh sách categories
 */
export async function GET() {
  try {
    const data = await fetchProductsData();

    // Lọc sản phẩm gạo từ danh sách sản phẩm
    const riceCategories = [
      "Gạo nở",
      "Gạo dẻo",
      "Lúa - Gạo Lứt",
      "Nếp",
      "Gạo chính hãng",
      "Tấm",
    ];

    const riceProducts = data.products.filter((product) =>
      riceCategories.includes(product.categoryName)
    );

    // Tạo danh sách categories từ sản phẩm gạo
    const availableCategories: ProductCategory[] = riceProducts.reduce(
      (categories: ProductCategory[], product) => {
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

    return NextResponse.json(availableCategories);
  } catch (error) {
    return NextResponse.json(
      { error: "Không thể tải dữ liệu categories" },
      { status: 500 }
    );
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
