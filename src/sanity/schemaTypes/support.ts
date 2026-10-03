import { defineField, defineType } from "sanity";

/** Single document (id "support"): fundraising progress + Monobank jar. */
export const support = defineType({
  name: "support",
  title: "Підтримка",
  type: "document",
  icon: () => "💰",
  fields: [
    defineField({ name: "raised", title: "Зібрано, грн", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "goal", title: "Мета, грн", type: "number", validation: (r) => r.required().min(1) }),
    defineField({
      name: "updated",
      title: "Дата оновлення",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "monobankUrl",
      title: "Посилання на банку Monobank",
      type: "url",
      validation: (r) => r.required().uri({ scheme: ["https"] }),
    }),
  ],
  preview: {
    select: { raised: "raised", goal: "goal" },
    prepare: ({ raised, goal }) => ({ title: "Підтримка родини", subtitle: `${raised ?? 0} з ${goal ?? 0} грн` }),
  },
});
