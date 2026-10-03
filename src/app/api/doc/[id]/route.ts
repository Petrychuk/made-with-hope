import { sanityEnabled } from "@/sanity/env";
import { sanityFetch } from "@/sanity/client";

/**
 * Opens a «Прозорість» document (PDF or photo) through the site instead of a direct Sanity CDN link:
 * - X-Robots-Tag: noindex → Google & co. do not index or cache the file
 * - neutral file name → the original name (which may contain the child's name) is never shown
 * - only published transparency documents can be opened; drafts and other files → 404
 */
const query = `*[_type == "transparencyDoc" && _id == $id][0]{
  "url": coalesce(file.asset->url, image.asset->url),
  "mime": coalesce(file.asset->mimeType, image.asset->mimeType)
}`;

const EXT: Record<string, string> = { "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

const notFound = () =>
  new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow" } });

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!sanityEnabled || !/^[\w-]{1,100}$/.test(id)) return notFound(); // also rejects "drafts.*"

  const doc = await sanityFetch<{ url?: string; mime?: string } | null>(query, { id });
  if (!doc?.url) return notFound();

  const upstream = await fetch(doc.url, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) return new Response("Upstream error", { status: 502 });

  const mime = doc.mime ?? upstream.headers.get("content-type") ?? "application/pdf";
  return new Response(upstream.body, {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": `inline; filename="document.${EXT[mime] ?? "pdf"}"`,
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
