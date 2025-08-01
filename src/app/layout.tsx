import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthRedirect } from "@/components/AuthRedirect";

// Suppress Ant Design React compatibility warning
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0]?.includes?.("antd: compatible") ||
      args[0]?.includes?.("React is 16 ~ 18")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gạo Lâm Thúy - Staff Portal",
  description:
    "Hệ thống quản lý sản phẩm và in tem Gạo Lâm Thúy - Staff Portal",
  keywords: "Gạo Lâm Thúy, Staff Portal, Quản lý sản phẩm, In tem",
  authors: [{ name: "Gạo Lâm Thúy" }],
  creator: "Gạo Lâm Thúy",
  publisher: "Gạo Lâm Thúy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gaolamthuy.vn"),
  openGraph: {
    title: "Gạo Lâm Thúy - Staff Portal",
    description: "Hệ thống quản lý sản phẩm và in tem Gạo Lâm Thúy",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary",
    title: "Gạo Lâm Thúy - Staff Portal",
    description: "Hệ thống quản lý sản phẩm và in tem Gạo Lâm Thúy",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', applyTheme);
                  } else {
                    applyTheme();
                  }
                  
                  function applyTheme() {
                    if (document.documentElement) {
                      document.documentElement.classList.remove('dark-mode');
                    }
                    if (document.body) {
                      document.body.classList.remove('dark-mode');
                    }
                    
                    var theme = localStorage.getItem('theme');
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var shouldUseDark = theme === 'dark' || (!theme && prefersDark);
                    
                    if (shouldUseDark) {
                      if (document.documentElement) {
                        document.documentElement.classList.add('dark-mode');
                      }
                      if (document.body) {
                        document.body.classList.add('dark-mode');
                      }
                    }
                  }
                } catch (e) {
                  // Silently fail
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <AuthProvider>
            <AuthRedirect />
            <Header />
            <main style={{ padding: "24px" }}>{children}</main>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
