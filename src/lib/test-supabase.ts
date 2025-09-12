/**
 * Test file để kiểm tra tích hợp Supabase
 * Chỉ sử dụng trong development
 */

import { supabase, checkSupabaseConnection, getDatabaseInfo } from "./supabase";
import { fetchProductsFromSupabase } from "./supabase-api";

/**
 * Chạy tất cả tests để kiểm tra Supabase integration
 */
export async function runSupabaseTests(): Promise<{
  success: boolean;
  results: {
    connection: boolean;
    databaseInfo: any;
    productsFetch: boolean;
    error?: string;
  };
}> {
  const results = {
    connection: false,
    databaseInfo: null,
    productsFetch: false,
    error: undefined as string | undefined,
  };

  try {
    console.log("🧪 Bắt đầu test Supabase integration...");

    // Test 1: Kiểm tra kết nối
    console.log("1️⃣ Kiểm tra kết nối Supabase...");
    results.connection = await checkSupabaseConnection();
    console.log(
      "✅ Kết nối Supabase:",
      results.connection ? "THÀNH CÔNG" : "THẤT BẠI"
    );

    // Test 2: Lấy thông tin database
    console.log("2️⃣ Lấy thông tin database...");
    results.databaseInfo = await getDatabaseInfo();
    console.log("✅ Database info:", results.databaseInfo);

    // Test 3: Fetch products
    console.log("3️⃣ Test fetch products...");
    const productsData = await fetchProductsFromSupabase();
    results.productsFetch = productsData.products.length > 0;
    console.log(
      "✅ Products fetched:",
      productsData.products.length,
      "sản phẩm"
    );
    console.log(
      "✅ Categories fetched:",
      productsData.categories.length,
      "danh mục"
    );

    console.log("🎉 Tất cả tests đã hoàn thành thành công!");

    return {
      success: true,
      results,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Test failed:", errorMessage);

    results.error = errorMessage;

    return {
      success: false,
      results,
    };
  }
}

/**
 * Test riêng lẻ từng function
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    return await checkSupabaseConnection();
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
}

export async function testDatabaseInfo(): Promise<any> {
  try {
    return await getDatabaseInfo();
  } catch (error) {
    console.error("Database info test failed:", error);
    return null;
  }
}

export async function testProductsFetch(): Promise<boolean> {
  try {
    const data = await fetchProductsFromSupabase();
    return data.products.length > 0;
  } catch (error) {
    console.error("Products fetch test failed:", error);
    return false;
  }
}

/**
 * Test với Supabase client trực tiếp
 */
export async function testDirectSupabaseQueries(): Promise<{
  products: any[];
  categories: any[];
  error?: string;
}> {
  try {
    // Test query products trực tiếp từ bảng kv_products
    const { data: products, error: productsError } = await supabase
      .from("kv_products")
      .select("*")
      .limit(5);

    if (productsError) {
      throw new Error(`Products query error: ${productsError.message}`);
    }

    // Test query categories trực tiếp từ bảng kv_product_categories
    const { data: categories, error: categoriesError } = await supabase
      .from("kv_product_categories")
      .select("*")
      .limit(5);

    if (categoriesError) {
      throw new Error(`Categories query error: ${categoriesError.message}`);
    }

    return {
      products: products || [],
      categories: categories || [],
    };
  } catch (error) {
    return {
      products: [],
      categories: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
