import { getAllMeals } from "@/modules/meal/mealApi";
import { Meal } from "@/types";

export const revalidate = 0;

export default async function FeaturedMeals() {
  const res = await getAllMeals();
  const meals: Meal[] = (res.data || []).slice(0, 6);

  return (
    <section className="py-20 px-4 border-b-2 border-dashed border-ink/20">
      <div className="container mx-auto">
        <p className="font-mono text-sm text-mango tracking-widest mb-2 text-center">
          TODAY&apos;S PICKS
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 text-center">
          Featured meals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {meal.image ? (
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-cream shadow-md"
                />
              ) : (
                <div className="w-36 h-36 rounded-full bg-ink/5 mb-6 flex items-center justify-center text-ink/30 font-display text-3xl">
                  {meal.name[0]}
                </div>
              )}

              <h3 className="font-display text-xl font-semibold mb-1">
                {meal.name}
              </h3>
              <p className="text-sm text-ink/50 mb-4">
                {meal.provider.businessName}
              </p>

              <p className="font-mono text-chili text-lg tracking-wide">
                ৳{meal.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {meals.length === 0 && (
          <p className="text-ink/50 font-mono text-center">
            No meals available yet.
          </p>
        )}
      </div>
    </section>
  );
}
