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
        destination: process.env.BACKEND_URL || 'https://intel-africa-backend-999275183993.us-central1.run.app/:path*',
      },
    ]
  },
};

export default nextConfig;
