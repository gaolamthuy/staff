# Gạo Lâm Thúy - Staff Portal

Hệ thống quản lý sản phẩm và in tem Gạo Lâm Thúy được xây dựng với Next.js 14, TypeScript và Ant Design.

## 🚀 Tính năng

- **In tem sản phẩm**: Chọn sản phẩm và số lượng để in tem
- **Quản lý sản phẩm**: Xem danh sách sản phẩm với filter theo danh mục
- **Light/Dark theme**: Chuyển đổi giữa light và dark mode
- **Responsive design**: Tương thích với mọi thiết bị
- **Authentication**: Hệ thống đăng nhập an toàn
- **Real-time data**: Lấy dữ liệu từ API thực tế

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Framework**: Ant Design 5.x
- **Styling**: CSS Modules + Ant Design
- **State Management**: React Hooks + Context API
- **Authentication**: Custom auth system
- **Theme**: Custom theme implementation

## 📦 Cài đặt

### Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd staff-nextjs
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình environment

Tạo file `.env.local` và cấu hình các biến môi trường:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url_here

# Webhook Configuration (Required for print functionality)
NEXT_PUBLIC_WEBHOOK_URL=your-webhook-url
```

### Bước 4: Chạy development server

```bash
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 🏗️ Cấu trúc project

```
staff-nextjs/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── api/               # API routes
│   │   ├── signin/            # Trang đăng nhập
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Trang chính
│   ├── components/            # React components
│   │   ├── Header.tsx         # Header component
│   │   ├── ProductCard.tsx    # Product card component
│   │   ├── ProductList.tsx    # Product list component
│   │   ├── CategoryFilter.tsx # Category filter component
│   │   └── CustomPrintModal.tsx # Custom print modal
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── hooks/                 # Custom hooks
│   │   └── useTheme.ts        # Theme management
│   ├── lib/                   # Utility functions
│   │   ├── api.ts            # API service layer
│   │   └── validation.ts     # Validation schemas
│   └── types/                # TypeScript types
│       └── api.ts            # API data types
├── docs/                     # Documentation
│   └── DEVELOPMENT.md        # Development guide
├── public/                   # Static assets
│   ├── icon0.svg            # Logo SVG
│   ├── icon1.png            # Logo PNG
│   └── favicon.ico          # Favicon
├── .env.local                # Environment variables
└── README.md                 # Documentation
```

## 📱 Cách sử dụng

### Trang chính - In tem sản phẩm

1. Truy cập trang chủ `/`
2. Đăng nhập với tài khoản được cấp
3. Chọn sản phẩm từ danh sách
4. Nhấn nút "In 5kg" hoặc "In 10kg"
5. Hệ thống sẽ mở tab mới để in tem

### Chuyển đổi theme

- Nhấn nút bulb icon trên header để chuyển đổi giữa light/dark mode

## 🔧 Scripts

```bash
# Development
npm run dev

# Build production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🌐 API Endpoints

### Sản phẩm

- **GET** `/api/products` - Lấy danh sách sản phẩm

## 🎨 Customization

### Thay đổi theme

Chỉnh sửa file `src/hooks/useTheme.ts`:

```typescript
const antdTheme = {
  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: "#your-color", // Thay đổi màu chủ đạo
    borderRadius: 8,
  },
};
```

### Thêm sản phẩm mới

1. Cập nhật API data
2. Sản phẩm sẽ tự động hiển thị trong danh sách

## 🚀 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Connect repository với Vercel
3. Cấu hình environment variables
4. Deploy tự động

### Docker

```bash
# Build image
docker build -t staff-nextjs .

# Run container
docker run -p 3000:3000 staff-nextjs
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- Environment variables cho API keys
- Input validation và sanitization
- HTTPS enforcement
- Content Security Policy (CSP)
- Authentication system

## 📚 Documentation

- [Development Guide](./docs/DEVELOPMENT.md) - Hướng dẫn phát triển chi tiết
- [API Documentation](./docs/API.md) - Tài liệu API (nếu có)

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub hoặc liên hệ team phát triển.

---

**Gạo Lâm Thúy** - Hệ thống quản lý sản phẩm hiện đại
