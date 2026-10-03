import type { CSSProperties } from "react";

/**
 * Hand-drawn hearts traced from Galyna's watercolour sticker sheet (sprite in IconSprite.tsx).
 * Colour comes from CSS `color` (currentColor).
 *
 *  main   – logo, hero title, pillars
 *  tilt   – next to section headings (slightly rotated)
 *  small  – buttons, notes, inline text (thicker line, reads well at 14–20px)
 *  soft   – light peach accent
 *  double – two hearts; the big one uses --heart-2 (peach by default), the small one currentColor
 */
export type HeartVariant = "main" | "tilt" | "small" | "soft" | "double";

type Props = {
  variant?: HeartVariant;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function Heart({ variant = "main", size = 24, className = "heart-ico", style }: Props) {
  // at tiny sizes the brush line gets a hair thicker so it stays visible
  const weight = size <= 20 ? 0.9 : size <= 40 ? 1.1 : 1.7;
  const cls = [className, variant === "tilt" ? "heart--tilt" : ""].filter(Boolean).join(" ");
  return (
    <svg
      className={cls}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      style={{ ["--hw" as string]: `${weight}px`, ...style }}
    >
      <use href={`#h-${variant}`} />
    </svg>
  );
}
