/**
 * Custom Print Modal Component
 * Modal để nhập số lượng tùy chọn cho in tem
 */

"use client";

import React, { useState, useEffect } from "react";

interface CustomPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  productName: string;
  productCode: string;
}

/**
 * Custom Print Modal Component
 */
export const CustomPrintModal: React.FC<CustomPrintModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  productCode,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setError("");
    }
  }, [isOpen]);

  /**
   * Validate quantity input
   */
  const validateQuantity = (value: number): boolean => {
    if (value <= 0) {
      setError("Số lượng phải lớn hơn 0");
      return false;
    }
    if (value > 1000) {
      setError("Số lượng không được vượt quá 1000");
      return false;
    }
    if (!Number.isInteger(value)) {
      setError("Số lượng phải là số nguyên");
      return false;
    }
    setError("");
    return true;
  };

  /**
   * Handle quantity change
   */
  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setQuantity(numValue);
    validateQuantity(numValue);
  };

  /**
   * Handle confirm button click
   */
  const handleConfirm = () => {
    if (validateQuantity(quantity)) {
      onConfirm(quantity);
      onClose();
    }
  };

  /**
   * Handle key press (Enter to confirm, Escape to close)
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirm();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="custom-print-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="custom-print-modal"
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h3
            className="modal-title"
            style={{
              margin: "0 0 8px 0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            In tem tùy chọn
          </h3>
          <p
            className="modal-subtitle"
            style={{ margin: 0, color: "#666", fontSize: "14px" }}
          >
            {productName} ({productCode})
          </p>
        </div>

        {/* Quantity Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="quantity-input"
            className="input-label"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Số lượng (kg):
          </label>
          <input
            id="quantity-input"
            type="number"
            min="1"
            max="1000"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            onKeyDown={handleKeyPress}
            className="quantity-input"
            style={{
              width: "100%",
              padding: "12px",
              border: error ? "2px solid #ff4d4f" : "2px solid #d9d9d9",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.2s",
              background: "white",
              color: "#333",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1890ff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? "#ff4d4f" : "#d9d9d9";
            }}
            autoFocus
          />
          {error && (
            <p
              className="error-message"
              style={{
                margin: "8px 0 0 0",
                color: "#ff4d4f",
                fontSize: "12px",
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* Quick Quantity Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <p
            className="quick-select-label"
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              color: "#666",
            }}
          >
            Chọn nhanh:
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 20].map((qty) => (
              <button
                key={qty}
                className="quick-select-button"
                onClick={() => {
                  setQuantity(qty);
                  setError("");
                }}
                style={{
                  padding: "6px 12px",
                  border:
                    quantity === qty
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                  borderRadius: "6px",
                  background: quantity === qty ? "#e6f7ff" : "white",
                  color: quantity === qty ? "#1890ff" : "#666",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (quantity !== qty) {
                    e.currentTarget.style.borderColor = "#1890ff";
                    e.currentTarget.style.color = "#1890ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (quantity !== qty) {
                    e.currentTarget.style.borderColor = "#d9d9d9";
                    e.currentTarget.style.color = "#666";
                  }
                }}
              >
                {qty}kg
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className="cancel-button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              background: "white",
              color: "#666",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1890ff";
              e.currentTarget.style.color = "#1890ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#d9d9d9";
              e.currentTarget.style.color = "#666";
            }}
          >
            Hủy
          </button>
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={!!error || quantity <= 0}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: error || quantity <= 0 ? "#d9d9d9" : "#1890ff",
              color: "white",
              cursor: error || quantity <= 0 ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!error && quantity > 0) {
                e.currentTarget.style.background = "#40a9ff";
              }
            }}
            onMouseLeave={(e) => {
              if (!error && quantity > 0) {
                e.currentTarget.style.background = "#1890ff";
              }
            }}
          >
            🖨️ In tem
          </button>
        </div>
      </div>
    </div>
  );
};
