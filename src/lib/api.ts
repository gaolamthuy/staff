/**
 * API Service Layer
 * Xử lý tất cả các API calls và error handling
 * Đã được cập nhật để sử dụng Supabase thay vì API CDN
 */

import { ApiResponse, Product } from "@/types/api";
import { validateApiResponse } from "./validation";
import {
  fetchProductsFromSupabase,
  fetchProductsByCategory as fetchProductsByCategoryFromSupabase,
  searchProducts as searchProductsFromSupabase,
  getProductById as getProductByIdFromSupabase,
  updateProductFavorite as updateProductFavoriteFromSupabase,
  toggleProductFavorite as toggleProductFavoriteFromSupabase,
  SupabaseApiError,
} from "./supabase-api";

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
 * Fetch dữ liệu sản phẩm từ Supabase
 * Thay thế cho API CDN cũ
 */
export async function fetchProductsData(): Promise<ApiResponse> {
  try {
    // Sử dụng Supabase thay vì API CDN
    const data = await fetchProductsFromSupabase();

    // Validate dữ liệu trả về
    return validateApiResponse(data);
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      // Chuyển đổi SupabaseApiError thành ApiError để tương thích
      throw new ApiError(error.message, error.statusCode, error.code);
    }

    throw new ApiError(
      `Lỗi khi lấy dữ liệu sản phẩm: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "SUPABASE_ERROR"
    );
  }
}

/**
 * Lấy sản phẩm theo danh mục từ Supabase
 * @param categoryName - Tên danh mục cần lọc
 * @returns Promise<Product[]> - Danh sách sản phẩm đã lọc
 */
export async function fetchProductsByCategory(
  categoryName: string
): Promise<Product[]> {
  try {
    return await fetchProductsByCategoryFromSupabase(categoryName);
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw new ApiError(error.message, error.statusCode, error.code);
    }

    throw new ApiError(
      `Lỗi khi lấy sản phẩm theo danh mục: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "SUPABASE_ERROR"
    );
  }
}

/**
 * Tìm kiếm sản phẩm từ Supabase
 * @param searchTerm - Từ khóa tìm kiếm
 * @returns Promise<Product[]> - Danh sách sản phẩm tìm được
 */
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    return await searchProductsFromSupabase(searchTerm);
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw new ApiError(error.message, error.statusCode, error.code);
    }

    throw new ApiError(
      `Lỗi khi tìm kiếm sản phẩm: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "SUPABASE_ERROR"
    );
  }
}

/**
 * Lấy thông tin sản phẩm theo ID từ Supabase
 * @param productId - ID của sản phẩm
 * @returns Promise<Product | null> - Thông tin sản phẩm hoặc null nếu không tìm thấy
 */
export async function getProductById(
  productId: string | number
): Promise<Product | null> {
  try {
    return await getProductByIdFromSupabase(productId);
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw new ApiError(error.message, error.statusCode, error.code);
    }

    throw new ApiError(
      `Lỗi khi lấy thông tin sản phẩm: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "SUPABASE_ERROR"
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
 * @param code - Mã sản phẩm
 * @param quantity - Số lượng in
 * @returns string - URL để in tem với đầy đủ tham số
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

  return `${printApiUrl}?printType=label&code=${encodeURIComponent(
    code
  )}&quantity=${quantity}`;
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

/**
 * Cập nhật trạng thái favorite của sản phẩm
 * @param productId - ID của sản phẩm (kiotviet_id)
 * @param isFavorite - Trạng thái favorite mới
 * @returns Promise<boolean> - true nếu cập nhật thành công
 */
export async function updateProductFavorite(
  productId: string | number,
  isFavorite: boolean
): Promise<boolean> {
  try {
    return await updateProductFavoriteFromSupabase(productId, isFavorite);
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw new ApiError(error.message, error.statusCode, error.code);
    }

    throw new ApiError(
      `Lỗi khi cập nhật favorite: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "SUPABASE_ERROR"
    );
  }
}

/**
 * Toggle trạng thái favorite của sản phẩm
 * @param productId - ID của sản phẩm (kiotviet_id)
 * @returns Promise<boolean> - Trạng thái favorite mới
 */
export async function toggleProductFavorite(
  productId: string | number
): Promise<boolean> {
  try {
    return await toggleProductFavoriteFromSupabase(productId);
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw new ApiError(error.message, error.statusCode, error.code);
    }

    throw new ApiError(
      `Lỗi khi toggle favorite: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "SUPABASE_ERROR"
    );
  }
}
