/**
 * API Service Layer
 * Main API layer - xử lý tất cả các API calls và error handling
 * Sử dụng database.ts cho các thao tác database
 */

import { ApiResponse, Product } from "@/types/api";
import { validateApiResponse } from "./schemas";
import {
  fetchProductsFromSupabase,
  toggleProductFavorite as toggleProductFavoriteFromSupabase,
  SupabaseApiError,
} from "./database";

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
 * Tạo URL để in tem sản phẩm
 * @param code - Mã sản phẩm
 * @param quantity - Số lượng in
 * @returns string - URL để in tem với đầy đủ tham số
 */
export function createPrintLabelUrl(code: string, quantity: number): string {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL + "/print";

  if (!webhookUrl) {
    throw new ApiError(
      "Webhook URL không được cấu hình",
      500,
      "MISSING_WEBHOOK_CONFIG"
    );
  }

  return `${webhookUrl}?printType=label&code=${encodeURIComponent(
    code
  )}&quantity=${quantity}`;
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
