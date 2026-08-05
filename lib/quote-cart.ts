export type QuoteCartItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  quantity: number;
};

const STORAGE_KEY = "afrotech-quote-cart";
export const QUOTE_CART_EVENT = "afrotech-quote-cart-updated";

function readCart(): QuoteCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QuoteCartItem[];
    return Array.isArray(parsed) ? parsed.filter((i) => i?.id && i?.name) : [];
  } catch {
    return [];
  }
}

function writeCart(items: QuoteCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(QUOTE_CART_EVENT));
}

export function getQuoteCart(): QuoteCartItem[] {
  return readCart();
}

export function getQuoteCartCount(): number {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToQuoteCart(item: Omit<QuoteCartItem, "quantity">, quantity = 1) {
  const items = readCart();
  const existing = items.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ ...item, quantity });
  }
  writeCart(items);
}

export function removeFromQuoteCart(id: string) {
  writeCart(readCart().filter((i) => i.id !== id));
}

export function updateQuoteCartQuantity(id: string, quantity: number) {
  const items = readCart();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return;
  if (quantity <= 0) {
    items.splice(idx, 1);
  } else {
    items[idx].quantity = quantity;
  }
  writeCart(items);
}

export function clearQuoteCart() {
  writeCart([]);
}

export function formatQuoteCartForMessage(items: QuoteCartItem[]): string {
  if (!items.length) return "";
  return items.map((i) => `${i.quantity}× ${i.name} (${i.brand})`).join("\n");
}
