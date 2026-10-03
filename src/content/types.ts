import type { Localized } from "@/i18n/config";

/** Placeholder colour while real photos are not uploaded yet. */
export type Tone = "peach" | "sand" | "sage" | "pink" | "sun" | "blue";

export type Product = {
  id: string;
  tone: Tone;
  image?: string; // e.g. "/images/handmade/bunny.webp" — when set, replaces the placeholder
  name: Localized;
  description: Localized;
  price?: number; // UAH, optional
  available: boolean; // false = made to order
  featured: boolean;
  published: boolean;
};

export type PostCategory = "poetry" | "thoughts" | "life" | "craft" | "news";

export type Post = {
  slug: string;
  category: PostCategory;
  date: string; // YYYY-MM-DD
  tone: Tone;
  image?: string;
  title: Localized;
  excerpt: Localized;
  /** Ukrainian original is always kept; `en` is a separate optional translation. */
  body: Localized;
  published: boolean;
};

export type Update = { tone: Tone; image?: string; date: string; title: Localized };
export type KindMessage = { text: Localized; by: string };
export type FaqItem = { q: Localized; a: Localized };
