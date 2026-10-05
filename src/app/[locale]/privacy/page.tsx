import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getHome } from "@/lib/home";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMeta(locale, "/privacy", `${d["pv.title"]} | Home Made Galyna`, d["pv.title"]);
}

// DRAFT text — have it reviewed before launch.
const text = (email: string): Record<Locale, { h: string; p: string }[]> => ({
  uk: [
    { h: "Які дані ми збираємо", p: "Лише ті, що ви вводите у формі запиту на замовлення: ім'я, телефон, email (за бажанням), місто, спосіб доставки, відділення або адресу та коментар." },
    { h: "Навіщо", p: "Щоб Галина могла зв'язатися з вами, підтвердити замовлення, оплату та доставку. Дані не використовуються для реклами і не передаються третім особам, окрім служби доставки, яку ви обрали." },
    { h: "Де зберігаються", p: "Запит надходить Галині повідомленням у Telegram. Сайт не має бази даних клієнтів і не зберігає ваші дані на сервері." },
    { h: "Платежі", p: "Сайт не приймає платежі та не збирає банківських даних. Підтримка родини відбувається через зовнішню сторінку Monobank." },
    { h: "Ваші права", p: `Ви можете попросити видалити ваше повідомлення, написавши на ${email}.` },
  ],
  en: [
    { h: "What we collect", p: "Only what you enter in the order request form: name, phone, email (optional), city, delivery method, branch or address and a comment." },
    { h: "Why", p: "So Galyna can contact you to confirm the order, payment and delivery. The data is not used for advertising or shared with anyone except the delivery service you choose." },
    { h: "Where it is kept", p: "The request reaches Galyna as a Telegram message. The site has no customer database and does not store your data on the server." },
    { h: "Payments", p: "The site does not take payments or collect bank details. Support for the family goes through an external Monobank page." },
    { h: "Your rights", p: `You can ask us to delete your message by writing to ${email}.` },
  ],
});

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const { contacts } = await getHome(locale, d);
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 className="sec-title page-title">{d["pv.title"]}</h1>
        {text(contacts.email)[locale].map((s) => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </div>
        ))}
        <h2 id="support-terms">{d["ft.terms"]}</h2>
        <p>{d["sp.note"]}</p>
      </div>
    </section>
  );
}
