import Image, { type StaticImageData } from "next/image";
import leavesBuds from "@/assets/decor/branch-leaves-buds.webp";
import gypsophila from "@/assets/decor/branch-gypsophila.webp";
import peachBlossom from "@/assets/decor/branch-peach-blossom.webp";
import eucalyptus from "@/assets/decor/branch-eucalyptus.webp";
import paleLeaves from "@/assets/decor/branch-pale-leaves.webp";
import pinkBuds from "@/assets/decor/branch-pink-buds.webp";
import daisies from "@/assets/decor/branch-daisies.webp";

/** Watercolour branches with transparent background (src/assets/decor). Purely decorative. */
const branches = {
  "leaves-buds": leavesBuds,
  gypsophila,
  "peach-blossom": peachBlossom,
  eucalyptus,
  "pale-leaves": paleLeaves,
  "pink-buds": pinkBuds,
  daisies,
} satisfies Record<string, StaticImageData>;

export type BotanicalName = keyof typeof branches;

type Props = { name: BotanicalName; width: number; className?: string; flip?: boolean };

export function Botanical({ name, width, className = "", flip }: Props) {
  return (
    <Image
      src={branches[name]}
      alt=""
      aria-hidden="true"
      draggable={false}
      sizes={`${width}px`}
      loading="lazy"
      className={`deco${flip ? " deco--flip" : ""}${className ? ` ${className}` : ""}`}
      style={{ width, height: "auto" }}
    />
  );
}
