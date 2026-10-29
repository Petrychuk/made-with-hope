import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** canonical + hreflang alternates + Open Graph for a path without the locale prefix ("" | "/journal" ...). */
export function pageMeta(locale: Locale, path: string, title: string, description: string): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l === "uk" ? "uk-UA" : "en", `/${l}${path}`]));
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/uk${path}` } },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      siteName: "Home Made Galyna",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "website",
      // link preview in Telegram / Viber / Facebook: Galyna & son (public/og.jpg, 1200×630)
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Home Made Galyna" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}
