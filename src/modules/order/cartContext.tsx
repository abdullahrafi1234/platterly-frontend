"use client";

import { Meal } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem {
  meal: Meal;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (meal: Meal, quantity?: number) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("platterly_cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("platterly_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (meal: Meal, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.meal.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { meal, quantity }];
    });
  };

  const removeFromCart = (mealId: string) => {
    setItems((prev) => prev.filter((item) => item.meal.id !== mealId));
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.meal.id === mealId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.meal.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
