/**
 * Home page texts, photos and contacts.
 * Studio → «Головна сторінка» when Sanity is connected; any empty field falls back to the default
 * text from the dictionaries / src/content, so the page never shows holes.
 */
import { cache } from "react";
import type { Locale, Localized } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { ImageRef } from "@/content/types";
import { faq as localFaq, kindMessages as localMessages } from "@/content/home";
import { site } from "@/content/site";
import { sanityEnabled } from "@/sanity/env";
import { sanityFetch } from "@/sanity/client";
import { homeQuery } from "@/sanity/queries";
import { sanityImage } from "./content";
import heroDefault from "@/assets/hero/galyna-and-son.webp";

type L = Partial<Localized> | null | undefined;
type RawImage = Partial<ImageRef> | null | undefined;

type RawHome = {
  heroSubtitle?: L; heroDescription?: L; heroNote?: L; heroImage?: RawImage;
  sonShow?: boolean | null; sonName?: L; sonIntro?: L; sonLikes?: L[] | null; sonDream?: L;
  sonPhoto?: RawImage; sonPhoto2?: RawImage;
  storyText?: L; storyImage?: RawImage; polaroidImage?: RawImage; polaroidCaption?: L;
  kindImage?: RawImage; kindNote?: L; messages?: { text?: L; author?: string }[] | null;
  faq?: { question?: L; answer?: L }[] | null; quote?: L;
  craftImage?: RawImage; supportImage?: RawImage;
  telegramUrl?: string; instagramUrl?: string; facebookUrl?: string; email?: string;
};

export type Contacts = { telegram?: string; instagram?: string; facebook?: string; email: string };

export type HomeContent = {
  heroLines: string[]; heroDesc: string; heroNote: string; heroImage?: ImageRef;
  son: {
    show: boolean; title: string; paragraphs: string[]; likes: string[]; dream: string;
    photo?: ImageRef; photo2?: ImageRef;
  };
  storyParagraphs: string[]; storyImage?: ImageRef; polaroidImage?: ImageRef; polaroidCaption: string;
  kindImage?: ImageRef; kindNote: string; messages: { text: string; by: string }[];
  faq: { q: string; a: string }[]; quote: string;
  craftImage?: ImageRef; supportImage?: ImageRef;
  contacts: Contacts;
};

export const getHomeRaw = cache(async (): Promise<RawHome | null> => {
  if (!sanityEnabled) return null;
  return sanityFetch<RawHome | null>(homeQuery);
});

/** text for this language → Ukrainian original → default */
function t(v: L, locale: Locale, fallback: string) {
  const own = v?.[locale]?.trim();
  if (own) return own;
  return v?.uk?.trim() || fallback;
}

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const paragraphs = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export async function getHome(locale: Locale, d: Dict): Promise<HomeContent> {
  const r = (await getHomeRaw()) ?? {};

  const messages = (r.messages ?? []).filter((m) => m.text?.uk);
  const faq = (r.faq ?? []).filter((f) => f.question?.uk && f.answer?.uk);

  return {
    heroLines: lines(t(r.heroSubtitle, locale, [d["hero.l1"], d["hero.l2"], d["hero.l3"]].join("\n"))),
    heroDesc: t(r.heroDescription, locale, d["hero.desc"]),
    heroNote: t(r.heroNote, locale, d["note.hero"]),
    // photo from Studio → else the family photo shipped with the site
    heroImage: sanityImage(r.heroImage, 2000) ?? {
      url: heroDefault.src,
      width: heroDefault.width,
      height: heroDefault.height,
      lqip: heroDefault.blurDataURL,
      alt: d["hero.alt"],
    },

    son: {
      show: r.sonShow !== false,
      title: (() => {
        const name = t(r.sonName, locale, "");
        return name ? `${d["son.title"]} ${name}` : d["son.title"];
      })(),
      paragraphs: paragraphs(t(r.sonIntro, locale, d["son.intro"])),
      likes: (r.sonLikes ?? []).filter((l) => l?.uk).length
        ? (r.sonLikes ?? []).filter((l) => l?.uk).map((l) => t(l, locale, ""))
        : [d["son.like1"], d["son.like2"], d["son.like3"], d["son.like4"], d["son.like5"]],
      dream: t(r.sonDream, locale, d["son.dreamText"]),
      photo: sanityImage(r.sonPhoto, 1000),
      photo2: sanityImage(r.sonPhoto2, 600),
    },
    storyParagraphs: paragraphs(t(r.storyText, locale, `${d["st.p1"]}\n\n${d["st.p2"]}`)),
    storyImage: sanityImage(r.storyImage, 1000),
    polaroidImage: sanityImage(r.polaroidImage, 600),
    polaroidCaption: t(r.polaroidCaption, locale, d["note.story"]),

    kindImage: sanityImage(r.kindImage, 1400),
    kindNote: t(r.kindNote, locale, d["note.kw"]),
    messages: messages.length
      ? messages.map((m) => ({ text: t(m.text, locale, ""), by: m.author ?? "" }))
      : localMessages.map((m) => ({ text: t(m.text, locale, ""), by: m.by })),

    faq: faq.length
      ? faq.map((f) => ({ q: t(f.question, locale, ""), a: t(f.answer, locale, "") }))
      : localFaq.map((f) => ({ q: t(f.q, locale, ""), a: t(f.a, locale, "") })),
    quote: t(r.quote, locale, d["quote.text"]),

    craftImage: sanityImage(r.craftImage, 1000),
    supportImage: sanityImage(r.supportImage, 1000),

    contacts: sanityEnabled && r !== null && Object.keys(r).length
      ? {
          telegram: r.telegramUrl || site.contacts.telegram,
          instagram: r.instagramUrl || undefined,
          facebook: r.facebookUrl || undefined,
          email: r.email || site.contacts.email,
        }
      : { ...site.contacts },
  };
}
