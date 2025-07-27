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
};

export default nextConfig;
