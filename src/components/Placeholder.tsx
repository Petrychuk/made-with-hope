import Image from "next/image";
import type { Tone } from "@/content/types";
import { Icon } from "./Icon";

type Props = {
  tone: Tone;
  /** Visible caption on the placeholder + accessible name of the photo. */
  label?: string;
  /** When a real photo exists, it replaces the placeholder. */
  image?: string;
  alt?: string;
  className?: string;
  decorative?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function Placeholder({ tone, label, image, alt, className = "", decorative, sizes, priority }: Props) {
  if (image) {
    return (
      <div className={`ph ${className}`}>
        <Image
          src={image}
          alt={decorative ? "" : alt ?? label ?? ""}
          fill
          sizes={sizes ?? "(max-width: 767px) 100vw, 50vw"}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  const a11y = decorative || !label ? { "aria-hidden": true as const } : { role: "img", "aria-label": label };
  return (
    <div className={`ph ph--${tone} ${className}`} {...a11y}>
      <span className="ph__cap">
        <Icon name="camera" />
        {label && <span>{label}</span>}
      </span>
    </div>
  );
}
