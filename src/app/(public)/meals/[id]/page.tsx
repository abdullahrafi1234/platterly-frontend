"use client";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/modules/auth/authContext";
import { getMealById } from "@/modules/meal/mealApi";
import { useCart } from "@/modules/order/cartContext";
import { getMealReviews } from "@/modules/review/reviewApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MealDetailsPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const { user } = useAuth();

  const handleAddToCart = () => {
    addToCart(meal, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  useEffect(() => {
    Promise.all([getMealById(id as string), getMealReviews(id as string)])
      .then(([mealRes, reviewRes]) => {
        setMeal(mealRes.data);
        setReviews(reviewRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!meal)
    return <p className="p-12 font-mono text-ink/50">Meal not found.</p>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {meal.image ? (
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full md:w-64 h-64 rounded-3xl object-cover"
          />
        ) : (
          <div className="w-full md:w-64 h-64 rounded-3xl bg-ink/5 flex items-center justify-center font-display text-4xl text-ink/30">
            {meal.name[0]}
          </div>
        )}

        <div className="flex-1">
          <h1 className="font-display text-3xl font-semibold mb-2">
            {meal.name}
          </h1>
          <Link
            href={`/providers/${meal.provider.id}`}
            className="inline-flex items-center gap-1 text-sm font-mono border border-ink/20 rounded-full px-3 py-1 mb-4 hover:bg-ink hover:text-cream transition-colors"
          >
            {meal.provider.businessName} →
          </Link>
          <p className="text-ink/70 mb-6">{meal.description}</p>
          <p className="font-mono text-chili text-2xl mb-6">
            ৳{meal.price.toFixed(2)}
          </p>
          {(!user || user.role === "CUSTOMER") && (
            <Button
              className="bg-chili hover:bg-chili/90 text-white"
              onClick={handleAddToCart}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="border-t-2 border-dashed border-ink/20 pt-8">
        <h2 className="font-display text-xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-ink/50 font-mono text-sm">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-ink/10 pb-4">
                <p className="font-medium">{review.customer.name}</p>
                <p className="text-mango">{"★".repeat(review.rating)}</p>
                {review.comment && (
                  <p className="text-ink/70">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
