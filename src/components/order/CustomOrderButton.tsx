"use client";

import { Heart } from "../Heart";
import { useOrder } from "./OrderProvider";

export function CustomOrderButton({ label }: { label: string }) {
  const { openCustom } = useOrder();
  return (
    <button className="btn btn--primary custom-card__btn" type="button" onClick={(e) => openCustom(e.currentTarget)}>
      <Heart variant="small" size={18} className="" />
      <span>{label}</span>
    </button>
  );
}
