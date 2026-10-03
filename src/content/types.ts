import type { Localized } from "@/i18n/config";

/** Placeholder colour while real photos are not uploaded yet. */
export type Tone = "peach" | "sand" | "sage" | "pink" | "sun" | "blue";

/** A photo from Sanity (cdn.sanity.io) or a local file in /public. */
export type ImageRef = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  /** tiny blurred preview (data URL) shown while the photo loads */
  lqip?: string;
};

export type ProductStatus = "available" | "made_to_order" | "sold";

export type Product = {
  slug: string; // also used as id in order requests
  tone: Tone;
  images: ImageRef[]; // up to 5, first one is the cover
  name: Localized;
  description: Localized;
  price?: number; // UAH, optional
  status: ProductStatus;
  featured: boolean; // show on the home page
};

export type PostCategory = "poetry" | "thoughts" | "life" | "craft" | "news";

export type Post = {
  slug: string;
  category: PostCategory;
  date: string; // YYYY-MM-DD
  tone: Tone;
  image?: ImageRef;
  title: Localized;
  excerpt: Localized;
  /** Ukrainian original is always kept; `en` is a separate optional translation. */
  body: Localized;
};

export type Update = { id: string; tone: Tone; image?: ImageRef; date: string; title: Localized };

export type Support = { raised: number; goal: number; updated: string; monobankUrl: string };

export type TransparencyKind = "report" | "document";
export type TransparencyItem = {
  id: string;
  kind: TransparencyKind;
  title: Localized;
  date: string;
  fileUrl?: string;
};

export type KindMessage = { text: Localized; by: string };
export type FaqItem = { q: Localized; a: Localized };
