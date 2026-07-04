"use client";

import { Button } from "@/components/ui/button";
import { cancelOrder, getMyOrders } from "@/modules/order/orderApi";
import { useEffect, useState } from "react";

export default function CustomerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () =>
    getMyOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this order?")) return;
    await cancelOrder(id);
    loadOrders();
  };

  if (loading)
    return (
      <p className="container mx-auto px-4 py-12 font-mono text-ink/50">
        Loading...
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="font-display text-3xl font-semibold mb-8">My Orders</h1>

      {orders.length === 0 && (
        <p className="font-mono text-ink/50">No orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl p-4">
            <div className="flex justify-between items-start mb-3">
              <p className="text-sm text-ink/50">{order.deliveryAddress}</p>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-ink/5">
                {order.status}
              </span>
            </div>

            <ul className="text-sm text-ink/70 mb-3">
              {order.items.map((item: any) => (
                <li key={item.id}>
                  {item.quantity}x {item.meal.name} — ৳{item.price}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center">
              <p className="font-mono text-chili">
                Total: ৳{order.totalAmount.toFixed(2)}
              </p>
              {order.status === "PLACED" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancel(order.id)}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
