import type { FaqItem, KindMessage, Update } from "./types";

export const localUpdates: Update[] = [
  { id: "u1", tone: "blue", date: "2026-09-25", title: { uk: "Медичні засоби", en: "Medical supplies" } },
  { id: "u2", tone: "sage", date: "2026-09-10", title: { uk: "Реабілітація", en: "Rehabilitation" } },
  { id: "u3", tone: "sand", date: "2026-08-30", title: { uk: "Побутові потреби", en: "Household needs" } },
];

/** Only first names / initials — no full names without permission. */
export const kindMessages: KindMessage[] = [
  { text: { uk: "Ваша історія дуже торкнулася нашої родини. Бажаємо вам сил і світлих днів. ♡", en: "Your story touched our family deeply. We wish you strength and bright days. ♡" }, by: "Олена, Київ" },
  { text: { uk: "Купила зайчика для доньки — вона з ним не розлучається. Дякую, Галино!", en: "I bought the bunny for my daughter — she never lets it go. Thank you, Galyna!" }, by: "Марія, Львів" },
  { text: { uk: "Ваші вірші — як теплий чай у холодний вечір.", en: "Your poems feel like warm tea on a cold evening." }, by: "Andrii, Warsaw" },
];

export const faq: FaqItem[] = [
  { q: { uk: "Як я можу підтримати родину?", en: "How can I support the family?" },
    a: { uk: "Через банку Monobank у розділі «Підтримати родину» або замовивши виріб Галини. Обидва способи дуже допомагають.", en: "Through the Monobank jar in the “Support our family” section, or by ordering one of Galyna's pieces. Both help a lot." } },
  { q: { uk: "Чи можна замовити виріб?", en: "Can I order a handmade piece?" },
    a: { uk: "Так. Натисніть кнопку з кошиком на картці виробу та надішліть запит — Галина зв'яжеться з вами особисто.", en: "Yes. Tap the cart button on a product card and send a request — Galyna will contact you personally." } },
  { q: { uk: "Як відбувається доставка?", en: "How does delivery work?" },
    a: { uk: "Нова пошта або Укрпошта по Україні. Деталі та вартість Галина узгодить з вами після запиту.", en: "Nova Poshta or Ukrposhta within Ukraine. Galyna will agree the details and cost with you after your request." } },
  { q: { uk: "Чи є звіти про використання коштів?", en: "Are there reports on how funds are used?" },
    a: { uk: "Так, у розділі «Прозорість» ми публікуємо звіти про витрати та оновлення.", en: "Yes, we publish spending reports and updates in the “Transparency” section." } },
];
