/**
 * Legal texts (UA / EN) — shown in modals from the footer and on /[locale]/privacy.
 * Written for a private person in Ukraine (Закон України «Про захист персональних даних»,
 * «Про захист прав споживачів», «Про електронну комерцію»).
 * DRAFT: have it checked by a lawyer before launch; fill in the owner's full name in site.ts.
 */
import type { Locale } from "@/i18n/config";

export type LegalId = "privacy" | "terms" | "orders" | "support";
export type LegalDoc = { id: LegalId; title: string; updated: string; sections: { h: string; p: string[] }[] };

type Ctx = { owner: string; contact: string };

const UPDATED = "2026-10-07";

const uk = ({ owner, contact }: Ctx): LegalDoc[] => [
  {
    id: "privacy",
    title: "Політика конфіденційності",
    updated: UPDATED,
    sections: [
      { h: "1. Хто обробляє ваші дані", p: [
        `Володілець персональних даних — ${owner}, фізична особа, авторка сайту Galyna's World (далі — «ми»).`,
        "Обробка здійснюється відповідно до Закону України «Про захист персональних даних».",
      ] },
      { h: "2. Які дані ми збираємо", p: [
        "Лише ті, які ви самі вводите у формі запиту на замовлення: ім'я, номер телефону, email (за бажанням), місто, спосіб доставки, відділення або адресу, коментар чи опис ідеї для індивідуального виробу.",
        "Ми не збираємо паспортні дані, банківські реквізити чи дані платіжних карток. Оплата на сайті не здійснюється.",
      ] },
      { h: "3. Мета обробки", p: [
        "Зв'язатися з вами, погодити деталі, вартість, оплату та доставку виробу.",
        "Дані не використовуються для реклами, розсилок чи профілювання та не продаються третім особам.",
      ] },
      { h: "4. Підстава обробки", p: [
        "Ваша згода, яку ви надаєте, позначаючи галочку у формі перед надсиланням запиту. Згоду можна відкликати в будь-який момент.",
      ] },
      { h: "5. Де зберігаються дані", p: [
        "Запит надходить Галині повідомленням у Telegram. Сайт не має бази даних клієнтів і не зберігає ваші дані на сервері.",
        "Для виконання замовлення дані (ім'я, телефон, адреса доставки) можуть бути передані обраній вами службі доставки (Нова пошта, Укрпошта).",
      ] },
      { h: "6. Строк зберігання", p: [
        "Не довше, ніж потрібно для виконання замовлення, але не більше 1 року після нього. Після цього листування видаляється.",
      ] },
      { h: "7. Cookies та аналітика", p: [
        "Сайт використовує лише технічний cookie для запам'ятовування обраної мови (UA/EN). Рекламних і аналітичних cookies немає.",
      ] },
      { h: "8. Ваші права", p: [
        "Відповідно до ст. 8 Закону «Про захист персональних даних» ви маєте право знати, які дані про вас обробляються, вимагати їх виправлення чи видалення, відкликати згоду та звернутися до Уповноваженого Верховної Ради України з прав людини.",
        `Щоб скористатися цими правами, напишіть нам: ${contact}.`,
      ] },
      { h: "9. Медичні документи", p: [
        "Документи в розділі «Прозорість» публікуються родиною добровільно, з прихованими особистими даними (дата народження, адреса, номери документів). Вони закриті від індексації пошуковими системами.",
      ] },
    ],
  },
  {
    id: "terms",
    title: "Умови використання сайту",
    updated: UPDATED,
    sections: [
      { h: "1. Про сайт", p: [
        `Galyna's World — особистий сайт родини: ручна робота, вірші, історія та можливість підтримати. Сайт веде ${owner}.`,
        "Користуючись сайтом, ви погоджуєтеся з цими умовами.",
      ] },
      { h: "2. Авторські права", p: [
        "Вірші, тексти, фотографії та зображення виробів належать їхнім авторам. Копіювання чи використання без дозволу заборонене, крім цитування з посиланням на сайт.",
        "Фото родини не можна поширювати поза контекстом сайту чи використовувати в інших цілях.",
      ] },
      { h: "3. Інформація на сайті", p: [
        "Ми намагаємося підтримувати інформацію актуальною, але ціни, наявність виробів і сума збору можуть змінюватися. Остаточні умови замовлення погоджуються особисто.",
      ] },
      { h: "4. Зовнішні посилання", p: [
        "Сайт містить посилання на Monobank, Instagram, Facebook та Telegram. Ми не відповідаємо за роботу та правила цих сервісів.",
      ] },
      { h: "5. Зміни", p: ["Умови можуть оновлюватися. Актуальна версія завжди доступна на сайті."] },
    ],
  },
  {
    id: "orders",
    title: "Умови замовлення та доставки",
    updated: UPDATED,
    sections: [
      { h: "1. Запит, а не покупка", p: [
        "Форма на сайті — це запит на замовлення, а не оплата чи укладений договір. Після запиту Галина зв'язується з вами особисто, щоб підтвердити наявність, ціну, оплату та доставку. Замовлення вважається погодженим після цього підтвердження.",
      ] },
      { h: "2. Ціна та оплата", p: [
        "Ціни на сайті вказані в гривнях і є орієнтовними. Остаточна ціна, спосіб і строк оплати погоджуються особисто. Сайт не приймає платежів.",
        "Для індивідуальних замовлень ціна та строк виготовлення визначаються після обговорення ідеї.",
      ] },
      { h: "3. Доставка", p: [
        "Доставка здійснюється Новою поштою або Укрпоштою по Україні за тарифами перевізника; інші варіанти — за домовленістю. Вартість доставки сплачує покупець, якщо не домовлено інакше.",
      ] },
      { h: "4. Особливості ручної роботи", p: [
        "Кожен виріб виготовлений вручну, тому може трохи відрізнятися від фото кольором, розміром чи деталями. Це не є дефектом.",
      ] },
      { h: "5. Повернення та обмін", p: [
        "Якщо виріб пошкоджено при доставці або він суттєво не відповідає погодженому опису — напишіть протягом 14 днів після отримання, і ми знайдемо рішення (заміна, ремонт або повернення коштів) відповідно до Закону України «Про захист прав споживачів».",
        "Вироби, виготовлені індивідуально за вашим описом (кольором, іменем, розміром), обміну та поверненню з причин, не пов'язаних з якістю, не підлягають.",
      ] },
    ],
  },
  {
    id: "support",
    title: "Умови добровільної підтримки",
    updated: UPDATED,
    sections: [
      { h: "1. Що це", p: [
        "Підтримка через банку Monobank — добровільний безоплатний внесок на потреби родини (лікування, реабілітація, щоденний догляд). Це не купівля товару чи послуги.",
        "Збір веде приватна особа, а не благодійна організація, тому квитанції для податкової знижки не надаються.",
      ] },
      { h: "2. Платежі", p: [
        "Платіж здійснюється на сторінці Monobank за її правилами. Сайт не отримує і не зберігає банківські дані.",
        "Внески є безповоротними. Якщо ви помилилися із сумою, напишіть нам — постараємося допомогти разом із банком.",
      ] },
      { h: "3. Прозорість", p: [
        "Ми публікуємо звіти про витрати та оновлення в розділі «Прозорість». Сума на сайті оновлюється вручну й може відрізнятися від поточного балансу банки.",
      ] },
      { h: "4. Звернення", p: [`З будь-якими питаннями щодо підтримки пишіть: ${contact}.`] },
    ],
  },
];

