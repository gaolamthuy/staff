/**
 * Trang đăng nhập
 * Form đăng nhập với hardcode credentials
 */

"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface SignInForm {
  username: string;
  password: string;
}

/**
 * Trang đăng nhập
 */
export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (!isLoading && user && user.isAuthenticated) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  // Hiển thị loading nếu đang check auth
  if (isLoading) {
    return (
      <div className="signin-page">
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #1890ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p>Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  // Nếu đã đăng nhập, không hiển thị form
  if (user && user.isAuthenticated) {
    return null;
  }

  /**
   * Xử lý đăng nhập
   */
  const handleSignIn = async (values: SignInForm) => {
    console.log("Attempting login with:", values);
    setLoading(true);
    try {
      const success = await login(values.username, values.password);
      console.log("Login result:", success);
      if (success) {
        message.success("Đăng nhập thành công!");
      } else {
        message.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Có lỗi xảy ra khi đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        {/* logo center */}
        <div className="signin-logo">
          <img
            src="/icon0.svg"
            alt="Logo Gạo Lâm Thúy"
            style={{
              height: 100,
              marginBottom: 8,
              display: "block",
              margin: "0 auto 0 auto",
            }}
          />
          <h1>Gạo Lâm Thúy - Staff</h1>
          <p>Quản lý sản phẩm và in tem</p>
        </div>

        <Form
          name="signin"
          onFinish={handleSignIn}
          layout="vertical"
          initialValues={{ username: "", password: "" }}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập tên đăng nhập"
              size="large"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              size="large"
              style={{ width: "100%" }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="signin-info">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", opacity: 0.7 }}>ℹ️</span>
            <span>
              Thông tin đăng nhập: <strong>username</strong> /{" "}
              <strong>password123</strong>
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Prevent flash during theme switch */
        .ant-input,
        .ant-input-password,
        .ant-input-affix-wrapper {
          transition: all 0.2s ease !important;
        }

        /* Force dark mode input styles */
        body.dark-mode .ant-input,
        body.dark-mode .ant-input-password,
        body.dark-mode .ant-input-affix-wrapper {
          background-color: #2a2a2a !important;
          border-color: #444 !important;
          color: #e6e6e6 !important;
        }

        body.dark-mode .ant-input:focus,
        body.dark-mode .ant-input-password:focus,
        body.dark-mode .ant-input-affix-wrapper:focus {
          background-color: #2a2a2a !important;
          border-color: #1890ff !important;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
        }

        body.dark-mode .ant-input::placeholder,
        body.dark-mode .ant-input-password .ant-input::placeholder {
          color: #888 !important;
        }

        /* Light mode input styles */
        body:not(.dark-mode) .ant-input,
        body:not(.dark-mode) .ant-input-password,
        body:not(.dark-mode) .ant-input-affix-wrapper {
          background-color: #ffffff !important;
          border-color: #d9d9d9 !important;
          color: #000000 !important;
        }

        body:not(.dark-mode) .ant-input::placeholder,
        body:not(.dark-mode) .ant-input-password .ant-input::placeholder {
          color: #bfbfbf !important;
        }
      `}</style>
    </div>
  );
}
