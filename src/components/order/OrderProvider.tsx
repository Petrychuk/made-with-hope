"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Product } from "@/content/types";
import { OrderModal } from "./OrderModal";

type Ctx = { openOrder: (productId: string, trigger?: HTMLElement | null) => void };
const OrderContext = createContext<Ctx | null>(null);

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}

export function OrderProvider({
  children, products, locale, d,
}: { children: ReactNode; products: Product[]; locale: Locale; d: Dict }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const openOrder = useCallback(
    (id: string, el?: HTMLElement | null) => {
      setTrigger(el ?? null);
      setProduct(products.find((p) => p.slug === id && p.status !== "sold") ?? null);
    },
    [products],
  );

  return (
    <OrderContext.Provider value={{ openOrder }}>
      {children}
      {product && (
        <OrderModal
          key={product.slug}
          product={product}
          locale={locale}
          d={d}
          trigger={trigger}
          onClose={() => setProduct(null)}
        />
      )}
    </OrderContext.Provider>
  );
}
