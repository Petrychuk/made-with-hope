import type { ImageLoaderProps } from "next/image";

/**
 * Photos from Sanity are already resized & compressed by Sanity's own image CDN (global, cached), so the browser
 * loads them from there directly instead of going through our small server (which would download, re-encode
 * and cache every size itself). Anything else (local files in /public, bundled images) keeps the Next.js optimizer.
 */
export const isSanityUrl = (src: string) => src.startsWith("https://cdn.sanity.io/");

export function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!isSanityUrl(src)) return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  const u = new URL(src);
  u.searchParams.set("w", String(width));
  u.searchParams.set("fit", "max");
  u.searchParams.set("q", String(quality || 75));
  if (!u.searchParams.has("fm")) u.searchParams.set("fm", "webp");
  return u.toString();
}
