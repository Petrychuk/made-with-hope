import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";
import { getPosts, getProducts, getSupport, getUpdates } from "@/lib/content";
import {
  FaqContacts, Handmade, Hero, JournalPreview, KindWords, Pillars,
  Story, Support, Transparency,
} from "@/components/home/Sections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMeta(locale, "", d["meta.title"], d["meta.desc"]);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const p = { locale, d };
  const [products, posts, updates, support] = await Promise.all([getProducts(), getPosts(), getUpdates(), getSupport()]);

  return (
    <>
      <Hero {...p} />
      <Pillars {...p} />
      <Handmade {...p} products={products} />
      <JournalPreview {...p} posts={posts} />
      <Story {...p} />
      <Support {...p} support={support} />
      <Transparency {...p} updates={updates} />
      <KindWords {...p} />
      <FaqContacts {...p} />
    </>
  );
}
