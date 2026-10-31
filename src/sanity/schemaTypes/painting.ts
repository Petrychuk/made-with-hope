import { defineField, defineType } from "sanity";

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
      name: "topics",
      title: "Теми (теги)",
      description: "Можна кілька. Нові теми створюються в розділі «Теми» зліва.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "topic" }], options: { filter: 'kind == "painting"' } }],
    }),
    defineField({
      name: "forSale",
      title: "Показувати кнопку «Мене цікавить»",
      description: "Відвідувач надішле запит про цю картину (він прийде в Telegram). Вимкніть, якщо картина не продається.",
      type: "boolean",
      initialValue: true,
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
