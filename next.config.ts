import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tối ưu hóa cho Cloudflare Pages
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Tối ưu hóa bundle size
  experimental: {
    optimizeCss: true,
  },

  // Cấu hình webpack để giảm bundle size
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Tối ưu hóa cho production
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      };
    }
    return config;
  },

  // Tắt một số tính năng không cần thiết
  compress: false,
  poweredByHeader: false,
};

export default nextConfig;
