import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/lib/seo";
import {
  FaqContacts, Handmade, Hero, JournalPreview, KindWords, Pillars,
  StayInTouch, Story, Support, Transparency,
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

  return (
    <>
      <Hero {...p} />
      <Pillars {...p} />
      <Handmade {...p} />
      <JournalPreview {...p} />
      <Story {...p} />
      <Support {...p} />
      <Transparency {...p} />
      <KindWords {...p} />
      <FaqContacts {...p} />
      <StayInTouch {...p} />
    </>
  );
}
