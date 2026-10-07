/**
 * Single place where pages get their content.
 * Sanity connected (NEXT_PUBLIC_SANITY_PROJECT_ID set) → data from Studio.
 * Not connected → demo content from src/content (the site still works locally).
 */
import { cache } from "react";
import type { Localized } from "@/i18n/config";
import type {
  ImageRef, Post, PostCategory, Product, ProductStatus, Support, Tone, TransparencyItem, Update,
} from "@/content/types";
import { localProducts } from "@/content/products";
import { localPosts } from "@/content/posts";
import { localUpdates } from "@/content/home";
import { site } from "@/content/site";
import { sanityEnabled } from "@/sanity/env";
import { onSanityError, sanityFetch } from "@/sanity/client";
import {
  postQuery, postsQuery, productQuery, productsQuery, supportQuery, transparencyQuery, updatesQuery,
} from "@/sanity/queries";

const TONES: Tone[] = ["pink", "sand", "sage", "peach", "sun", "blue"];
const tone = (i: number) => TONES[i % TONES.length];

/** Photos from Sanity are requested already resized & compressed (phones upload 3–8 MB originals). */
export function sanityImage(raw?: Partial<ImageRef> | null, max = 1600): ImageRef | undefined {
  if (!raw?.url) return undefined;
  return { ...raw, url: `${raw.url}?w=${max}&fit=max&q=82&fm=webp` } as ImageRef;
}

const loc = (v?: Partial<Localized> | null): Localized => ({ uk: v?.uk ?? "", en: v?.en || undefined });

function firstLine(text?: string) {
  if (!text) return "";
  const line = text.split("\n").find((l) => l.trim()) ?? "";
  return line.length > 90 ? `${line.slice(0, 88).trimEnd()}…` : `${line}…`;
}

/* ---------------- products ---------------- */
type RawProduct = {
  slug: string; name?: Localized; description?: Localized; price?: number | null;
  status?: ProductStatus; featured?: boolean | null; images?: Partial<ImageRef>[] | null;
};
const mapProduct = (p: RawProduct, i: number): Product => ({
  slug: p.slug,
  tone: tone(i),
  name: loc(p.name),
  description: loc(p.description),
  price: p.price ?? undefined,
  status: p.status ?? "available",
  featured: p.featured ?? true,
  images: (p.images ?? []).map((x) => sanityImage(x)).filter((x): x is ImageRef => Boolean(x)).slice(0, 5),
});

export const getProducts = cache(async (): Promise<Product[]> => {
  if (!sanityEnabled) return localProducts;
  const rows = await sanityFetch<RawProduct[]>(productsQuery).catch(onSanityError([]));
  return rows.map(mapProduct);
});

export const getProduct = cache(async (slug: string): Promise<Product | null> => {
  if (!sanityEnabled) return localProducts.find((p) => p.slug === slug) ?? null;
  const row = await sanityFetch<RawProduct | null>(productQuery, { slug }).catch(onSanityError(null));
  return row ? mapProduct(row, 0) : null;
});

/* ---------------- journal ---------------- */
type RawPost = {
  slug: string; category?: PostCategory; date: string; title?: Localized; excerpt?: Localized; body?: Localized;
  image?: Partial<ImageRef> | null;
};
const mapPost = (p: RawPost, i: number): Post => {
  const body = loc(p.body);
  return {
    slug: p.slug,
    category: p.category ?? "thoughts",
    date: p.date,
    tone: tone(i + 3),
    title: loc(p.title),
    body,
    excerpt: {
      uk: p.excerpt?.uk || firstLine(body.uk),
      en: p.excerpt?.en || (body.en ? firstLine(body.en) : undefined),
    },
    image: sanityImage(p.image, 1400),
  };
};

export const getPosts = cache(async (): Promise<Post[]> => {
  if (!sanityEnabled) return [...localPosts].sort((a, b) => b.date.localeCompare(a.date));
  const rows = await sanityFetch<RawPost[]>(postsQuery).catch(onSanityError([]));
  return rows.map(mapPost);
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!sanityEnabled) return localPosts.find((p) => p.slug === slug) ?? null;
  const row = await sanityFetch<RawPost | null>(postQuery, { slug }).catch(onSanityError(null));
  return row ? mapPost(row, 0) : null;
});

/* ---------------- updates / support / transparency ---------------- */
export const getUpdates = cache(async (): Promise<Update[]> => {
  if (!sanityEnabled) return localUpdates;
  const rows = await sanityFetch<{ id: string; date: string; title?: Localized; image?: Partial<ImageRef> }[]>(updatesQuery).catch(onSanityError([]));
  return rows.map((u, i) => ({ id: u.id, date: u.date, title: loc(u.title), image: sanityImage(u.image, 800), tone: tone(i + 5) }));
});

export const getSupport = cache(async (): Promise<Support> => {
  const fallback: Support = { ...site.fundraising, monobankUrl: site.monobankUrl };
  if (!sanityEnabled) return fallback;
  const row = await sanityFetch<Partial<Support> | null>(supportQuery).catch(onSanityError(null));
  return { ...fallback, ...Object.fromEntries(Object.entries(row ?? {}).filter(([, v]) => v != null)) };
});

export const getTransparency = cache(async (): Promise<TransparencyItem[]> => {
  if (!sanityEnabled) return [];
  const rows = await sanityFetch<(Omit<TransparencyItem, "title"> & { title?: Localized })[]>(transparencyQuery).catch(onSanityError([]));
  return rows.map((r) => ({ ...r, title: loc(r.title), hasFile: Boolean(r.hasFile) }));
});
