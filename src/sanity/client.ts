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
