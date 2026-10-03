import type { CSSProperties } from "react";

export type IconName =
  | "heart"
  | "heart-fill"
  | "branch"
  | "camera"
  | "yarn"
  | "book"
  | "family"
  | "cart"
  | "med"
  | "rehab"
  | "home"
  | "sun"
  | "check"
  | "doc"
  | "receipt"
  | "news"
  | "tg"
  | "ig"
  | "fb"
  | "mail"
  | "leafbtn"
  | "arrow"
  | "ext"
  | "close"
  | "burger";

type Props = { name: IconName; className?: string; size?: number; style?: CSSProperties };

export function Icon({ name, className, size, style }: Props) {
  return (
    <svg className={className} width={size} height={size} style={style} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
