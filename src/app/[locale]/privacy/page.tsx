import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLegalDocs } from "@/content/legal";
import { site } from "@/content/site";
import { contactLine, getHome } from "@/lib/home";
import { brand, pageMeta } from "@/lib/seo";
import { LegalBody } from "@/components/LegalLinks";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMeta(locale, "/privacy", `${d["lg.title"]} | ${brand}`, d["ft.privacy"]);
}

/** All legal documents on one page (the footer opens the same texts in modals). */
export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const { contacts } = await getHome(locale, d);
  const docs = getLegalDocs(locale, { owner: site.owner[locale], contact: contactLine(contacts, locale) });
  return (
    <section className="section">
      <div className="wrap prose legal">
        <h1 className="sec-title page-title">{d["lg.title"]}</h1>
        <nav className="legal__toc" aria-label={d["lg.title"]}>
          {docs.map((doc) => <a key={doc.id} href={`#${doc.id}`}>{doc.title}</a>)}
        </nav>
        {docs.map((doc) => (
          <article key={doc.id} id={doc.id} className="legal__doc">
            <h2>{doc.title}</h2>
            <LegalBody doc={doc} locale={locale} updatedLabel={d["lg.updated"]} />
          </article>
        ))}
      </div>
    </section>
  );
}
