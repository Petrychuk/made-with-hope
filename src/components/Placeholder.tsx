import Image from "next/image";
import type { ImageRef, Tone } from "@/content/types";
import { Icon } from "./Icon";

type Props = {
  tone: Tone;
  /** Visible caption on the placeholder + accessible name of the photo. */
  label?: string;
  /** When a real photo exists (Sanity or /public), it replaces the placeholder. */
  image?: ImageRef;
  alt?: string;
  className?: string;
  decorative?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function Placeholder({ tone, label, image, alt, className = "", decorative, sizes, priority }: Props) {
  if (image) {
    return (
      <div className={`ph ph--photo ${className}`}>
        <Image
          src={image.url}
          alt={decorative ? "" : alt ?? image.alt ?? label ?? ""}
          fill
          sizes={sizes ?? "(max-width: 767px) 100vw, 50vw"}
          priority={priority}
          placeholder={image.lqip ? "blur" : "empty"}
          blurDataURL={image.lqip}
          style={{ objectFit: "cover", ...(image.focus ? { objectPosition: image.focus } : {}) }}
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
