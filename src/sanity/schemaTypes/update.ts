import { defineField, defineType } from "sanity";

/** «Приклади ваших добрих справ» on the home page: what the support made possible. */
export const update = defineType({
  name: "update",
  title: "Оновлення",
  type: "document",
  icon: () => "❤️",
  fields: [
    defineField({ name: "title", title: "Що вдалося", description: "Наприклад: «Реабілітація», «Нове крісло»", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Фото", type: "image" }),
    defineField({
      name: "date",
      title: "Дата",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title.uk", media: "image", subtitle: "date" } },
});
