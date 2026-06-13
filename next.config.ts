import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/oracle-cards', destination: '/the-quiet-cards', permanent: true },
    ]
  },
};

export default nextConfig;
