import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getPosts, getProducts } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

/**
 * /sitemap.xml — landing, handmade, journal (+ every product and post) in UA and EN.
 * Transparency documents are intentionally left out (noindex).
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);
  const entry = (path: string, opts: { lastModified?: string; priority?: number } = {}) =>
    locales.map((l) => ({
      url: `${siteUrl}/${l}${path}`,
      lastModified: opts.lastModified ? new Date(opts.lastModified) : new Date(),
      priority: opts.priority,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x === "uk" ? "uk-UA" : "en", `${siteUrl}/${x}${path}`])) },
    }));

  return [
    ...entry("", { priority: 1 }),
    ...entry("/handmade", { priority: 0.8 }),
    ...entry("/journal", { priority: 0.8 }),
    ...products.flatMap((p) => entry(`/handmade/${p.slug}`, { priority: 0.6 })),
    ...posts.flatMap((p) => entry(`/journal/${p.slug}`, { lastModified: p.date, priority: 0.6 })),
    ...entry("/privacy", { priority: 0.2 }),
  ];
}
