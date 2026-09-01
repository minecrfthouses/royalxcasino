import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};
export default nextConfig;

