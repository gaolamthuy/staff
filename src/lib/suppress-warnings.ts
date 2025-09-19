/**
 * Warning Suppression Utility
 * Suppresses Antd React compatibility warnings
 */

// Run this as early as possible
if (typeof window !== "undefined") {
  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Comprehensive suppression function
  const shouldSuppressAntdWarning = (message: any) => {
    if (typeof message === "string") {
      return (
        (message.includes("antd") && message.includes("compatible")) ||
        message.includes("React is 16 ~ 18") ||
        message.includes("antd v5 support") ||
        message.includes("Warning: [antd: compatible]") ||
        message.includes("see https://u.ant.design/v5-for-19") ||
        message.includes("antd v5 support React is 16 ~ 18") ||
        message.includes("antd: compatible")
      );
    }
    return false;
  };

  // Override console methods
  console.error = (...args) => {
    if (shouldSuppressAntdWarning(args[0])) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args) => {
    if (shouldSuppressAntdWarning(args[0])) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  // Also suppress warnings from specific modules
  const originalConsole = console;

  // Override console.error with Object.defineProperty
  Object.defineProperty(console, "error", {
    value: (...args: any[]) => {
      if (shouldSuppressAntdWarning(args[0])) {
        return;
      }
      originalConsole.error.apply(console, args);
    },
    writable: true,
    configurable: true,
  });

  // Override console.warn with Object.defineProperty
  Object.defineProperty(console, "warn", {
    value: (...args: any[]) => {
      if (shouldSuppressAntdWarning(args[0])) {
        return;
      }
      originalConsole.warn.apply(console, args);
    },
    writable: true,
    configurable: true,
  });

  // Override the global warning function
  try {
    (window as any).warning = (...args: any[]) => {
      const message = args[0];
      if (typeof message === "string" && shouldSuppressAntdWarning(message)) {
        return;
      }
      // Don't call original warning to avoid the warning
    };
  } catch (e) {
    // Ignore errors
  }
}
