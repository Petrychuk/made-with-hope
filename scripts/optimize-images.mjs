/**
 * Optimises every photo you drop into /images-src and writes a light WebP into /public/images
 * with the same folder structure:
 *
 *   images-src/handmade/bunny.jpg  ->  public/images/handmade/bunny.webp
 *
 * - longest side limited to MAX_SIZE px, EXIF rotation applied, metadata (GPS etc.) stripped
 * - skips files that are already up to date
 * - runs automatically before `npm run dev` and `npm run build`, or manually: `npm run images`
 *
 * On top of that, next/image serves each photo resized for the device in AVIF/WebP.
 */
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "images-src";
const OUT = path.join("public", "images");
const MAX_SIZE = 2000;
const QUALITY = 80;
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif", ".heic", ".heif"]);

async function* walk(dir) {
  let entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(path.extname(e.name).toLowerCase())) yield p;
  }
}

const slug = (name) =>
  name.toLowerCase().normalize("NFKD").replace(/[^\w.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

let done = 0, skipped = 0, savedKB = 0;

for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const dir = path.join(OUT, path.dirname(rel));
  const out = path.join(dir, slug(path.basename(rel, path.extname(rel))) + ".webp");

  const [inStat, outStat] = await Promise.all([stat(file), stat(out).catch(() => null)]);
  if (outStat && outStat.mtimeMs >= inStat.mtimeMs) { skipped++; continue; }

  await mkdir(dir, { recursive: true });
  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(out);

  const before = Math.round(inStat.size / 1024), after = Math.round(info.size / 1024);
  savedKB += before - after;
  done++;
  console.log(`  ✓ ${rel}  ${before} KB → ${after} KB  (${info.width}×${info.height})  → /${path.relative("public", out).replaceAll("\\", "/")}`);
}

if (done || skipped) console.log(`images: ${done} optimised, ${skipped} up to date${done ? `, saved ${Math.round(savedKB / 1024 * 10) / 10} MB` : ""}`);
