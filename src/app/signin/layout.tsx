import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Đăng nhập - Gạo Lâm Thúy",
  description: "Đăng nhập vào hệ thống quản lý sản phẩm Gạo Lâm Thúy",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <AuthProvider>{children}</AuthProvider>
    </ErrorBoundary>
  );
}
