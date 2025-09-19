# Supabase Auth Integration

## Tổng quan

Ứng dụng đã được tích hợp với Supabase Authentication để thay thế hardcoded credentials. Hệ thống sử dụng email/password authentication với user management được thực hiện bởi admin.

## Cấu hình

### Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wvckxasjbydyvqgwgdhg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Print API (giữ nguyên)
NEXT_PUBLIC_PRINT_API_URL=https://n8n.gaolamthuy.vn/webhook/print

# Authentication đã được tích hợp với Supabase Auth
# Không cần hardcoded credentials nữa
```

## Components

### 1. AuthContext (`src/contexts/AuthContext.tsx`)

- **Supabase Auth Integration**: Sử dụng `supabase.auth` thay vì localStorage
- **Session Management**: Tự động quản lý session và auth state
- **Real-time Updates**: Listen cho auth state changes
- **Auto Redirect**: Tự động redirect sau login/logout

### 2. SignIn Page (`src/app/signin/page.tsx`)

- **Email/Password Form**: Form đăng nhập với email thay vì username
- **Validation**: Email validation và required fields
- **Error Handling**: Hiển thị lỗi đăng nhập
- **Loading States**: Loading indicators

### 3. Header Component (`src/components/Header.tsx`)

- **User Display**: Hiển thị email của user đã đăng nhập
- **Logout**: Button đăng xuất với Supabase Auth

## Authentication Flow

### 1. Login Process

```typescript
// User nhập email/password
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});

// AuthContext tự động cập nhật state
// Redirect về trang chủ nếu thành công
```

### 2. Session Management

```typescript
// Tự động check session khi app load
const {
  data: { session },
} = await supabase.auth.getSession();

// Listen cho auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  // Handle auth state changes
});
```

### 3. Logout Process

```typescript
// Sign out user
await supabase.auth.signOut();

// AuthContext tự động clear state
// Redirect về trang signin
```

## User Management

### Tạo User (Admin)

1. **Supabase Dashboard**: https://supabase.com/dashboard/project/wvckxasjbydyvqgwgdhg/auth/users
2. **Add User**: Click "Add user" button
3. **Email/Password**: Nhập email và password cho user
4. **Confirm**: User sẽ có thể đăng nhập ngay

### User Roles (Future)

- Có thể extend để support user roles
- RLS policies có thể dựa trên user roles
- Different permissions cho different users

## Security Features

### 1. Row Level Security (RLS)

```sql
-- Enable RLS cho bảng kv_products
ALTER TABLE kv_products ENABLE ROW LEVEL SECURITY;

-- Policy cho authenticated users
CREATE POLICY "Allow authenticated users to read kv_products"
ON kv_products FOR SELECT
TO authenticated
USING (true);

-- Policy cho update favorite
CREATE POLICY "Allow authenticated users to update favorite"
ON kv_products FOR UPDATE
TO authenticated
USING (true);
```

### 2. Session Security

- **JWT Tokens**: Supabase sử dụng JWT tokens
- **Auto Refresh**: Tokens tự động refresh
- **Secure Storage**: Tokens được lưu an toàn
- **Expiration**: Tokens có thời hạn

## API Integration

### 1. Supabase Client

```typescript
import { supabase } from "@/lib/supabase-client";

// Client tự động include auth headers
const { data, error } = await supabase.from("kv_products").select("*");
```

### 2. Auth Headers

- Supabase client tự động thêm auth headers
- Không cần manually handle tokens
- RLS policies tự động apply

## Testing

### Test Script

```bash
# Test Supabase Auth
node test-auth.js
```

### Manual Testing

1. **Tạo user trong Supabase Dashboard**
2. **Login với email/password**
3. **Verify session persistence**
4. **Test logout**
5. **Test protected routes**

## Troubleshooting

### Common Issues

1. **Login fails**

   - Check user exists in Supabase Dashboard
   - Verify email/password correct
   - Check network connection

2. **Session not persisting**

   - Check browser localStorage
   - Verify Supabase client configuration
   - Check auth state listener

3. **RLS policies blocking access**
   - Check user authentication status
   - Verify RLS policies
   - Check user permissions

### Debug Commands

```bash
# Test auth connection
node test-auth.js

# Check Supabase connection
node test-simple.js

# Test favorite feature
node test-favorite.js
```

## Migration Notes

### Changes Made

1. **Removed hardcoded credentials** từ `.env.local`
2. **Updated AuthContext** để sử dụng Supabase Auth
3. **Changed login form** từ username sang email
4. **Updated Header** để hiển thị email
5. **Added session management** với real-time updates

### Breaking Changes

- **Login form**: Bây giờ sử dụng email thay vì username
- **User data**: User object có thêm `id` và `email` fields
- **Session**: Sử dụng Supabase session thay vì localStorage

## Future Enhancements

### 1. User Roles

- Admin/Staff roles
- Different permissions
- Role-based UI

### 2. User Profile

- Profile management
- Password change
- User settings

### 3. Advanced Auth

- Social login (Google, GitHub)
- Multi-factor authentication
- Password reset

### 4. Analytics

- Login tracking
- User activity logs
- Security monitoring
