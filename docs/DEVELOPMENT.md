# Development Documentation

## 📋 Tổng quan

Đây là hệ thống quản lý sản phẩm và in tem cho Gạo Lâm Thúy, được xây dựng với Next.js 14, TypeScript và Ant Design.

## 🏗️ Cấu trúc Project

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── signin/            # Trang đăng nhập
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Trang chính
├── components/            # React components
│   ├── Header.tsx         # Header với logo và navigation
│   ├── ProductCard.tsx    # Card hiển thị sản phẩm
│   ├── ProductList.tsx    # Danh sách sản phẩm
│   ├── CategoryFilter.tsx # Filter theo danh mục
│   └── CustomPrintModal.tsx # Modal in tùy chọn
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── hooks/                 # Custom hooks
│   └── useTheme.ts        # Theme management
├── lib/                   # Utility functions
│   ├── api.ts            # API service layer
│   └── validation.ts     # Zod validation schemas
└── types/                # TypeScript types
    └── api.ts            # API data types
```

## 🔧 Cấu hình Environment

Tạo file `.env.local` với các biến sau:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url_here

# Webhook Configuration
NEXT_PUBLIC_WEBHOOK_URL=your_webhook_url_here
```

## 🚀 Cách chạy Development

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Lint code
npm run lint
```

## 📱 Các Component Chính

### 1. Header Component (`src/components/Header.tsx`)

- Hiển thị logo Gạo Lâm Thúy
- Navigation menu
- Theme toggle (light/dark)
- User dropdown với logout

### 2. ProductCard Component (`src/components/ProductCard.tsx`)

- Hiển thị thông tin sản phẩm
- Hình ảnh sản phẩm
- Giá và danh mục
- Các nút in tem (5kg, 10kg, tùy chọn)

### 3. ProductList Component (`src/components/ProductList.tsx`)

- Danh sách sản phẩm dạng grid
- Filter theo danh mục
- Search functionality
- Pagination (nếu cần)

### 4. AuthContext (`src/contexts/AuthContext.tsx`)

- Quản lý authentication state
- Login/logout functions
- User session management

## 🔌 API Integration

### Fetch Products

```typescript
// src/lib/api.ts
export async function fetchProductsData(): Promise<ApiResponse>;
```

### Print Label

```typescript
// Tạo URL in tem
export function createPrintLabelUrl(code: string, quantity: number): string;
```

## 🎨 Theme System

Sử dụng Ant Design theme với dark/light mode:

```typescript
// src/hooks/useTheme.ts
const { isDarkMode, toggleTheme } = useTheme();
```

## 🔒 Authentication

- Hardcoded credentials trong AuthContext
- Session management với localStorage
- Protected routes với AuthRedirect component

## 📊 Data Flow

1. **Load Products**: `page.tsx` → `fetchProductsData()` → API
2. **Filter Products**: `ProductList` → `CategoryFilter` → Filtered products
3. **Print Label**: `ProductCard` → `createPrintLabelUrl()` → Open new tab

## 🐛 Debugging

### Common Issues

1. **API Errors**: Kiểm tra `NEXT_PUBLIC_API_URL` trong .env
2. **Print Errors**: Kiểm tra `NEXT_PUBLIC_WEBHOOK_URL`
3. **Theme Issues**: Kiểm tra localStorage 'theme' value

### Logs

- API calls được log trong console
- Error boundaries catch và hiển thị errors
- Validation errors từ Zod

## 🔄 State Management

- **Local State**: React useState cho UI state
- **Global State**: React Context cho auth và theme
- **Server State**: Direct API calls (có thể migrate sang React Query sau)

## 📝 Code Style

- TypeScript strict mode
- ESLint với Next.js rules
- Prettier formatting
- Component naming: PascalCase
- File naming: kebab-case

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect với Vercel
3. Set environment variables
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

## 🔮 Future Improvements

1. **React Query**: Cho better server state management
2. **Error Boundaries**: More granular error handling
3. **Testing**: Jest + React Testing Library
4. **PWA**: Service worker cho offline support
5. **Analytics**: User behavior tracking
6. **Performance**: Image optimization, lazy loading

## 📞 Support

Nếu có vấn đề:

1. Kiểm tra console logs
2. Verify environment variables
3. Test API endpoints
4. Check network tab cho failed requests
