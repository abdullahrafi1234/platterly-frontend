"use client";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategories } from "@/modules/category/categoryApi";
import {
  createMeal,
  deleteMeal,
  getMyMeals,
  updateMeal,
} from "@/modules/meal/mealApi";
import { Category, Meal } from "@/types";
import { useEffect, useState } from "react";

export default function ProviderMenu() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Meal | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const loadMeals = () =>
    getMyMeals()
      .then((res) => setMeals(res.data))
      .finally(() => setPageLoading(false));

  useEffect(() => {
    loadMeals();
    getAllCategories().then((res) => setCategories(res.data));
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      image: "",
    });
    setOpen(true);
  };

  const openEdit = (meal: Meal) => {
    setEditing(meal);
    setForm({
      name: meal.name,
      description: meal.description || "",
      price: String(meal.price),
      categoryId: meal.category.id,
      image: meal.image || "",
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        image: form.image || undefined,
      };
      if (editing) {
        await updateMeal(editing.id, payload);
      } else {
        await createMeal(payload);
      }
      setOpen(false);
      loadMeals();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this meal?")) return;
    await deleteMeal(id);
    loadMeals();
  };

  if (pageLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl font-semibold">My Menu</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button
                className="bg-chili hover:bg-chili/90 text-white"
                onClick={openAdd}
              >
                Add Meal
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Meal" : "Add Meal"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Meal name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <Input
                placeholder="Image URL (optional)"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <Select
                value={form.categoryId}
                onValueChange={(value) =>
                  setForm({ ...form, categoryId: value || "" })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                {editing ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="border rounded-2xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{meal.name}</p>
              <p className="text-sm text-ink/50">{meal.category.name}</p>
              <p className="font-mono text-chili">৳{meal.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEdit(meal)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(meal.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {meals.length === 0 && (
        <p className="text-ink/50 font-mono">No meals added yet.</p>
      )}
    </div>
  );
}
