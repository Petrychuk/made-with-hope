import { NextResponse } from "next/server";
import { getProduct } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

/**
 * Order request -> Telegram message to Galyna.
 * The bot token lives ONLY in server env (TELEGRAM_BOT_TOKEN) and never reaches the browser.
 */

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_PER_WINDOW = 3;
// Basic in-memory limiter. On serverless each instance has its own memory —
// good enough against casual spam; use Upstash/Redis if abuse appears.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const CUSTOM_KIND: Record<string, string> = { toy: "Іграшка", bag: "Сумочка або кошик", decor: "Декор для дому", wear: "Одяг або аксесуар", other: "Інше" };
const DELIVERY: Record<string, string> = { nova: "Нова пошта", ukr: "Укрпошта", other: "Інше — обговорити" };

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot — pretend success so bots don't retry
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const city = clean(body.city, 80);
  const delivery = DELIVERY[clean(body.delivery, 10)] ?? DELIVERY.other;
  const branch = clean(body.branch, 160);
  const comment = clean(body.comment, 800);
  const productId = clean(body.productId, 80);
  const isCustom = productId === "custom";
  const idea = clean(body.idea, 1200);
  const when = clean(body.when, 80);
  const kind = CUSTOM_KIND[clean(body.kind, 10)] ?? CUSTOM_KIND.other;
  const product = isCustom ? null : await getProduct(productId); // price is taken from the server, not from the client

  if ((isCustom ? idea.length < 5 : !product || product.status === "sold") || !name || phone.replace(/\D/g, "").length < 9 || body.consent !== true) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const head = product
    ? [
        "🧶 <b>Нове замовлення — Home Made Galyna</b>",
        "",
        `Виріб: ${esc(product.name.uk)}`,
        product.price != null ? `Ціна: ${product.price} грн` : null,
        product.status === "made_to_order" ? "Статус: на замовлення" : null,
        `🔗 ${siteUrl}/uk/handmade/${product.slug}`,
      ]
    : [
        "✨ <b>Індивідуальне замовлення — Home Made Galyna</b>",
        "",
        `Що: ${esc(kind)}`,
        `💡 Ідея: ${esc(idea)}`,
        when ? `📅 Потрібно до: ${esc(when)}` : null,
      ];
  const lines = [
    ...head,
    "",
    `👤 ${esc(name)}`,
    `📞 ${esc(phone)}`,
    email ? `✉️ ${esc(email)}` : null,
    city ? `📍 ${esc(city)}` : null,
    `📦 ${esc(delivery)}${branch ? ` — ${esc(branch)}` : ""}`,
    comment ? `\n💬 Коментар: ${esc(comment)}` : null,
  ].filter((l): l is string => l !== null);
  const text = lines.join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      // local development without a bot: print the message instead of sending
      console.info("\n[order] Telegram is not configured, message would be:\n" + text + "\n");
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[order] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[order] Telegram error", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
    }
  } catch (e) {
    console.error("[order] Telegram request failed", e);
    return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
