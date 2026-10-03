import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // photos Galyna uploads in Sanity Studio
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
  poweredByHeader: false,
  // The project root is this folder, even if there is another package-lock.json higher up
  // (e.g. C:\Users\<name>\package-lock.json). Removes the "multiple lockfiles" warning.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
