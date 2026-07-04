"use client";

import Loader from "@/components/shared/Loader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/modules/category/categoryApi";
import { getAllMeals } from "@/modules/meal/mealApi";
import { Category, Meal } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    const timeout = setTimeout(() => {
      getAllMeals(params)
        .then((res) => setMeals(res.data))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timeout);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold mb-8">All Meals</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        <Input
          placeholder="Search meals..."
          className="max-w-xs"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <Select
          value={filters.category}
          onValueChange={(value) =>
            setFilters({
              ...filters,
              category: !value || value === "all" ? "" : value,
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min price"
          className="w-32"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Max price"
          className="w-32"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </div>

      {/* Meals Grid */}
      {loading ? (
        <Loader></Loader>
      ) : meals.length === 0 ? (
        <p className="font-mono text-ink/50">No meals found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <Link
              key={meal.id}
              href={`/meals/${meal.id}`}
              className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {meal.image ? (
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-cream"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-ink/5 mb-4 flex items-center justify-center text-ink/30 font-display text-2xl">
                  {meal.name[0]}
                </div>
              )}
              <h3 className="font-display text-lg font-semibold">
                {meal.name}
              </h3>
              <p className="text-sm text-ink/50 mb-2">
                {meal.provider.businessName}
              </p>
              <p className="font-mono text-chili">৳{meal.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
