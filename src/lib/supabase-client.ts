import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client Configuration
 * Cấu hình Supabase client với auth và cache-busting headers
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
  // Cấu hình global để đảm bảo luôn lấy dữ liệu mới
  global: {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      "Last-Modified": new Date().toUTCString(),
      ETag: `"${Date.now()}"`,
    },
  },
});
