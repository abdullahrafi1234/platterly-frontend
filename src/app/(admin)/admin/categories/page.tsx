"use client";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "@/modules/category/categoryApi";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCategories = () =>
    getAllCategories()
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(name);
      setName("");
      loadCategories();
      toast.success("Category added");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add category");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      loadCategories();
      toast.success("Category deleted");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Categories</h1>

      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        <Input
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1"
        />
        <Button
          type="submit"
          className="bg-chili hover:bg-chili/90 text-white w-full sm:w-auto"
        >
          Add
        </Button>
      </form>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border rounded-full px-4 py-2 flex items-center gap-3 text-sm"
          >
            {cat.name}
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-chili hover:underline"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
