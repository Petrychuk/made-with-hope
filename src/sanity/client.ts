import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityEnabled } from "./env";

const client = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published", stega: false })
  : null;

/** Cache tag used by /api/revalidate: publishing in Studio refreshes the site at once. */
export const SANITY_TAG = "sanity";

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!client) throw new Error("Sanity is not configured");
  return client.fetch<T>(query, params, {
    // fallback refresh every 5 min even if the webhook is not set up yet
    next: { revalidate: 300, tags: [SANITY_TAG] },
  });
}

/**
 * If Sanity is unreachable (network, outage, quota), the site keeps working:
 * lists come back empty / single documents null → pages show their default texts and placeholders.
 */
export function onSanityError<T>(fallback: T) {
  return (err: unknown): T => {
    console.error("[sanity] fetch failed, using fallback:", err instanceof Error ? err.message : err);
    return fallback;
  };
}
