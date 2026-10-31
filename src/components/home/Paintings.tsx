import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Painting, Tone } from "@/content/types";
import { shuffle } from "@/lib/shuffle";
import { Botanical } from "../Botanical";
import { Heart } from "../Heart";
import { Icon } from "../Icon";
import { Placeholder } from "../Placeholder";
import { PaintingsGallery } from "../PaintingsGallery";
import type { PaintingItem } from "../PaintingCard";
import type { Chip } from "../PaintingsGallery";

const TONES: Tone[] = ["pink", "sage", "sand", "peach", "blue"];

export function toItems(paintings: Painting[], locale: Locale): PaintingItem[] {
  return paintings.map((p) => ({
    id: p.id,
    title: pick(p.title, locale),
    meta: [pick(p.technique, locale), p.year].filter(Boolean).join(" · "),
    topics: p.topics.map((t) => ({ key: t.key, label: pick(t.title, locale), icon: t.icon, order: t.order })),
    forSale: p.forSale,
    image: p.image,
    tone: p.tone,
  }));
}

/** Filter chips = tags used by the shown paintings (managed in Studio → «Теми»); placeholders get sample chips. */
export function buildChips(items: PaintingItem[], d: Dict): Chip[] {
  const all: Chip = { key: "all", label: d["pt.c.all"], icon: "leafbtn" };
  if (!items.some((i) => !i.placeholder)) {
    const sample = [["flowers", "flower"], ["landscapes", "mountain"], ["home", "home"], ["animals", "paw"], ["inspiration", "heart"], ["other", "sun"]] as const;
    return [all, ...sample.map(([k, icon]) => ({ key: k, label: d[`pt.c.${k}` as "pt.c.all"], icon }))];
  }
  const seen = new Map<string, { chip: Chip; order: number }>();
  for (const i of items) for (const t of i.topics) if (!seen.has(t.key)) seen.set(t.key, { chip: { key: t.key, label: t.label, icon: t.icon }, order: t.order });
  const topics = [...seen.values()].sort((a, b) => a.order - b.order || a.chip.label.localeCompare(b.chip.label)).map((x) => x.chip);
  return topics.length ? [all, ...topics] : [all];
}

export const paintingLabels = (d: Dict): Record<string, string> => ({
  all: d["pt.c.all"], flowers: d["pt.c.flowers"], landscapes: d["pt.c.landscapes"], home: d["pt.c.home"],
  animals: d["pt.c.animals"], inspiration: d["pt.c.inspiration"], other: d["pt.c.other"],
  filter: d["pt.filter"], next: d["pt.next"], prev: d["pt.prev"], list: d["pt.list"], ph: d["pt.ph"], empty: d["pt.empty"],
  cta: d["pt.all"], ask: d["pt.ask"], open: d["pt.open"], prev1: d["pt.prev1"], next1: d["pt.next1"], close: d.close,
});

/** Home page: «Мої малюнки» gallery + «Світ у кольорах» showcase. Random selection on every visit. */
export function Paintings({ locale, d, paintings }: { locale: Locale; d: Dict; paintings: Painting[] }) {
  const base = `/${locale}`;
  const mixed = shuffle(paintings);
  const real = toItems(mixed.slice(0, 24), locale);
  // no paintings uploaded yet → placeholders
  const items: PaintingItem[] = real.length
    ? real
    : TONES.map((tone, i) => ({ id: `ph-${i}`, title: d["pt.soon"], meta: "", topics: [], forSale: false, tone, placeholder: true }));
  // showcase: two other paintings when there are enough, otherwise reuse the first ones
  const showA = items[items.length > 5 ? 5 : 0];
  const showB = items[items.length > 6 ? 6 : Math.min(1, items.length - 1)];
  const labels = paintingLabels(d);
  const noteLines = d["pt.note"].split("\n");

  return (
    <>
      <section className="section pt" id="paintings" aria-labelledby="pt-title">
        <div className="wrap">
          <div className="pt__head">
            <div>
              <div className="pt__title">
                <span className="pt__ico" aria-hidden="true"><Icon name="palette" /></span>
                <h2 id="pt-title">{d["pt.title"]}</h2>
                <Heart variant="tilt" size={36} />
              </div>
              <p className="pt__lead">{d["pt.lead"]}</p>
            </div>
            <p className="pt__quote">
              {d["pt.quote"]} <Heart variant="small" size={22} className="" />
              <Botanical name="pink-buds" width={78} className="pt__sprig" />
            </p>
          </div>
          <PaintingsGallery items={items} chips={buildChips(items, d)} labels={labels} allHref={`${base}/paintings`} />
        </div>
      </section>

      <section className="pt-world" aria-labelledby="pt-world-title">
        <div className="wrap pt-world__grid">
          <div className="pt-collage">
            <div className="pt-photo pt-photo--a">
              <span className="pt-tape" aria-hidden="true" />
              <div className="pt-photo__in">
                <Placeholder tone={showA.tone} image={showA.image} label={d["pt.ph"]} alt={showA.image?.alt || showA.title}
                  decorative={showA.placeholder} sizes="(max-width: 900px) 80vw, 420px" />
              </div>
            </div>
            <div className="pt-photo pt-photo--b">
              <span className="pt-tape" aria-hidden="true" />
              <div className="pt-photo__in">
                <Placeholder tone={showB.tone} image={showB.image} label={d["pt.ph"]} alt={showB.image?.alt || showB.title}
                  decorative={showB.placeholder} sizes="(max-width: 900px) 40vw, 230px" />
              </div>
            </div>
            <Heart variant="tilt" size={44} className="pt-collage__heart" />
            <Botanical name="peach-blossom" width={96} className="pt-collage__sprig" />
          </div>
          <div className="pt-world__text">
            <span className="pt-tag">{d["pt.easel"]}<Botanical name="eucalyptus" width={64} className="pt-tag__leaf" /></span>
            <h2 id="pt-world-title">{d["pt.world"]} <Heart variant="tilt" size={34} /></h2>
            <p>{d["pt.p1"]}</p>
            <p>{d["pt.p2"]}</p>
            <blockquote className="pt-note">
              {noteLines.map((l) => <span key={l}>{l}</span>)}
              <Heart variant="small" size={20} className="pt-note__heart" />
            </blockquote>
            <p className="pt-sign" aria-hidden="true">{d["pt.sign"]}</p>
          </div>
        </div>
      </section>
    </>
  );
}
