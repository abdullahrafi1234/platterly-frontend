"use client";

import { Button } from "@/components/ui/button";
import { getProviderOrders, updateOrderStatus } from "@/modules/order/orderApi";
import { useEffect, useState } from "react";

const nextStatus: Record<string, string> = {
  PLACED: "PREPARING",
  PREPARING: "READY",
  READY: "DELIVERED",
};

export default function ProviderOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () =>
    getProviderOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAdvance = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  if (loading) return <p className="font-mono text-ink/50">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Orders</h1>

      {orders.length === 0 && (
        <p className="text-ink/50 font-mono">No orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold">{order.customer.name}</p>
                <p className="text-sm text-ink/50">{order.deliveryAddress}</p>
              </div>
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

            <p className="font-mono text-chili mb-3">
              Total: ৳{order.totalAmount.toFixed(2)}
            </p>

            {nextStatus[order.status] && (
              <Button
                size="sm"
                onClick={() =>
                  handleAdvance(order.id, nextStatus[order.status])
                }
              >
                Mark as {nextStatus[order.status]}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
