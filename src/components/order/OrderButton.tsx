"use client";

import { Icon } from "../Icon";
import { useOrder } from "./OrderProvider";

export function OrderButton({ productId, label }: { productId: string; label: string }) {
  const { openOrder } = useOrder();
  return (
    <button
      className="cart-btn"
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => openOrder(productId, e.currentTarget)}
    >
      <Icon name="cart" />
    </button>
  );
}
