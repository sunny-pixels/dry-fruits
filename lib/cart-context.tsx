"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  ReactNode,
} from "react";
import type { Product, Variant } from "@/lib/products";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  variantLabel: string;
  grams: number;
  price: number;
  qty: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; item: CartItem }
  | { type: "UPDATE_QTY"; key: string; qty: number }
  | { type: "REMOVE"; key: string }
  | { type: "CLEAR" };

const STORAGE_KEY = "nutrafi-cart";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.key === action.item.key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === action.item.key ? { ...i, qty: i.qty + action.item.qty } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "UPDATE_QTY":
      return {
        items: state.items
          .map((i) => (i.key === action.key ? { ...i, qty: action.qty } : i))
          .filter((i) => i.qty > 0),
      };
    case "REMOVE":
      return { items: state.items.filter((i) => i.key !== action.key) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, variant: Variant, qty: number) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      // ignore corrupt storage
    }
    // One-time read of browser storage, unavailable during SSR — cannot be computed at render time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore write failures (e.g. private browsing quota)
    }
  }, [state.items, hydrated]);

  const addItem = (product: Product, variant: Variant, qty: number) => {
    dispatch({
      type: "ADD",
      item: {
        key: `${product.id}-${variant.label}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        category: product.category,
        variantLabel: variant.label,
        grams: variant.grams,
        price: variant.price,
        qty,
      },
    });
  };

  const updateQty = (key: string, qty: number) => dispatch({ type: "UPDATE_QTY", key, qty });
  const removeItem = (key: string) => dispatch({ type: "REMOVE", key });
  const clear = () => dispatch({ type: "CLEAR" });

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [state.items]
  );
  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty, 0),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, updateQty, removeItem, clear, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
