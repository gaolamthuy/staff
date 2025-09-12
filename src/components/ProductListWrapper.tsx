/**
 * Product List Wrapper Component
 * Client component wrapper để handle favorite changes
 */

"use client";

import React, { useState } from "react";
import { ProductList } from "./ProductList";
import { Product, ProductCategory } from "@/types/api";

interface ProductListWrapperProps {
  products: Product[];
  categories: ProductCategory[];
  isLoading?: boolean;
  error?: string;
}

/**
 * Product List Wrapper Component
 */
export const ProductListWrapper: React.FC<ProductListWrapperProps> = ({
  products,
  categories,
  isLoading = false,
  error,
}) => {
  const [localProducts, setLocalProducts] = useState(products);

  /**
   * Handle favorite change
   * Cập nhật trạng thái favorite trong local state
   */
  const handleFavoriteChange = (
    productId: string | number,
    isFavorite: boolean
  ) => {
    setLocalProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              glt: {
                ...product.glt,
                glt_labelprint_favorite: isFavorite,
              },
            }
          : product
      )
    );
  };

  return (
    <ProductList
      products={localProducts}
      categories={categories}
      isLoading={isLoading}
      error={error}
      onFavoriteChange={handleFavoriteChange}
    />
  );
};
