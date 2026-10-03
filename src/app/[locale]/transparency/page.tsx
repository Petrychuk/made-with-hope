import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, pick, type Locale } from "@/i18n/config";
import { getDictionary, type Dict } from "@/i18n/dictionaries";
import type { TransparencyItem } from "@/content/types";
import { getTransparency } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { Icon } from "@/components/Icon";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMeta(locale, "/transparency", `${d["tr.pageTitle"]} | Home Made Galyna`, d["tr.lead"]);
}

function List({ id, title, items, locale, d }: { id: string; title: string; items: TransparencyItem[]; locale: Locale; d: Dict }) {
  return (
    <section className="tr-list" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {items.length ? (
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <Icon name={it.kind === "report" ? "receipt" : "doc"} />
              <span className="tr-list__title">
                {pick(it.title, locale)}
                <time dateTime={it.date}>{formatDate(it.date, locale)}</time>
              </span>
              {it.fileUrl && (
                <a className="link-more" href={it.fileUrl} target="_blank" rel="noopener noreferrer">
                  {d["tr.open"]} <Icon name="ext" size={16} />
                  <span className="sr-only">{d.newTab}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">{d["tr.empty"]}</p>
      )}
    </section>
  );
}

export default async function TransparencyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const items = await getTransparency();
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 className="sec-title page-title">{d["tr.pageTitle"]}</h1>
        <p className="sec-lead">{d["tr.lead"]}</p>
        <List id="reports" title={d["tr.reports"]} items={items.filter((i) => i.kind === "report")} locale={locale} d={d} />
        <List id="documents" title={d["tr.docs"]} items={items.filter((i) => i.kind === "document")} locale={locale} d={d} />
        <p className="transp__privacy">{d["tr.privacy"]}</p>
      </div>
    </section>
  );
}
