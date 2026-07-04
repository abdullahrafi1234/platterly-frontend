"use client";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { getAllUsers, updateUserStatus } from "@/modules/admin/adminApi";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () =>
    getAllUsers()
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    await updateUserStatus(id, newStatus);
    loadUsers();
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Users</h1>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-ink/50">
                {user.email} • {user.role}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-mono px-3 py-1 rounded-full ${
                  user.status === "ACTIVE"
                    ? "bg-herb/10 text-herb"
                    : "bg-chili/10 text-chili"
                }`}
              >
                {user.status}
              </span>
              {user.role !== "ADMIN" && (
                <Button
                  size="sm"
                  variant={user.status === "ACTIVE" ? "destructive" : "outline"}
                  onClick={() => toggleStatus(user.id, user.status)}
                >
                  {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
