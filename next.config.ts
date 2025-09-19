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
    
    // Fix chunk loading for static export
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      },
    };
    
    return config;
  },
};

export default nextConfig;
