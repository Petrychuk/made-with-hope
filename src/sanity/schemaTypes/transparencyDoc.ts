import { defineField, defineType } from "sanity";

export const transparencyDoc = defineType({
  name: "transparencyDoc",
  title: "Документ / звіт",
  type: "document",
  icon: () => "📄",
  description: "Перед завантаженням приховайте номери документів, адресу та інші особисті дані.",
  fields: [
    defineField({ name: "title", title: "Назва", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      title: "Тип",
      type: "string",
      options: { list: [{ title: "Звіт про витрати", value: "report" }, { title: "Медичний документ", value: "document" }], layout: "radio" },
      initialValue: "report",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "file",
      title: "Файл (PDF)",
      description: "⚠️ Перевірте, що особисті дані приховані.",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({ name: "image", title: "…або фото документа", type: "image" }),
    defineField({
      name: "date",
      title: "Дата",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title.uk", subtitle: "date", media: "image" } },
});
