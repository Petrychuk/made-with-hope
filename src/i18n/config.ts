export const locales = ["uk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Text stored in both languages. `en` may be empty while a translation is pending. */
export type Localized = { uk: string; en?: string };

export function pick(text: Localized, locale: Locale): string {
  return (locale === "en" && text.en) || text.uk;
}
