import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * Transparency documents are NOT blocked here on purpose: crawlers must be able to read
 * their "noindex" header/meta tag, otherwise a blocked URL can still appear in search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio", "/api/order", "/api/revalidate"] }],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
