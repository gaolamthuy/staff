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

  return `${webhookUrl}?printType=label-product&code=${encodeURIComponent(
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

/**
 * Cập nhật danh sách sản phẩm từ webhook
 * @returns Promise<{success: boolean, message: string}> - Kết quả và message từ server
 */
export async function updateProducts(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
    const basicAuth = process.env.NEXT_PUBLIC_WEBHOOK_BASIC_AUTH;

    if (!webhookUrl) {
      throw new ApiError(
        "Webhook URL không được cấu hình",
        500,
        "MISSING_WEBHOOK_CONFIG"
      );
    }

    if (!basicAuth) {
      throw new ApiError(
        "Basic Auth không được cấu hình",
        500,
        "MISSING_BASIC_AUTH_CONFIG"
      );
    }

    // Encode basic auth
    const encodedAuth = btoa(basicAuth);

    const response = await fetch(webhookUrl + "/sync-kiotviet-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedAuth}`,
      },
      body: JSON.stringify({
        type: "products",
      }),
    });

    if (!response.ok) {
      throw new ApiError(
        `Webhook request failed: ${response.status} ${response.statusText}`,
        response.status,
        "WEBHOOK_ERROR"
      );
    }

    // Lấy response text từ server
    let responseMessage = "Cập nhật thành công!";
    try {
      const responseText = await response.text();
      if (responseText) {
        responseMessage = responseText;
      }
    } catch (e) {
      // Nếu không parse được text, sử dụng status text
      responseMessage = response.statusText || "Cập nhật thành công!";
    }

    return { success: true, message: responseMessage };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      `Lỗi khi cập nhật sản phẩm: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "UPDATE_ERROR"
    );
  }
}
