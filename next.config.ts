import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dznmdwr4cuuzpmpy.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;
