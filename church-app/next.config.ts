import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore - Property 'turbopack' does not exist in type 'ExperimentalConfig' but is recommended by Next.js warning
    turbopack: {
      root: "./",
    },
  },
};

export default nextConfig;
