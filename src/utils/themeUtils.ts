/**
 * Theme Utilities
 * Utility functions cho theme management
 */

export type Theme = "light" | "dark";

/**
 * Apply theme to document with proper cleanup
 * @param theme - Theme to apply
 */
export const applyThemeToDocument = (theme: Theme): void => {
  // Remove all existing theme classes
  document.documentElement.classList.remove("dark-mode");
  document.body.classList.remove("dark-mode");

  // Apply new theme
  if (theme === "dark") {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
  }

  // Force reflow to ensure styles are applied
  document.body.offsetHeight;

  // Dispatch custom event for components to listen
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
};

/**
 * Get initial theme from localStorage and system preference
 * @returns Initial theme
 */
export const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  try {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Priority: localStorage > system preference > light
    return savedTheme || (prefersDark ? "dark" : "light");
  } catch (error) {
    console.warn("Failed to get initial theme:", error);
    return "light";
  }
};

/**
 * Save theme to localStorage
 * @param theme - Theme to save
 */
export const saveThemeToStorage = (theme: Theme): void => {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
};

/**
 * Force re-render of all components
 * This can be used when theme changes to ensure all components update
 */
export const forceThemeUpdate = (): void => {
  // Force a reflow
  document.body.offsetHeight;

  // Dispatch theme change event
  window.dispatchEvent(new CustomEvent("themechange"));
};
