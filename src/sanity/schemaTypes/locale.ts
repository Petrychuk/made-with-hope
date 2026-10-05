import { defineField, defineType } from "sanity";

/** Ukrainian is required (original), English is an optional translation. */
export const localeString = defineType({
  name: "localeString",
  title: "Текст UA / EN",
  type: "object",
  options: { columns: 1 },
  fields: [
    defineField({ name: "uk", title: "Українською", type: "string", validation: (r) => r.required().error("Заповніть українською") }),
    defineField({ name: "en", title: "English (необов'язково)", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Довгий текст UA / EN",
  type: "object",
  fields: [
    defineField({
      name: "uk",
      title: "Українською",
      type: "text",
      rows: 12,
      description: "Переноси рядків зберігаються — вірш на сайті виглядатиме так само, як тут.",
      validation: (r) => r.required().error("Заповніть українською"),
    }),
    defineField({
      name: "en",
      title: "English translation (необов'язково)",
      type: "text",
      rows: 12,
      description: "Якщо порожньо — на англійській версії покажемо оригінал українською.",
    }),
  ],
});

/** Short multi-line text (hero lines, answers, quotes) — no poem hint. */
export const localeTextShort = defineType({
  name: "localeTextShort",
  title: "Короткий текст UA / EN",
  type: "object",
  fields: [
    defineField({ name: "uk", title: "Українською", type: "text", rows: 3 }),
    defineField({
      name: "en",
      title: "English (необов'язково)",
      type: "text",
      rows: 3,
      description: "Якщо порожньо — на англійській версії покажемо текст українською.",
    }),
  ],
});
