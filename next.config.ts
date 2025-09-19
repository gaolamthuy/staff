import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tối ưu hóa cho Cloudflare Pages
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Tắt một số tính năng không cần thiết
  compress: false,
  poweredByHeader: false,
  
  // Fix chunk loading issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
