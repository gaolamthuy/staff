/**
 * Trang chủ - Dashboard chính
 * Hiển thị menu navigation và thông tin tổng quan
 */

import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { PrinterOutlined, ShoppingCartOutlined, FileTextOutlined } from "@ant-design/icons";
import { AuthCheck } from "@/components/AuthCheck";
import Link from "next/link";

const { Title, Paragraph } = Typography;

/**
 * Trang chủ - Dashboard
 */
export default function HomePage() {
  return (
    <AuthCheck>
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Title level={1} style={{ color: "#1890ff", marginBottom: "16px" }}>
            🌾 Gạo Lâm Thúy - Hệ thống In tem
          </Title>
          <Paragraph style={{ fontSize: "18px", color: "#666" }}>
            Chào mừng bạn đến với hệ thống quản lý và in tem sản phẩm
          </Paragraph>
        </div>

        {/* Menu Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              style={{ height: "100%", textAlign: "center" }}
              bodyStyle={{ padding: "32px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                <PrinterOutlined style={{ color: "#52c41a" }} />
              </div>
              <Title level={3} style={{ marginBottom: "16px" }}>
                In tem bán lẻ
              </Title>
              <Paragraph style={{ color: "#666", marginBottom: "24px" }}>
                In tem cho sản phẩm bán lẻ với thông tin giá, mã sản phẩm
              </Paragraph>
              <Link href="/print/label-retail">
                <Button type="primary" size="large" block>
                  Truy cập
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              style={{ height: "100%", textAlign: "center" }}
              bodyStyle={{ padding: "32px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                <FileTextOutlined style={{ color: "#1890ff" }} />
              </div>
              <Title level={3} style={{ marginBottom: "16px" }}>
                In tem nhập hàng
              </Title>
              <Paragraph style={{ color: "#666", marginBottom: "24px" }}>
                In tem cho sản phẩm nhập hàng với thông tin chi tiết
              </Paragraph>
              <Link href="/print/label-purchaseorder">
                <Button type="primary" size="large" block>
                  Truy cập
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card
              hoverable
              style={{ height: "100%", textAlign: "center" }}
              bodyStyle={{ padding: "32px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                <ShoppingCartOutlined style={{ color: "#722ed1" }} />
              </div>
              <Title level={3} style={{ marginBottom: "16px" }}>
                Quản lý sản phẩm
              </Title>
              <Paragraph style={{ color: "#666", marginBottom: "24px" }}>
                Quản lý danh sách sản phẩm, cập nhật thông tin
              </Paragraph>
              <Button type="default" size="large" block disabled>
                Sắp có
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Quick Stats */}
        <div style={{ marginTop: "48px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
            Thống kê nhanh
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#52c41a" }}>
                  30+
                </div>
                <div style={{ color: "#666" }}>Sản phẩm gạo</div>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}>
                  6
                </div>
                <div style={{ color: "#666" }}>Danh mục</div>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#722ed1" }}>
                  2
                </div>
                <div style={{ color: "#666" }}>Loại in tem</div>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fa8c16" }}>
                  24/7
                </div>
                <div style={{ color: "#666" }}>Hỗ trợ</div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </AuthCheck>
  );
}
