import { defineField, defineType } from "sanity";

export const PAINTING_CATEGORIES = [
  { title: "Квіти", value: "flowers" },
  { title: "Пейзажі", value: "landscapes" },
  { title: "Мій дім", value: "home" },
  { title: "Тварини", value: "animals" },
  { title: "Натхнення", value: "inspiration" },
  { title: "Різне", value: "other" },
];

/** Gallery «Мої малюнки» — the home page shows a random selection of these. */
export const painting = defineType({
  name: "painting",
  title: "Малюнок",
  type: "document",
  icon: () => "🎨",
  fields: [
    defineField({
      name: "image",
      title: "Фото малюнка",
      description: "Натисніть «Hotspot», щоб вибрати головну частину — вона не буде обрізана на маленьких картках.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Що намальовано (необов'язково)", type: "string" })],
      validation: (r) => r.required().error("Додайте фото"),
    }),
    defineField({ name: "title", title: "Назва", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "technique", title: "Техніка", description: "Наприклад: Акварель", type: "localeString" }),
    defineField({ name: "year", title: "Рік", type: "number", validation: (r) => r.integer().min(1950).max(2100) }),
    defineField({
      name: "category",
      title: "Розділ",
      type: "string",
      options: { list: PAINTING_CATEGORIES },
      initialValue: "other",
      validation: (r) => r.required(),
    }),
    defineField({ name: "show", title: "Показувати на сайті", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title.uk", media: "image", technique: "technique.uk", year: "year" },
    prepare: ({ title, media, technique, year }) => ({
      title, media, subtitle: [technique, year].filter(Boolean).join(" · "),
    }),
  },
});
