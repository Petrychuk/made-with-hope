import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    // photos Galyna uploads in Sanity Studio
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
  poweredByHeader: false,
  // Crawlers and HTML validators get <title>/<meta>/<link> inside <head> (not streamed into <body>); normal visitors still get the fast streamed page.
  // = Next.js default bot list + the W3C validator
  htmlLimitedBots: /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|Validator\.nu|W3C/i,
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
