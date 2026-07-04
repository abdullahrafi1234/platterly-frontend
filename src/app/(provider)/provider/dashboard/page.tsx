"use client";

import { getMyMeals } from "@/modules/meal/mealApi";
import { getProviderOrders } from "@/modules/order/orderApi";
import { useEffect, useState } from "react";

export default function ProviderDashboard() {
  const [stats, setStats] = useState({ meals: 0, orders: 0, pending: 0 });

  useEffect(() => {
    Promise.all([getMyMeals(), getProviderOrders()]).then(
      ([mealsRes, ordersRes]) => {
        const orders = ordersRes.data;
        setStats({
          meals: mealsRes.data.length,
          orders: orders.length,
          pending: orders.filter(
            (o: any) => o.status !== "DELIVERED" && o.status !== "CANCELLED",
          ).length,
        });
      },
    );
  }, []);

  const cards = [
    { label: "Total Meals", value: stats.meals },
    { label: "Total Orders", value: stats.orders },
    { label: "Pending Orders", value: stats.pending },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="border rounded-2xl p-6">
            <p className="text-sm text-ink/50 mb-1">{card.label}</p>
            <p className="font-display text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
