"use client";

import Loader from "@/components/shared/Loader";
import { getAllOrders } from "@/modules/admin/adminApi";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">All Orders</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2"
          >
            <div className="min-w-0">
              <p className="font-semibold truncate">{order.customer.name}</p>
              <p className="text-sm text-ink/50 truncate">
                {order.customer.email}
              </p>
              <p className="text-sm text-ink/50 wrap-break-word">
                {order.deliveryAddress}
              </p>
            </div>
            <div className="flex sm:flex-col sm:items-end gap-2 shrink-0">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-ink/5 w-fit">
                {order.status}
              </span>
              <p className="font-mono text-chili">
                ৳{order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <p className="text-ink/50 font-mono">No orders yet.</p>
      )}
    </div>
  );
}
