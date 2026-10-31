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
import { onSanityError, sanityFetch } from "@/sanity/client";
import { homeQuery } from "@/sanity/queries";
import { sanityImage } from "./content";
import type { StaticImageData } from "next/image";
import heroDefault from "@/assets/hero/galyna-and-son.webp";
// family photos shipped with the site — used until Galyna uploads her own in Studio
import imgWriting from "@/assets/home/galyna-writing.webp";
import imgCrafting from "@/assets/home/galyna-crafting.webp";
import imgTogetherHome from "@/assets/home/together-home.webp";
import imgTogetherLilac from "@/assets/home/together-lilac.webp";
import imgSonSmile from "@/assets/home/son-smile.webp";
import imgSonArtwork from "@/assets/home/son-artwork.webp";
import imgSonWriting from "@/assets/home/son-writing.webp";

/** Local (bundled) photo → ImageRef; `focus` keeps faces in frame on every screen size. */
const local = (img: StaticImageData, alt: string, focus: string): ImageRef => ({
  url: img.src, width: img.width, height: img.height, lqip: img.blurDataURL, alt, focus,
});

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

export type Contacts = { telegram?: string; instagram?: string; facebook?: string; email?: string };

export type HomeContent = {
  heroLines: string[]; heroDesc: string[]; heroNote: string; heroImage?: ImageRef;
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
  return sanityFetch<RawHome | null>(homeQuery).catch(onSanityError(null));
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
    heroLines: lines(t(r.heroSubtitle, locale, [d["hero.l1"], d["hero.l2"]].join("\n"))),
    heroDesc: paragraphs(t(r.heroDescription, locale, d["hero.desc"])),
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
      photo: sanityImage(r.sonPhoto, 1000) ?? local(imgSonArtwork, d["alt.sonArtwork"], "50% 30%"),
      photo2: sanityImage(r.sonPhoto2, 600) ?? local(imgSonWriting, d["alt.sonWriting"], "35% 45%"),
    },
    storyParagraphs: paragraphs(t(r.storyText, locale, `${d["st.p1"]}\n\n${d["st.p2"]}`)),
    storyImage: sanityImage(r.storyImage, 1000) ?? local(imgWriting, d["alt.writing"], "35% 22%"),
    polaroidImage: sanityImage(r.polaroidImage, 600) ?? local(imgTogetherHome, d["alt.together"], "50% 35%"),
    polaroidCaption: t(r.polaroidCaption, locale, d["note.story"]),

    kindImage: sanityImage(r.kindImage, 1400) ?? local(imgSonSmile, d["alt.sonSmile"], "42% 18%"),
    kindNote: t(r.kindNote, locale, d["note.kw"]),
    messages: messages.length
      ? messages.map((m) => ({ text: t(m.text, locale, ""), by: m.author ?? "" }))
      : localMessages.map((m) => ({ text: t(m.text, locale, ""), by: m.by })),

    faq: faq.length
      ? faq.map((f) => ({ q: t(f.question, locale, ""), a: t(f.answer, locale, "") }))
      : localFaq.map((f) => ({ q: t(f.q, locale, ""), a: t(f.a, locale, "") })),
    quote: t(r.quote, locale, d["quote.text"]),

    craftImage: sanityImage(r.craftImage, 1000) ?? local(imgCrafting, "", "50% 38%"),
    supportImage: sanityImage(r.supportImage, 1000) ?? local(imgTogetherLilac, "", "55% 35%"),

    contacts: sanityEnabled && r !== null && Object.keys(r).length
      ? {
          telegram: r.telegramUrl || site.contacts.telegram || undefined,
          instagram: r.instagramUrl || site.contacts.instagram || undefined,
          facebook: r.facebookUrl || site.contacts.facebook || undefined,
          email: r.email || site.contacts.email || undefined,
        }
      : {
          telegram: site.contacts.telegram || undefined,
          instagram: site.contacts.instagram || undefined,
          facebook: site.contacts.facebook || undefined,
          email: site.contacts.email || undefined,
        },
  };
}

/** How visitors can reach the family — used inside the legal texts. */
export function contactLine(c: Contacts, locale: Locale) {
  const parts = [
    c.email,
    c.facebook && "Facebook",
    c.instagram && "Instagram",
    c.telegram && "Telegram",
  ].filter(Boolean) as string[];
  if (!parts.length) return locale === "en" ? "via the social links at the bottom of the site" : "через соцмережі внизу сайту";
  const joined = parts.join(locale === "en" ? " or " : " або ");
  return locale === "en" ? `${joined} (links at the bottom of the site)` : `${joined} (посилання внизу сайту)`;
}
