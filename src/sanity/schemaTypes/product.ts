import { defineArrayMember, defineField, defineType } from "sanity";
import { slugify } from "../slugify";

const STATUS = [
  { title: "В наявності", value: "available" },
  { title: "На замовлення", value: "made_to_order" },
  { title: "Продано", value: "sold" },
];

export const product = defineType({
  name: "product",
  title: "Виріб",
  type: "document",
  icon: () => "🧶",
  fields: [
    defineField({
      name: "images",
      title: "Фото",
      description: "До 5 фото. Перше — обкладинка. Перетягуйте, щоб змінити порядок.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [defineField({ name: "alt", title: "Що на фото (необов'язково)", type: "string" })],
        }),
      ],
      options: { layout: "grid" },
      validation: (r) => [
        r.required().min(1).error("Додайте хоча б одне фото"),
        r.max(5).error("Максимум 5 фото — видаліть зайві"),
      ],
    }),
    defineField({ name: "name", title: "Назва", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Адреса сторінки",
      description: "Натисніть «Згенерувати» — адреса з'явиться з назви.",
      type: "slug",
      options: { source: "name.uk", slugify },
      validation: (r) => r.required().error("Натисніть «Згенерувати»"),
    }),
    defineField({ name: "description", title: "Опис", type: "localeText" }),
    defineField({ name: "price", title: "Ціна, грн", type: "number", validation: (r) => r.min(0) }),
    defineField({
      name: "status",
      title: "Статус",
      type: "string",
      options: { list: STATUS, layout: "radio" },
      initialValue: "available",
      validation: (r) => r.required(),
    }),
    // home page now shows 4 random products — the flag is kept for old documents but hidden
    defineField({ name: "featured", title: "Показувати на головній", type: "boolean", initialValue: true, hidden: true }),
  ],
  preview: {
    select: { title: "name.uk", media: "images.0", status: "status", price: "price" },
    prepare: ({ title, media, status, price }) => ({
      title,
      media,
      subtitle: [STATUS.find((s) => s.value === status)?.title, price != null ? `${price} грн` : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
