import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";
import { getPaintings, getPosts, getProducts, getSupport } from "@/lib/content";
import { getHome } from "@/lib/home";
import { Paintings } from "@/components/home/Paintings";
import { Achievements } from "@/components/home/Achievements";
import { JsonLd } from "@/components/JsonLd";
import { brand, siteUrl } from "@/lib/seo";
import {
  AboutSon, Handmade, Hero, JournalPreview, Pillars, PurchaseHelps,
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
  // rendered per visit so the 4 handmade cards are a new random mix each time
  // (Sanity data itself stays cached — see src/sanity/client.ts)
  await connection();
  const d = getDictionary(locale);
  const p = { locale, d };
  const [products, posts, support, home, paintings] = await Promise.all([
    getProducts(), getPosts(), getSupport(), getHome(locale, d), getPaintings(),
  ]);
  const h = { ...p, home };

  const sameAs = [home.contacts.instagram, home.contacts.facebook, home.contacts.telegram].filter(Boolean);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Organization", name: brand, url: `${siteUrl}/${locale}`,
        logo: `${siteUrl}/icon-512.png`, description: d["meta.desc"], ...(sameAs.length ? { sameAs } : {}),
      }} />
      <Hero {...h} />
      <Pillars {...p} />
      <Handmade {...h} products={products} />
      <PurchaseHelps {...p} />
      <Paintings {...p} paintings={paintings} />
      <JournalPreview {...p} posts={posts} />
      <Story {...h} />
      <AboutSon {...h} />
      <Achievements d={d} slides={home.achievements} />
      <Support {...h} support={support} />
      <Transparency {...h} />
    </>
  );
}
