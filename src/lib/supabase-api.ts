import { supabase } from "./supabase";
import { Product, ProductCategory, ApiResponse } from "@/types/api";

/**
 * Lỗi API Supabase
 */
export class SupabaseApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "SUPABASE_API_ERROR"
  ) {
    super(message);
    this.name = "SupabaseApiError";
  }
}

/**
 * Lấy danh sách sản phẩm từ Supabase (bảng kv_products)
 * @returns Promise<ApiResponse> - Dữ liệu sản phẩm và danh mục
 */
export async function fetchProductsFromSupabase(): Promise<ApiResponse> {
  try {
    // Lấy danh sách sản phẩm từ bảng kv_products
    // Loại bỏ filter glt_visible vì tất cả sản phẩm đều có glt_visible = false
    const { data: products, error: productsError } = await supabase
      .from("kv_products")
      .select("*")
      .eq("is_active", true)
      .eq("allows_sale", true)
      .order("glt_sort_order", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true });

    if (productsError) {
      throw new SupabaseApiError(
        `Lỗi khi lấy danh sách sản phẩm: ${productsError.message}`,
        500,
        "PRODUCTS_FETCH_ERROR"
      );
    }

    // Lấy danh sách danh mục từ bảng kv_product_categories
    const { data: categories, error: categoriesError } = await supabase
      .from("kv_product_categories")
      .select("*")
      .eq("glt_is_active", true)
      .order("rank", { ascending: true });

    if (categoriesError) {
      throw new SupabaseApiError(
        `Lỗi khi lấy danh sách danh mục: ${categoriesError.message}`,
        500,
        "CATEGORIES_FETCH_ERROR"
      );
    }

    // Transform dữ liệu từ kv_products để phù hợp với interface hiện tại
    const transformedProducts: Product[] =
      products?.map((product) => ({
        id: product.kiotviet_id, // Sử dụng kiotviet_id làm id chính
        name: product.name,
        fullName: product.full_name,
        code: product.code,
        price: product.base_price,
        basePrice: product.base_price,
        categoryName: product.category_name,
        isActive: product.is_active,
        allowsSale: product.allows_sale,
        unit: product.unit, // Map trường unit từ database
        weight: product.weight, // Map trường weight từ database
        images: product.images || [],
        glt: {
          glt_gallery_original_url: product.glt_gallery_original_url,
          glt_labelprint_favorite: product.glt_labelprint_favorite,
        },
      })) || [];

    // Transform dữ liệu từ kv_product_categories
    const transformedCategories: ProductCategory[] =
      categories?.map((category) => ({
        categoryId: category.category_id,
        categoryName: category.category_name,
        retailerId: category.retailer_id,
        modifiedDate: category.modified_date,
        createdDate: category.created_date,
        rank: category.rank,
        glt: {
          glt_is_active: category.glt_is_active || false,
          glt_color_border: category.glt_color_border || "#000000",
        },
      })) || [];

    return {
      products: transformedProducts,
      categories: transformedCategories,
    };
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw error;
    }

    throw new SupabaseApiError(
      `Lỗi không xác định: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "UNKNOWN_ERROR"
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
    const { data, error } = await supabase
      .from("kv_products")
      .select("*")
      .eq("category_name", categoryName)
      .eq("is_active", true)
      .eq("allows_sale", true)
      .order("glt_sort_order", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true });

    if (error) {
      throw new SupabaseApiError(
        `Lỗi khi lấy sản phẩm theo danh mục: ${error.message}`,
        500,
        "PRODUCTS_BY_CATEGORY_ERROR"
      );
    }

    return (
      data?.map((product) => ({
        id: product.kiotviet_id,
        name: product.name,
        fullName: product.full_name,
        code: product.code,
        price: product.base_price,
        basePrice: product.base_price,
        categoryName: product.category_name,
        isActive: product.is_active,
        allowsSale: product.allows_sale,
        unit: product.unit,
        weight: product.weight,
        images: product.images || [],
        glt: {
          glt_gallery_original_url: product.glt_gallery_original_url,
          glt_labelprint_favorite: product.glt_labelprint_favorite,
        },
      })) || []
    );
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw error;
    }

    throw new SupabaseApiError(
      `Lỗi khi lấy sản phẩm theo danh mục: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "UNKNOWN_ERROR"
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
    const { data, error } = await supabase
      .from("kv_products")
      .select("*")
      .or(
        `name.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`
      )
      .eq("is_active", true)
      .eq("allows_sale", true)
      .order("glt_sort_order", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true });

    if (error) {
      throw new SupabaseApiError(
        `Lỗi khi tìm kiếm sản phẩm: ${error.message}`,
        500,
        "SEARCH_PRODUCTS_ERROR"
      );
    }

    return (
      data?.map((product) => ({
        id: product.kiotviet_id,
        name: product.name,
        fullName: product.full_name,
        code: product.code,
        price: product.base_price,
        basePrice: product.base_price,
        categoryName: product.category_name,
        isActive: product.is_active,
        allowsSale: product.allows_sale,
        unit: product.unit,
        weight: product.weight,
        images: product.images || [],
        glt: {
          glt_gallery_original_url: product.glt_gallery_original_url,
          glt_labelprint_favorite: product.glt_labelprint_favorite,
        },
      })) || []
    );
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw error;
    }

    throw new SupabaseApiError(
      `Lỗi khi tìm kiếm sản phẩm: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "UNKNOWN_ERROR"
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
    const { data, error } = await supabase
      .from("kv_products")
      .select("*")
      .eq("kiotviet_id", productId)
      .eq("is_active", true)
      .eq("allows_sale", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Không tìm thấy sản phẩm
        return null;
      }
      throw new SupabaseApiError(
        `Lỗi khi lấy thông tin sản phẩm: ${error.message}`,
        500,
        "GET_PRODUCT_BY_ID_ERROR"
      );
    }

    return {
      id: data.kiotviet_id,
      name: data.name,
      fullName: data.full_name,
      code: data.code,
      price: data.base_price,
      basePrice: data.base_price,
      categoryName: data.category_name,
      isActive: data.is_active,
      allowsSale: data.allows_sale,
      unit: data.unit,
      weight: data.weight,
      images: data.images || [],
      glt: {
        glt_gallery_original_url: data.glt_gallery_original_url,
        glt_labelprint_favorite: data.glt_labelprint_favorite,
      },
    };
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw error;
    }

    throw new SupabaseApiError(
      `Lỗi khi lấy thông tin sản phẩm: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "UNKNOWN_ERROR"
    );
  }
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
    const { data, error } = await supabase
      .from("kv_products")
      .update({ glt_labelprint_favorite: isFavorite })
      .eq("kiotviet_id", productId)
      .select("kiotviet_id, glt_labelprint_favorite")
      .single();

    if (error) {
      throw new SupabaseApiError(
        `Lỗi khi cập nhật favorite: ${error.message}`,
        500,
        "UPDATE_FAVORITE_ERROR"
      );
    }

    return data?.glt_labelprint_favorite === isFavorite;
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw error;
    }

    throw new SupabaseApiError(
      `Lỗi khi cập nhật favorite: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "UNKNOWN_ERROR"
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
    // Lấy trạng thái hiện tại
    const { data: currentProduct, error: getError } = await supabase
      .from("kv_products")
      .select("kiotviet_id, glt_labelprint_favorite")
      .eq("kiotviet_id", productId)
      .single();

    if (getError) {
      throw new SupabaseApiError(
        `Lỗi khi lấy thông tin sản phẩm: ${getError.message}`,
        500,
        "GET_PRODUCT_ERROR"
      );
    }

    const newFavoriteStatus = !currentProduct.glt_labelprint_favorite;

    // Cập nhật trạng thái mới
    const { data, error } = await supabase
      .from("kv_products")
      .update({ glt_labelprint_favorite: newFavoriteStatus })
      .eq("kiotviet_id", productId)
      .select("kiotviet_id, glt_labelprint_favorite")
      .single();

    if (error) {
      throw new SupabaseApiError(
        `Lỗi khi cập nhật favorite: ${error.message}`,
        500,
        "UPDATE_FAVORITE_ERROR"
      );
    }

    return data?.glt_labelprint_favorite || false;
  } catch (error) {
    if (error instanceof SupabaseApiError) {
      throw error;
    }

    throw new SupabaseApiError(
      `Lỗi khi toggle favorite: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      500,
      "UNKNOWN_ERROR"
    );
  }
}
