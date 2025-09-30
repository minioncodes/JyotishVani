import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", 
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", 
      },
      {
        protocol: "https",
        hostname: "randomuser.me", 
      },
    ],
  },
};

export default nextConfig;
