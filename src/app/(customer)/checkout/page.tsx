"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/modules/order/cartContext";
import { createOrder } from "@/modules/order/orderApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createOrder({
        deliveryAddress: address,
        items: items.map((item) => ({
          mealId: item.meal.id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      router.push("/orders");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <p className="container mx-auto px-4 py-20 text-center font-mono text-ink/50">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <h1 className="font-display text-3xl font-semibold mb-8">Checkout</h1>

      <div className="border rounded-2xl p-4 mb-6 space-y-2">
        {items.map((item) => (
          <div key={item.meal.id} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.meal.name}
            </span>
            <span className="font-mono">
              ৳{(item.meal.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-dashed border-ink/20 pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span className="font-mono text-chili">৳{total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Delivery address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-chili hover:bg-chili/90 text-white"
          disabled={loading}
        >
          {loading ? "Placing order..." : "Place Order (Cash on Delivery)"}
        </Button>
      </form>
    </div>
  );
}
