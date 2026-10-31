import { defineField, defineType } from "sanity";
import { slugify } from "../slugify";

const ICONS = [
  { title: "Квітка", value: "flower" },
  { title: "Гори / пейзаж", value: "mountain" },
  { title: "Будиночок", value: "home" },
  { title: "Лапка (тварини)", value: "paw" },
  { title: "Серце", value: "heart" },
  { title: "Сонце", value: "sun" },
  { title: "Листочок", value: "leafbtn" },
];

/** A tag. Create, rename or delete them here — the filters on the site follow automatically. */
export const topic = defineType({
  name: "topic",
  title: "Тема (тег)",
  type: "document",
  icon: () => "🏷️",
  fields: [
    defineField({ name: "title", title: "Назва", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      title: "Для чого цей тег",
      type: "string",
      options: { list: [{ title: "Для малюнків", value: "painting" }, { title: "Для віршів і щоденника", value: "poem" }], layout: "radio" },
      initialValue: "painting",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Значок на кнопці (тільки для малюнків)",
      type: "string",
      options: { list: ICONS },
      hidden: ({ document }) => document?.kind !== "painting",
    }),
    defineField({
      name: "slug",
      title: "Адреса",
      description: "Натисніть «Згенерувати».",
      type: "slug",
      options: { source: "title.uk", slugify },
      validation: (r) => r.required().error("Натисніть «Згенерувати»"),
    }),
    defineField({ name: "order", title: "Порядок на сайті (менше — раніше)", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "За порядком", name: "byOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.uk", kind: "kind" },
    prepare: ({ title, kind }) => ({ title, subtitle: kind === "poem" ? "Вірші / щоденник" : "Малюнки" }),
  },
});
