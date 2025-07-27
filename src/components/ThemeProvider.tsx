/**
 * Theme Provider Component
 * Quản lý light/dark theme cho toàn bộ ứng dụng
 */

"use client";

import React, { createContext, useContext, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider as NextThemeProvider } from "next-themes";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook để sử dụng theme context
 * @returns ThemeContextType - Context của theme
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component
 * @param children - React children components
 * @returns JSX.Element - Theme provider wrapper
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Toggle giữa light và dark mode
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Ant Design theme configuration
  const antdTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#1890ff",
      borderRadius: 8,
    },
    components: {
      Button: {
        borderRadius: 8,
        controlHeight: 40,
      },
      Card: {
        borderRadius: 12,
      },
      Input: {
        borderRadius: 8,
      },
    },
  };

  return (
    <NextThemeProvider attribute="class" defaultTheme="light">
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
      </ThemeContext.Provider>
    </NextThemeProvider>
  );
};
