"use client";

import { useAuth } from "@/modules/auth/authContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <p className="container mx-auto px-4 py-12 font-mono text-ink/50">
        Loading...
      </p>
    );
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="font-display text-3xl font-semibold mb-8">My Profile</h1>

      <div className="border rounded-2xl p-6 space-y-4">
        <div>
          <p className="text-sm text-ink/50">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-ink/50">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-ink/50">Role</p>
          <p className="font-medium">{user.role}</p>
        </div>
      </div>
    </div>
  );
}
