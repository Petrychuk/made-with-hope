import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Single document (id "homePage"): texts and photos of the home page.
 * Every field is optional — if empty, the site shows the default text / placeholder.
 */
const photo = (name: string, title: string, description: string, group: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    group,
    fields: [defineField({ name: "alt", title: "Що на фото (для незрячих людей)", type: "string" })],
  });

export const homePage = defineType({
  name: "homePage",
  title: "Головна сторінка",
  type: "document",
  icon: () => "🏠",
  groups: [
    { name: "hero", title: "Головний екран", default: true },
    { name: "story", title: "Наша історія" },
    { name: "kind", title: "Добрі слова" },
    { name: "faq", title: "Питання і цитата" },
    { name: "photos", title: "Інші фото" },
    { name: "contacts", title: "Контакти" },
  ],
  fields: [
    // ---- hero
    photo("heroImage", "Головне фото", "Ви з сином. Горизонтальне фото — ліва частина ховається за текстом.", "hero"),
    defineField({
      name: "heroSubtitle",
      title: "Три рядки під назвою",
      description: "Кожен рядок — з нового рядка. Зараз: «Ручна робота з любов'ю. / Слова від серця. / Історія родини з надією.»",
      type: "localeTextShort",
      group: "hero",
    }),
    defineField({ name: "heroDescription", title: "Короткий опис", type: "localeTextShort", group: "hero" }),
    defineField({ name: "heroNote", title: "Напис на листочку біля фото", type: "localeString", group: "hero" }),

    // ---- story
    defineField({
      name: "storyText",
      title: "Текст «Наша історія»",
      description: "Абзаци розділяйте порожнім рядком.",
      type: "localeText",
      group: "story",
    }),
    photo("storyImage", "Фото до історії", "Ви за рукоділлям. Вертикальне фото.", "story"),
    photo("polaroidImage", "Фото на картці-полароїді", "Квадратне або близьке до квадрата. Видно тільки на комп'ютері.", "story"),
    defineField({ name: "polaroidCaption", title: "Підпис на полароїді", type: "localeString", group: "story" }),

    // ---- kind words
    photo("kindImage", "Фото в блоці «Добрі слова»", "Наприклад, усміхнений син.", "kind"),
    defineField({ name: "kindNote", title: "Напис на листочку", type: "localeString", group: "kind" }),
    defineField({
      name: "messages",
      title: "Повідомлення від людей",
      description: "Тільки з дозволу автора. Ім'я та місто, без прізвища.",
      type: "array",
      group: "kind",
      validation: (r) => r.max(10),
      of: [
        defineArrayMember({
          type: "object",
          name: "kindMessage",
          title: "Повідомлення",
          fields: [
            defineField({ name: "text", title: "Текст", type: "localeTextShort", validation: (r) => r.required() }),
            defineField({ name: "author", title: "Ім'я, місто", type: "string", description: "Наприклад: Олена, Київ" }),
          ],
          preview: { select: { title: "text.uk", subtitle: "author" } },
        }),
      ],
    }),

    // ---- faq + quote
    defineField({
      name: "faq",
      title: "Часті питання",
      type: "array",
      group: "faq",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "Питання",
          fields: [
            defineField({ name: "question", title: "Питання", type: "localeString", validation: (r) => r.required() }),
            defineField({ name: "answer", title: "Відповідь", type: "localeTextShort", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question.uk", subtitle: "answer.uk" } },
        }),
      ],
    }),
    defineField({ name: "quote", title: "Ваша цитата", type: "localeTextShort", group: "faq" }),

    // ---- other photos
    photo("craftImage", "Фото біля виробів", "Процес в'язання, клубки. Видно тільки на комп'ютері.", "photos"),
    photo("supportImage", "Фото біля збору", "Квіти або затишна деталь дому. Видно тільки на комп'ютері.", "photos"),

    // ---- contacts
    defineField({ name: "telegramUrl", title: "Telegram", description: "Посилання https://t.me/…", type: "url", group: "contacts" }),
    defineField({ name: "instagramUrl", title: "Instagram", description: "Якщо немає — залиште порожнім, іконка зникне.", type: "url", group: "contacts" }),
    defineField({ name: "facebookUrl", title: "Facebook", description: "Якщо немає — залиште порожнім, іконка зникне.", type: "url", group: "contacts" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contacts", validation: (r) => r.email() }),
  ],
  preview: { prepare: () => ({ title: "Головна сторінка" }) },
});
