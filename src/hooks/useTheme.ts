/**
 * Custom Hook for Theme Management
 * Hook quản lý theme với localStorage persistence
 */

import { useState, useEffect, useCallback } from "react";
import {
  applyThemeToDocument,
  getInitialTheme,
  saveThemeToStorage,
  forceThemeUpdate,
  type Theme,
} from "@/utils/themeUtils";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    setIsLoaded(true);

    // Apply theme to document
    applyThemeToDocument(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Save to localStorage
    saveThemeToStorage(newTheme);

    // Apply theme with proper cleanup
    applyThemeToDocument(newTheme);

    // Force update to ensure all components re-render
    setTimeout(() => {
      forceThemeUpdate();
    }, 0);
  }, [theme]);

  const setThemeMode = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    saveThemeToStorage(newTheme);

    // Apply theme with proper cleanup
    applyThemeToDocument(newTheme);

    // Force update to ensure all components re-render
    setTimeout(() => {
      forceThemeUpdate();
    }, 0);
  }, []);

  return {
    theme,
    isDarkMode: theme === "dark",
    isLoaded,
    toggleTheme,
    setThemeMode,
  };
};
