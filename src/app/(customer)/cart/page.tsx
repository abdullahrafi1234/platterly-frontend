"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/modules/order/cartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="font-mono text-ink/50 mb-4">Your cart is empty.</p>
        <Link href="/meals">
          <Button>Browse Meals</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="font-display text-3xl font-semibold mb-8">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.meal.id}
            className="flex items-center gap-4 border rounded-2xl p-4"
          >
            <div className="flex-1">
              <p className="font-semibold">{item.meal.name}</p>
              <p className="font-mono text-chili text-sm">
                ৳{item.meal.price.toFixed(2)}
              </p>
            </div>

            <Input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.meal.id, parseInt(e.target.value) || 1)
              }
              className="w-16"
            />

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFromCart(item.meal.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-dashed border-ink/20 pt-4 flex justify-between items-center mb-6">
        <span className="font-display text-xl font-semibold">Total</span>
        <span className="font-mono text-chili text-2xl">
          ৳{total.toFixed(2)}
        </span>
      </div>

      <Link href="/checkout">
        <Button
          className="w-full bg-chili hover:bg-chili/90 text-white"
          size="lg"
        >
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}
