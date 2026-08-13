import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
  async redirects() {
    return [
      { source: '/oracle-cards', destination: '/the-quiet-cards', permanent: true },
      { source: '/well-being-workshop', destination: '/retreats', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/services/ola/:path*', destination: '/services', permanent: true },
    ]
  },
};

export default nextConfig;
