/**
 * API Service Layer
 * Xử lý tất cả các API calls và error handling
 */

import { ApiResponse } from "@/types/api";
import { validateApiResponse } from "./validation";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "API_ERROR"
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Fetch dữ liệu sản phẩm từ API
 */
export async function fetchProductsData(): Promise<ApiResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new ApiError(
      "API base URL không được cấu hình",
      500,
      "MISSING_API_CONFIG"
    );
  }

  try {
    const response = await fetch(`${apiBaseUrl}/homepage/data.json`);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        "API_REQUEST_FAILED"
      );
    }

    const data = await response.json();

    // Handle array response
    if (Array.isArray(data)) {
      const productsData = data.find(
        (item) => item.products && Array.isArray(item.products)
      );

      if (!productsData) {
        throw new ApiError(
          "Không tìm thấy dữ liệu sản phẩm trong response",
          500,
          "NO_PRODUCTS_DATA"
        );
      }

      return validateApiResponse(productsData);
    } else {
      return validateApiResponse(data);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "NETWORK_ERROR"
    );
  }
}

/**
 * Lọc sản phẩm theo danh mục
 * @param products - Danh sách sản phẩm
 * @param categoryName - Tên danh mục cần lọc
 * @returns Product[] - Danh sách sản phẩm đã lọc
 */
export function filterProductsByCategory(
  products: ApiResponse["products"],
  categoryName: string
) {
  if (!Array.isArray(products)) {
    console.warn("Products không phải array:", products);
    return [];
  }

  return products.filter(
    (product) =>
      product.categoryName === categoryName &&
      product.isActive &&
      product.allowsSale
  );
}

/**
 * Lấy sản phẩm theo mã code
 * @param products - Danh sách sản phẩm
 * @param code - Mã sản phẩm
 * @returns Product | undefined - Sản phẩm tìm được
 */
export function getProductByCode(
  products: ApiResponse["products"],
  code: string
) {
  if (!Array.isArray(products)) {
    console.warn("Products không phải array:", products);
    return undefined;
  }

  return products.find((product) => product.code === code);
}

/**
 * Tạo URL để in tem sản phẩm
 */
export function createPrintLabelUrl(code: string, quantity: number): string {
  const printApiUrl = process.env.NEXT_PUBLIC_PRINT_API_URL;

  if (!printApiUrl) {
    throw new ApiError(
      "Print API URL không được cấu hình",
      500,
      "MISSING_PRINT_CONFIG"
    );
  }

  return `${printApiUrl}?code=${encodeURIComponent(code)}&quantity=${quantity}`;
}

/**
 * Mở URL in tem trong tab mới
 * @param code - Mã sản phẩm
 * @param quantity - Số lượng in
 */
export function openPrintLabel(code: string, quantity: number): void {
  const printUrl = createPrintLabelUrl(code, quantity);
  window.open(printUrl, "_blank", "noopener,noreferrer");
}
