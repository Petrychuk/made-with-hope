import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Caveat, Lora, Nunito } from "next/font/google";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
import { IconSprite } from "@/components/IconSprite";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderProvider } from "@/components/order/OrderProvider";
import "../globals.css";

const lora = Lora({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700"], variable: "--font-lora", display: "swap" });
const nunito = Nunito({ subsets: ["latin", "cyrillic"], weight: ["400", "600", "700"], variable: "--font-nunito", display: "swap" });
const caveat = Caveat({ subsets: ["latin", "cyrillic"], weight: ["500", "600"], variable: "--font-caveat", display: "swap" });

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
  const orderable = (await getProducts()).filter((p) => p.status !== "sold");

  return (
    <html lang={locale} className={`${lora.variable} ${nunito.variable} ${caveat.variable}`}>
      <body>
        <a className="skip" href="#main">{d.skip}</a>
        <IconSprite />
        <OrderProvider products={orderable} locale={locale} d={d}>
          <Header locale={locale} d={d} />
          <main id="main">{children}</main>
          <Footer locale={locale} d={d} />
        </OrderProvider>
      </body>
    </html>
  );
}
