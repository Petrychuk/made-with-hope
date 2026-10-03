import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/** "/" and any path without a locale -> "/uk/..." (or the visitor's saved / browser language). */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return NextResponse.next();

  const saved = req.cookies.get("NEXT_LOCALE")?.value;
  const browser = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const locale =
    saved && isLocale(saved) ? saved
    : /^(uk|ru)/.test(browser) ? "uk"
    : browser.startsWith("en") ? "en"
    : defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip API, Sanity Studio, Next internals and files with an extension (images, favicon…)
  matcher: ["/((?!api|studio|_next|.*\\..*).*)"],
};
