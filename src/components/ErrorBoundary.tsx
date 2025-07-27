/**
 * Error Boundary Component
 * Xử lý runtime errors và hiển thị fallback UI
 */

"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

/**
 * Default Fallback Component
 */
const DefaultFallback: React.FC<{
  error: Error;
  resetError: () => void;
}> = ({ error, resetError }) => {
  return (
    <div
      style={{
        padding: "24px",
        textAlign: "center",
        background: "#fff2f0",
        border: "1px solid #ffccc7",
        borderRadius: "8px",
        margin: "16px",
      }}
    >
      <h2 style={{ color: "#cf1322", marginBottom: "16px" }}>Đã xảy ra lỗi</h2>
      <p style={{ color: "#666", marginBottom: "16px" }}>
        {error.message || "Có lỗi không mong muốn xảy ra"}
      </p>
      <button
        onClick={resetError}
        style={{
          padding: "8px 16px",
          background: "#1890ff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Thử lại
      </button>
    </div>
  );
};

/**
 * Error Boundary Class Component
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Hook để throw errors từ functional components
 */
export function useErrorHandler() {
  return React.useCallback((error: Error) => {
    throw error;
  }, []);
}
