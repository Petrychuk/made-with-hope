import { defineField, defineType } from "sanity";
import { slugify } from "../slugify";

const CATEGORIES = [
  { title: "Вірш", value: "poetry" },
  { title: "Думки", value: "thoughts" },
  { title: "Наше життя", value: "life" },
  { title: "Творчість", value: "craft" },
  { title: "Новини", value: "news" },
];

export const post = defineType({
  name: "post",
  title: "Запис щоденника",
  type: "document",
  icon: () => "📝",
  fields: [
    defineField({ name: "title", title: "Назва", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Категорія",
      type: "string",
      options: { list: CATEGORIES, layout: "dropdown" },
      initialValue: "poetry",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Теми (теги) — необов'язково",
      description: "Наприклад: «Про осінь», «Про маму». Нові теми створюються в розділі «Теми» зліва.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "topic" }], options: { filter: 'kind == "poem"' } }],
    }),
    defineField({ name: "image", title: "Фото", type: "image", fields: [defineField({ name: "alt", title: "Що на фото (необов'язково)", type: "string" })] }),
    defineField({ name: "body", title: "Текст", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "date",
      title: "Дата",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Адреса сторінки",
      description: "Натисніть «Згенерувати» — адреса з'явиться з назви.",
      type: "slug",
      options: { source: "title.uk", slugify },
      validation: (r) => r.required().error("Натисніть «Згенерувати»"),
    }),
    defineField({
      name: "excerpt",
      title: "Короткий опис для картки (необов'язково)",
      description: "Якщо порожньо — візьмемо перший рядок тексту.",
      type: "localeString",
    }),
  ],
  orderings: [{ title: "Спочатку нові", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title.uk", media: "image", category: "category", date: "date" },
    prepare: ({ title, media, category, date }) => ({
      title,
      media,
      subtitle: [CATEGORIES.find((c) => c.value === category)?.title, date?.split("-").reverse().join(".")]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
