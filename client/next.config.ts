import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve images as AVIF → WebP → original, auto-sized — dramatically reduces image payload
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Gzip / Brotli compress all responses
  compress: true,

  // Inline critical CSS to eliminate render-blocking stylesheets
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
