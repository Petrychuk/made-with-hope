/** Fallback values — with Sanity connected, Galyna edits fundraising in Studio → «Підтримка». */
export const site = {
  monobankUrl: "https://send.monobank.ua/", // TODO: real jar link
  fundraising: {
    raised: 37450,
    goal: 130000,
    updated: "2026-10-01",
  },
  /** Owner named in the legal texts (Privacy Policy etc.). TODO: confirm the full name with Galyna. */
  owner: { uk: "Галина Герасименко", en: "Galyna Herasymenko" },
  /** Defaults; Studio → «Головна сторінка» → Контакти overrides them. Empty = icon/link hidden. */
  contacts: {
    telegram: "", // public Telegram contact — optional (the order bot works without it)
    instagram: "https://www.instagram.com/gagemoniya_painting_decor_poem",
    facebook: "https://www.facebook.com/galina.gerasimenko.301652",
    email: "",
  },
};
