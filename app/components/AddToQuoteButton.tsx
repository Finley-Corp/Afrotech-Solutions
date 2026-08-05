"use client";

import { Icon } from "@iconify/react";
import { useQuoteCart } from "@/app/hooks/useQuoteCart";

type Props = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  variant?: "card" | "detail";
};

export default function AddToQuoteButton({ id, slug, name, brand, variant = "card" }: Props) {
  const { add } = useQuoteCart();

  return (
    <button
      type="button"
      className={`add-to-quote-btn add-to-quote-btn--${variant}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add({ id, slug, name, brand });
      }}
    >
      <Icon icon="solar:cart-plus-linear" width={variant === "detail" ? 16 : 14} />
      Add to Quote
    </button>
  );
}
