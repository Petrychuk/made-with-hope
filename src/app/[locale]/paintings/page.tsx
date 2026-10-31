import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPaintings } from "@/lib/content";
import { brand, pageMeta } from "@/lib/seo";
import { Heart } from "@/components/Heart";
import { PaintingsGrid } from "@/components/PaintingsGrid";
import { paintingLabels, toItems } from "@/components/home/Paintings";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMeta(locale, "/paintings", `${d["pt.pageTitle"]} | ${brand}`, d["pt.lead"]);
}

export default async function PaintingsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const items = toItems(await getPaintings(), locale); // newest first

  return (
    <section className="section" aria-labelledby="pp-title">
      <div className="wrap">
        <h1 className="sec-title page-title" id="pp-title">
          <span className="brush brush--peach" aria-hidden="true" />
          <span>{d["pt.pageTitle"]}</span> <Heart variant="tilt" size={34} />
        </h1>
        <p className="sec-lead" style={{ marginBottom: 32 }}>{d["pt.lead"]}</p>
        {items.length ? (
          <PaintingsGrid items={items} labels={paintingLabels(d)} />
        ) : (
          <p className="empty">{d["pt.empty"]}</p>
        )}
      </div>
    </section>
  );
}
