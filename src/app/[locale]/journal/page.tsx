import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categories } from "@/content/posts";
import { getPosts } from "@/lib/content";
import type { PostCategory } from "@/content/types";
import { categoryLabel } from "@/lib/format";
import { brand, pageMeta } from "@/lib/seo";
import { JournalCard } from "@/components/JournalCard";
import { Botanical } from "@/components/Botanical";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMeta(locale, "/journal", `${d["meta.journal"]} | ${brand}`, d["j.subtitle"]);
}

export default async function JournalPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const { cat } = await searchParams;
  const active = (categories as string[]).includes(cat ?? "") ? (cat as PostCategory) : "all";
  const posts = (await getPosts()).filter((p) => active === "all" || p.category === active);

  return (
    <section className="section page-journal" aria-labelledby="jp-title">
      <div className="wrap">
        <h1 className="sec-title page-title" id="jp-title">
          <span className="brush brush--sage" aria-hidden="true" />
          <span>{d["j.title"]}</span> <Botanical name="pale-leaves" width={40} className="leaf title-sprig" />
        </h1>
        <p className="sec-lead">{d["j.subtitle"]}</p>

        <nav className="chips" aria-label={d["j.filter"]}>
          {(["all", ...categories] as const).map((c) => (
            <Link
              key={c}
              href={c === "all" ? `/${locale}/journal` : `/${locale}/journal?cat=${c}`}
              className="chip"
              aria-current={c === active ? "page" : undefined}
              scroll={false}
            >
              {categoryLabel(d, c)}
            </Link>
          ))}
        </nav>

        {posts.length ? (
          <ul className="cards j-list j-grid">
            {posts.map((p) => <JournalCard key={p.slug} post={p} locale={locale} d={d} />)}
          </ul>
        ) : (
          <p className="empty">{d["j.empty"]}</p>
        )}
      </div>
    </section>
  );
}
