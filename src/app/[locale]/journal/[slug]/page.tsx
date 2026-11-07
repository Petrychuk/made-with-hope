import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, pick } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPost, getPosts } from "@/lib/content";
import { categoryLabel, formatDate } from "@/lib/format";
import { brand, pageMeta } from "@/lib/seo";
import { JournalCard } from "@/components/JournalCard";
import { Placeholder } from "@/components/Placeholder";
import { Heart } from "@/components/Heart";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!isLocale(locale) || !post) return {};
  return pageMeta(locale, `/journal/${slug}`, `${pick(post.title, locale)} | ${brand}`, pick(post.excerpt, locale));
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getPost(slug);
  if (!post) notFound();
  const d = getDictionary(locale);

  const isPoem = post.category === "poetry";
  const hasTranslation = Boolean(post.body.en);
  const showTranslation = locale === "en" && hasTranslation;
  const others = (await getPosts()).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="section post" aria-labelledby="post-title">
        <div className="wrap post__wrap">
          <Link className="link-more post__back" href={`/${locale}/journal`}>
            <span aria-hidden="true">←</span> {d["j.back"]}
          </Link>
          <span className={`tag tag--${post.category} post__tag`}>{categoryLabel(d, post.category)}</span>
          <h1 id="post-title">{pick(post.title, locale)}</h1>
          <p className="post__meta">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </p>

          <Placeholder tone={post.tone} image={post.image} label={d["ph.photo"]} className="post__cover" decorative={!post.image} priority sizes="(max-width: 767px) 100vw, 760px" />

          {locale === "en" && !hasTranslation && <p className="post__notice">{d["j.noTranslation"]}</p>}

          {showTranslation ? (
            <>
              <div className={`post__body${isPoem ? " is-poem" : ""}`} lang="en">{post.body.en}</div>
              {isPoem && (
                <section className="post__original" aria-label={d["j.original"]}>
                  <h2>{d["j.original"]}</h2>
                  <div className="post__body is-poem" lang="uk">{post.body.uk}</div>
                </section>
              )}
            </>
          ) : (
            <div className={`post__body${isPoem ? " is-poem" : ""}`} lang="uk">{post.body.uk}</div>
          )}

          <p className="post__sign hand">— {d["pt.sign"]} <Heart variant="small" size={20} /></p>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section" aria-labelledby="others-title" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="sec-title" id="others-title" style={{ marginBottom: 24 }}>{d["j.others"]}</h2>
            <ul className="cards j-list j-grid">
              {others.map((p) => <JournalCard key={p.slug} post={p} locale={locale} d={d} />)}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
