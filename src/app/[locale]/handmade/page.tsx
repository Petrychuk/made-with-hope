import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { Heart } from "@/components/Heart";
import { ProductCard } from "@/components/ProductCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return pageMeta(locale, "/handmade", `${d["hm.pageTitle"]} | Home Made Galyna`, d["hm.lead"]);
}

export default async function HandmadePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const products = await getProducts();
  // available first, then made to order, sold at the end
  const order = { available: 0, made_to_order: 1, sold: 2 } as const;
  const sorted = [...products].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <section className="section" aria-labelledby="hp-title">
      <div className="wrap">
        <h1 className="sec-title page-title" id="hp-title">
          <span className="brush brush--peach" aria-hidden="true" />
          <span>{d["hm.pageTitle"]}</span> <Heart variant="tilt" size={34} />
        </h1>
        <p className="sec-lead" style={{ marginBottom: 32 }}>{d["hm.lead"]}</p>
        {sorted.length ? (
          <ul className="cards cards--page">
            {sorted.map((p) => <ProductCard key={p.slug} p={p} locale={locale} d={d} />)}
          </ul>
        ) : (
          <p className="empty">{d["hm.empty"]}</p>
        )}
      </div>
    </section>
  );
}
