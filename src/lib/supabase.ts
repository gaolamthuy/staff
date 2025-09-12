import { createClient } from "@supabase/supabase-js";

/**
 * Cấu hình Supabase client
 * Sử dụng environment variables để bảo mật thông tin kết nối
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Thiếu cấu hình Supabase. Vui lòng kiểm tra NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY trong file .env.local"
  );
}

/**
 * Supabase client instance
 * Được sử dụng để tương tác với database và các dịch vụ của Supabase
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Tự động refresh token
    autoRefreshToken: true,
    // Lưu session trong localStorage
    persistSession: true,
    // Detect session từ URL (cho OAuth flows)
    detectSessionInUrl: true,
  },
  // Cấu hình realtime
  realtime: {
    // Tự động kết nối lại khi mất kết nối
    params: {
      eventsPerSecond: 10,
    },
  },
});

/**
 * Kiểm tra kết nối Supabase
 * @returns Promise<boolean> - true nếu kết nối thành công
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    // Test kết nối bằng cách query một bảng đơn giản
    const { data, error } = await supabase
      .from("kv_products")
      .select("kiotviet_id")
      .limit(1);

    if (error) {
      console.error("Supabase connection error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Supabase connection failed:", error);
    return false;
  }
}

/**
 * Lấy thông tin database schema
 * @returns Promise<any> - Thông tin schema của database
 */
export async function getDatabaseInfo(): Promise<any> {
  try {
    // Lấy thông tin database bằng cách đếm records
    const { count: productsCount, error: productsError } = await supabase
      .from("kv_products")
      .select("*", { count: "exact", head: true });

    const { count: categoriesCount, error: categoriesError } = await supabase
      .from("kv_product_categories")
      .select("*", { count: "exact", head: true });

    if (productsError || categoriesError) {
      console.error(
        "Error getting database info:",
        productsError || categoriesError
      );
      return null;
    }

    return {
      products_count: productsCount || 0,
      categories_count: categoriesCount || 0,
      active_products_count: productsCount || 0, // Simplified
      visible_products_count: productsCount || 0, // Simplified
      last_updated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to get database info:", error);
    return null;
  }
}
