import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/py/:path*',
        destination: process.env.BACKEND_URL || 'http://102.22.14.237:8010/:path*',
      },
    ]
  },
};

export default nextConfig;
