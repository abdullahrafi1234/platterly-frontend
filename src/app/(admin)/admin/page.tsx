"use client";

import Loader from "@/components/shared/Loader";
import { getAllOrders, getAllUsers } from "@/modules/admin/adminApi";
import { useEffect, useState } from "react";

export default function AdminOverview() {
  const [stats, setStats] = useState({ users: 0, providers: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllOrders()])
      .then(([usersRes, ordersRes]) => {
        const users = usersRes.data;
        setStats({
          users: users.filter((u: any) => u.role === "CUSTOMER").length,
          providers: users.filter((u: any) => u.role === "PROVIDER").length,
          orders: ordersRes.data.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { label: "Customers", value: stats.users },
    { label: "Providers", value: stats.providers },
    { label: "Total Orders", value: stats.orders },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Overview</h1>
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
