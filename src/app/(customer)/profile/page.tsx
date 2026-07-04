"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/modules/auth/authApi";
import { useAuth } from "@/modules/auth/authContext";
import { useState } from "react";

export default function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  if (loading)
    return (
      <p className="container mx-auto px-4 py-12 font-mono text-ink/50">
        Loading...
      </p>
    );
  if (!user) return null;

  const startEdit = () => {
    setForm({
      name: user.name,
      phone: user.phone || "",
      address: user.address || "",
    });
    setEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      await refreshUser();
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="font-display text-3xl font-semibold mb-8">My Profile</h1>

      <div className="border rounded-2xl p-6">
        {!editing ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-ink/50">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-ink/50">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-ink/50">Phone</p>
              <p className="font-medium">{user.phone || "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-ink/50">Address</p>
              <p className="font-medium">{user.address || "Not set"}</p>
            </div>
            <Button onClick={startEdit}>Edit Profile</Button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
