/**
 * Validation Schemas
 * Zod schemas để validate API data
 */

import { z } from "zod";

// GltData schema
const GltDataSchema = z
  .object({
    glt_color_border: z.string().nullable().optional(),
    glt_is_active: z.boolean().optional(),
    glt_visible: z.boolean().nullable().optional(),
    glt_gallery_original_url: z.string().nullable().optional(),
    glt_baseprice_markup: z.number().nullable().optional(),
    glt_kiotvietshop_url: z.string().nullable().optional(),
    glt_labelprint_favorite: z.boolean().optional(),
  })
  .passthrough();

// ProductCategory schema
const ProductCategorySchema = z
  .object({
    categoryId: z.number(),
    categoryName: z.string(),
    retailerId: z.number(),
    modifiedDate: z.string(),
    createdDate: z.string(),
    rank: z.number(),
    glt: GltDataSchema,
  })
  .passthrough();

// Product schema
const ProductSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
    fullName: z.string(),
    code: z.string(),
    price: z.number(),
    categoryName: z.string(),
    isActive: z.boolean(),
    allowsSale: z.boolean(),
    glt: GltDataSchema,
  })
  .passthrough();

// API Response schema
const ApiResponseSchema = z
  .object({
    products: z.array(ProductSchema),
    product_categories: z.array(ProductCategorySchema).optional(),
  })
  .passthrough();

/**
 * Validate API response data
 */
export function validateApiResponse(data: any): any {
  try {
    const validatedData = ApiResponseSchema.parse(data);
    return validatedData;
  } catch (error) {
    // Return data as-is if validation fails
    return data;
  }
}

// Export types
export type ValidatedApiResponse = z.infer<typeof ApiResponseSchema>;
export type ValidatedProduct = z.infer<typeof ProductSchema>;
export type ValidatedProductCategory = z.infer<typeof ProductCategorySchema>;
export type ValidatedGltData = z.infer<typeof GltDataSchema>;
