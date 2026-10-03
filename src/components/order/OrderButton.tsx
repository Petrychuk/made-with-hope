"use client";

import { Heart } from "../Heart";
import { Icon } from "../Icon";
import { useOrder } from "./OrderProvider";

type Props = {
  productId: string;
  label: string;
  /** "icon" — small cart button on cards, "big" — full button on the product page */
  variant?: "icon" | "big";
};

export function OrderButton({ productId, label, variant = "icon" }: Props) {
  const { openOrder } = useOrder();
  if (variant === "big") {
    return (
      <button className="btn btn--primary product__order" type="button" onClick={(e) => openOrder(productId, e.currentTarget)}>
        <Heart variant="small" size={20} className="" />
        <span>{label}</span>
      </button>
    );
  }
  return (
    <button className="cart-btn" type="button" aria-label={label} title={label} onClick={(e) => openOrder(productId, e.currentTarget)}>
      <Icon name="cart" />
    </button>
  );
}
