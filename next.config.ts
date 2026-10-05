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
  // Temporary / preview domain: SITE_NOINDEX=1 keeps the whole site out of Google until launch
  async headers() {
    if (process.env.SITE_NOINDEX !== "1") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
