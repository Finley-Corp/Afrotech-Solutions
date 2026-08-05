"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addToQuoteCart,
  clearQuoteCart,
  getQuoteCart,
  getQuoteCartCount,
  QUOTE_CART_EVENT,
  removeFromQuoteCart,
  updateQuoteCartQuantity,
  type QuoteCartItem,
} from "@/lib/quote-cart";

export function useQuoteCart() {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    const next = getQuoteCart();
    setItems(next);
    setCount(getQuoteCartCount());
  }, []);

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener(QUOTE_CART_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(QUOTE_CART_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refresh]);

  return {
    items,
    count,
    add: (item: Omit<QuoteCartItem, "quantity">, quantity = 1) => {
      addToQuoteCart(item, quantity);
      refresh();
    },
    remove: (id: string) => {
      removeFromQuoteCart(id);
      refresh();
    },
    setQuantity: (id: string, quantity: number) => {
      updateQuoteCartQuantity(id, quantity);
      refresh();
    },
    clear: () => {
      clearQuoteCart();
      refresh();
    },
  };
}