const en = ({ owner, contact }: Ctx): LegalDoc[] => [
  {
    id: "privacy",
    title: "Privacy Policy",
    updated: UPDATED,
    sections: [
      { h: "1. Who processes your data", p: [
        `The data controller is ${owner}, a private individual and author of the Galyna's World website ("we").`,
        "Data is processed in accordance with the Law of Ukraine «On Personal Data Protection».",
      ] },
      { h: "2. What we collect", p: [
        "Only what you enter in the order request form: name, phone number, email (optional), city, delivery method, branch or address, and a comment or description of your custom idea.",
        "We do not collect ID documents, bank details or card data. No payments are made on the site.",
      ] },
      { h: "3. Purpose", p: [
        "To contact you and agree on the details, price, payment and delivery of the item.",
        "Your data is not used for advertising, newsletters or profiling and is never sold.",
      ] },
      { h: "4. Legal basis", p: [
        "Your consent, given by ticking the box in the form before sending a request. You can withdraw it at any time.",
      ] },
      { h: "5. Where data is kept", p: [
        "The request reaches Galyna as a Telegram message. The site has no customer database and does not store your data on the server.",
        "To fulfil an order, your name, phone and delivery address may be shared with the delivery service you choose (Nova Poshta, Ukrposhta).",
      ] },
      { h: "6. Retention", p: ["No longer than needed to complete the order, and no more than 1 year after it."] },
      { h: "7. Cookies and analytics", p: [
        "The site uses only one technical cookie to remember your language (UA/EN). There are no advertising or analytics cookies.",
      ] },
      { h: "8. Your rights", p: [
        "You have the right to know what data about you is processed, to ask for it to be corrected or deleted, to withdraw consent, and to complain to the Ukrainian Parliament Commissioner for Human Rights.",
        `To exercise these rights, contact us: ${contact}.`,
      ] },
      { h: "9. Medical documents", p: [
        "Documents in the Transparency section are published voluntarily by the family with personal details hidden, and are excluded from search engine indexing.",
      ] },
    ],
  },
  {
    id: "terms",
    title: "Terms of Use",
    updated: UPDATED,
    sections: [
      { h: "1. About the site", p: [
        `Galyna's World is a personal family website: handmade items, poems, our story and a way to help. It is run by ${owner}.`,
        "By using the site you agree to these terms.",
      ] },
      { h: "2. Copyright", p: [
        "Poems, texts, photos and product images belong to their authors. Copying or reuse without permission is not allowed, except quoting with a link to the site.",
        "Family photos may not be shared out of context or used for other purposes.",
      ] },
      { h: "3. Information", p: [
        "We keep information up to date, but prices, availability and the fundraising total may change. Final order terms are agreed personally.",
      ] },
      { h: "4. External links", p: [
        "The site links to Monobank, Instagram, Facebook and Telegram. We are not responsible for how those services work or their rules.",
      ] },
      { h: "5. Changes", p: ["These terms may be updated. The current version is always available on the site."] },
    ],
  },
  {
    id: "orders",
    title: "Order & Delivery Terms",
    updated: UPDATED,
    sections: [
      { h: "1. A request, not a purchase", p: [
        "The form on the site is an order request, not a payment or a binding contract. Galyna will contact you personally to confirm availability, price, payment and delivery. The order is agreed once confirmed.",
      ] },
      { h: "2. Price and payment", p: [
        "Prices are shown in UAH and are indicative. The final price, payment method and timing are agreed personally. The site does not take payments.",
        "For custom orders, price and making time are set after discussing your idea.",
      ] },
      { h: "3. Delivery", p: [
        "Delivery is by Nova Poshta or Ukrposhta within Ukraine at the carrier's rates; other options by agreement. Delivery is paid by the buyer unless agreed otherwise.",
      ] },
      { h: "4. Handmade nature", p: [
        "Each item is made by hand and may differ slightly from the photo in colour, size or details. This is not a defect.",
      ] },
      { h: "5. Returns and exchanges", p: [
        "If an item is damaged in transit or materially differs from the agreed description, write to us within 14 days of receipt and we will find a solution (replacement, repair or refund) in line with Ukrainian consumer protection law.",
        "Items made individually to your specification (colour, name, size) cannot be returned or exchanged for reasons unrelated to quality.",
      ] },
    ],
  },
  {
    id: "support",
    title: "Voluntary Support Terms",
    updated: UPDATED,
    sections: [
      { h: "1. What it is", p: [
        "Support via the Monobank jar is a voluntary, free gift to the family for its needs (treatment, rehabilitation, daily care). It is not a purchase of goods or services.",
        "The fundraiser is run by a private individual, not a registered charity, so no tax receipts are issued.",
      ] },
      { h: "2. Payments", p: [
        "Payments are made on the Monobank page under its rules. The site never receives or stores bank details.",
        "Gifts are non-refundable. If you made a mistake with the amount, write to us and we will try to help together with the bank.",
      ] },
      { h: "3. Transparency", p: [
        "We publish spending reports and updates in the Transparency section. The total on the site is updated manually and may differ from the current jar balance.",
      ] },
      { h: "4. Questions", p: [`For any questions about support, contact us: ${contact}.`] },
    ],
  },
];

export function getLegalDocs(locale: Locale, ctx: Ctx): LegalDoc[] {
  return (locale === "en" ? en : uk)(ctx);
}
