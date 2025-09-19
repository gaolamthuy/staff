# API Documentation

## 📋 Tổng quan

Hệ thống sử dụng các API endpoints để lấy dữ liệu sản phẩm và thực hiện in tem.

## 🌐 External APIs

### 1. Products API (Supabase)

**Endpoint**: Supabase Database

**Description**: Lấy danh sách tất cả sản phẩm từ Supabase database

**Response Format**:

```typescript
interface ApiResponse {
  products: Product[];
  categories: ProductCategory[];
}
```

### 2. Print Label API

**Endpoint**: `POST ${WEBHOOK_URL}`

**Description**: Tạo URL để in tem sản phẩm

**Parameters**:

- `code`: Mã sản phẩm
- `quantity`: Số lượng in

**Usage**:

```typescript
const printUrl = createPrintLabelUrl(code, quantity);
window.open(printUrl, "_blank");
```

## 📊 Data Types

### Product Interface

```typescript
interface Product {
  id: number | string;
  name: string;
  fullName?: string;
  code: string;
  price?: number;
  basePrice?: number;
  categoryName: string;
  isActive: boolean;
  allowsSale: boolean;
  images?: string[];
  glt?: {
    glt_gallery_original_url?: string;
    glt_labelprint_favorite?: boolean;
  };
}
```

### ProductCategory Interface

```typescript
interface ProductCategory {
  categoryId: number;
  categoryName: string;
  retailerId: number;
  modifiedDate: string;
  createdDate: string;
  rank: number;
  glt: {
    glt_is_active: boolean;
    glt_color_border: string;
  };
}
```

## 🔧 Internal API Routes

### 1. Products API Route

**Endpoint**: `GET /api/products`

**Description**: API route nội bộ để lấy danh sách sản phẩm

**Implementation**: `src/app/api/products/route.ts`

**Response**: JSON với danh sách sản phẩm đã được lọc (chỉ gạo)

## 🛠️ Error Handling

### ApiError Class

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "API_ERROR"
  ) {
    super(message);
    this.name = "ApiError";
  }
}
```

### Common Error Codes

- `NETWORK_ERROR`: Lỗi kết nối mạng
- `MISSING_PRINT_CONFIG`: Thiếu cấu hình print API
- `API_ERROR`: Lỗi API chung

## 🔒 Security

### Environment Variables

Các URL nhạy cảm được ẩn trong environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEXT_PUBLIC_WEBHOOK_URL`: Webhook URL for printing

### Validation

Sử dụng Zod để validate dữ liệu:

```typescript
// src/lib/validation.ts
const productSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  code: z.string(),
  // ... other fields
});
```

## 📝 Usage Examples

### Fetch Products

```typescript
import { fetchProductsData } from "@/lib/api";

try {
  const data = await fetchProductsData();
  console.log("Products:", data.products);
  console.log("Categories:", data.categories);
} catch (error) {
  if (error instanceof ApiError) {
    console.error("API Error:", error.message);
  }
}
```

### Print Label

```typescript
import { createPrintLabelUrl } from "@/lib/api";

const handlePrint = (code: string, quantity: number) => {
  try {
    const printUrl = createPrintLabelUrl(code, quantity);
    window.open(printUrl, "_blank");
  } catch (error) {
    console.error("Print Error:", error.message);
  }
};
```

## 🔄 Data Flow

1. **Load Products**: `page.tsx` → `fetchProductsData()` → Supabase Database
2. **Filter Products**: `ProductList` → Filter by rice categories
3. **Print Label**: `ProductCard` → `createPrintLabelUrl()` → Print API

## 🐛 Debugging

### Common Issues

1. **CORS Errors**: Kiểm tra domain trong API configuration
2. **Network Errors**: Verify internet connection và API availability
3. **Print Errors**: Check environment variables configuration

### Logs

- API calls được log trong console
- Error boundaries catch và hiển thị errors
- Network tab trong DevTools để debug requests

## 🔮 Future Improvements

1. **Caching**: Implement React Query cho better caching
2. **Retry Logic**: Auto-retry cho failed requests
3. **Rate Limiting**: Implement rate limiting cho API calls
4. **WebSocket**: Real-time updates cho product data
