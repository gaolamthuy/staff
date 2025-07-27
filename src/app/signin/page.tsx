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
    setLoading(true);
    try {
      const success = await login(values.username, values.password);
      if (success) {
        message.success("Đăng nhập thành công!");
      } else {
        message.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="signin-logo">
          <img
            src="/icon0.svg"
            alt="Logo Gạo Lâm Thúy"
            style={{ height: 48, marginBottom: 8 }}
          />
          <h1>Gạo Lâm Thúy - Staff</h1>
          <p>Hệ thống quản lý sản phẩm và in tem</p>
        </div>

        <Form name="signin" onFinish={handleSignIn} layout="vertical">
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
          Thông tin đăng nhập: username / password123
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
