/**
 * API Types
 * TypeScript interfaces cho API response data
 */

export interface GltData {
  glt_color_border?: string | null;
  glt_is_active?: boolean;
  glt_visible?: boolean | null;
  glt_gallery_original_url?: string | null;
  glt_baseprice_markup?: number | null;
  glt_kiotvietshop_url?: string | null;
  glt_labelprint_favorite?: boolean;
  [key: string]: any; // Allow additional properties
}

export interface ProductCategory {
  categoryId: number;
  categoryName: string;
  retailerId: number;
  modifiedDate: string;
  createdDate: string;
  rank: number;
  glt: GltData;
  [key: string]: any; // Allow additional properties
}

export interface Product {
  id: string | number;
  name: string;
  fullName: string;
  code: string;
  price?: number; // Optional price field
  basePrice?: number; // Optional basePrice field (legacy)
  categoryName: string;
  isActive: boolean;
  allowsSale: boolean;
  unit?: string; // Unit of measurement (kg, g, etc.)
  weight?: number; // Weight in grams
  glt: GltData;
  images?: string[]; // Array of image URLs
  [key: string]: any; // Allow additional properties
}

export interface ApiResponse {
  products: Product[];
  product_categories?: ProductCategory[];
  [key: string]: any; // Allow additional properties
}

/**
 * Types cho print label request
 */
export interface PrintLabelRequest {
  code: string;
  quantity: number;
}
