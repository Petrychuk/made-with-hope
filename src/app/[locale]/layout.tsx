import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
// Self-hosted fonts (npm @fontsource-variable/*): no request to Google Fonts at build or runtime.
import "@fontsource-variable/lora";
import "@fontsource-variable/nunito";
import "@fontsource-variable/caveat";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/content";
import { contactLine, getHome } from "@/lib/home";
import { getLegalDocs } from "@/content/legal";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/seo";
import { IconSprite } from "@/components/IconSprite";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderProvider } from "@/components/order/OrderProvider";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // green hand-drawn heart from the sticker set (public/)
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FDFBF7",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const [products, home] = await Promise.all([getProducts(), getHome(locale, d)]);
  const orderable = products.filter((p) => p.status !== "sold");

  return (
    <html lang={locale}>
      <body>
        <a className="skip" href="#main">{d.skip}</a>
        <IconSprite />
        <OrderProvider products={orderable} locale={locale} d={d}>
          <Header locale={locale} d={d} />
          <main id="main">{children}</main>
          <Footer locale={locale} d={d} contacts={home.contacts}
            legal={getLegalDocs(locale, { owner: site.owner[locale], contact: contactLine(home.contacts, locale) })} />
        </OrderProvider>
      </body>
    </html>
  );
}
