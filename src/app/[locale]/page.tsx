import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";
import { getPosts, getProducts, getSupport, getUpdates } from "@/lib/content";
import { getHome } from "@/lib/home";
import {
  FaqContacts, Handmade, Hero, JournalPreview, KindWords, Pillars, PurchaseHelps,
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
  const [products, posts, updates, support, home] = await Promise.all([
    getProducts(), getPosts(), getUpdates(), getSupport(), getHome(locale, d),
  ]);
  const h = { ...p, home };

  return (
    <>
      <Hero {...h} />
      <Pillars {...p} />
      <Handmade {...h} products={products} />
      <PurchaseHelps {...p} />
      <JournalPreview {...p} posts={posts} />
      <Story {...h} />
      <Support {...h} support={support} />
      <Transparency {...p} updates={updates} />
      <KindWords {...h} />
      <FaqContacts {...h} />
    </>
  );
}
