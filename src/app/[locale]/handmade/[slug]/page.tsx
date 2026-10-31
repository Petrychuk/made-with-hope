import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, pick } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProduct, getProducts } from "@/lib/content";
import { formatMoney, statusLabel } from "@/lib/format";
import { brand, pageMeta, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { getHome } from "@/lib/home";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { OrderButton } from "@/components/order/OrderButton";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug);
  if (!isLocale(locale) || !product) return {};
  const meta = pageMeta(
    locale,
    `/handmade/${slug}`,
    `${pick(product.name, locale)} | ${brand}`,
    pick(product.description, locale) || getDictionary(locale)["hm.lead"],
  );
  const cover = product.images[0];
  return cover ? { ...meta, openGraph: { ...meta.openGraph, images: [{ url: cover.url }] } } : meta;
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = await getProduct(slug);
  if (!product) notFound();
  const d = getDictionary(locale);
  const { contacts } = await getHome(locale, d);

  const name = pick(product.name, locale);
  const description = pick(product.description, locale);
  const sold = product.status === "sold";
  const others = (await getProducts()).filter((p) => p.slug !== slug && p.status !== "sold").slice(0, 4);

  const availability = { available: "InStock", made_to_order: "PreOrder", sold: "OutOfStock" }[product.status];
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Product", name,
        ...(description ? { description } : {}),
        ...(product.images.length ? { image: product.images.map((i) => i.url) } : {}),
        brand: { "@type": "Brand", name: brand },
        // price only when it is set in Studio — never invented
        ...(product.price != null ? { offers: {
          "@type": "Offer", url: `${siteUrl}/${locale}/handmade/${slug}`, price: product.price, priceCurrency: "UAH",
          availability: `https://schema.org/${availability}`,
        } } : {}),
      }} />
      <section className="section product" aria-labelledby="product-title">
        <div className="wrap">
          <Link className="link-more product__back" href={`/${locale}/handmade`}>
            <span aria-hidden="true">←</span> {d["pd.back"]}
          </Link>

          <div className="product__grid">
            <ProductGallery
              images={product.images}
              name={name}
              tone={product.tone}
              labels={{
                gallery: d["pd.gallery"], prev: d["pd.prev"], next: d["pd.next"],
                photo: d["pd.photo"], of: d["pd.of"], placeholder: d["ph.photo"],
              }}
            />

            <div className="product__info">
              <span className={`status status--${product.status}`}>{statusLabel(d, product.status)}</span>
              <h1 id="product-title">{name}</h1>
              {product.price != null && (
                <p className={`product__price${sold ? " is-sold" : ""}`}>{formatMoney(product.price, locale, d)}</p>
              )}
              {description && <div className="product__desc">{description}</div>}

              {sold ? (
                <p className="product__sold">
                  {d["pd.soldNote"]}{" "}
                  {contacts.telegram && <a href={contacts.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>}
                </p>
              ) : (
                <>
                  <OrderButton productId={product.slug} label={d["hm.order"]} variant="big" />
                  <p className="product__hint">{d["o.hint"]}</p>
                </>
              )}
              <p className="product__delivery">{d["pd.delivery"]}</p>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section" aria-labelledby="others-title" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="sec-title" id="others-title" style={{ marginBottom: 24 }}>{d["pd.others"]}</h2>
            <ul className="cards">
              {others.map((p) => <ProductCard key={p.slug} p={p} locale={locale} d={d} />)}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
