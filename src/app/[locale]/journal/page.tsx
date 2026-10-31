import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, pick } from "@/i18n/config";
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
  searchParams: Promise<{ cat?: string; tag?: string }>;
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
  const { cat, tag } = await searchParams;
  const active = (categories as string[]).includes(cat ?? "") ? (cat as PostCategory) : "all";
  const all = await getPosts();
  // tags come from Studio → «Теми»; only the ones used by posts are shown
  const tags = [...new Map(all.flatMap((p) => p.tags ?? []).map((t) => [t.key, t])).values()].sort((a, b) => a.order - b.order);
  const activeTag = tags.find((t) => t.key === tag)?.key;
  const posts = all.filter((p) => (active === "all" || p.category === active) && (!activeTag || p.tags?.some((t) => t.key === activeTag)));
  const href = (c: string, t?: string) => {
    const q = new URLSearchParams();
    if (c !== "all") q.set("cat", c);
    if (t) q.set("tag", t);
    return `/${locale}/journal${q.size ? `?${q}` : ""}`;
  };

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
              href={href(c, activeTag)}
              className="chip"
              aria-current={c === active ? "page" : undefined}
              scroll={false}
            >
              {categoryLabel(d, c)}
            </Link>
          ))}
        </nav>
        {tags.length > 0 && (
          <nav className="chips" aria-label={d["j.tags"]} style={{ marginTop: 10 }}>
            {tags.map((t) => (
              <Link key={t.key} href={href(active, t.key === activeTag ? undefined : t.key)} className="chip" aria-current={t.key === activeTag ? "page" : undefined} scroll={false}>
                {pick(t.title, locale)}
              </Link>
            ))}
          </nav>
        )}

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
