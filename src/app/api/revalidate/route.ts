import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/sanity/client";

/**
 * Sanity webhook → refreshes the site right after Galyna presses «Опублікувати».
 * Set up in sanity.io/manage → API → Webhooks (see README).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "SANITY_REVALIDATE_SECRET missing" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });

  revalidateTag(SANITY_TAG);
  return NextResponse.json({ ok: true, type: body?._type ?? null });
}
