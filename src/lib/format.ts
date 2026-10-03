import type { Locale } from "@/i18n/config";
import type { Dict, DictKey } from "@/i18n/dictionaries";
import type { PostCategory } from "@/content/types";

export function formatNumber(n: number, locale: Locale) {
  // Ukrainian style uses a regular space as thousands separator: 37 450
  return new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-US")
    .format(n)
    .replace(/\u00a0|\u202f/g, " ");
}

export function formatMoney(n: number, locale: Locale, d: Dict) {
  return `${formatNumber(n, locale)} ${d.currency}`;
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Kyiv",
  })
    .format(new Date(`${iso}T12:00:00Z`))
    .replace(" р.", "");
}

export function categoryLabel(d: Dict, c: PostCategory | "all") {
  return d[`cat.${c}` as DictKey];
}
