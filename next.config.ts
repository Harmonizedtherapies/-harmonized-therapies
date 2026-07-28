import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/oracle-cards', destination: '/the-quiet-cards', permanent: true },
      { source: '/well-being-workshop', destination: '/retreats', permanent: true },
    ]
  },
};

export default nextConfig;
