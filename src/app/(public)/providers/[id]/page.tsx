"use client";

import Loader from "@/components/shared/Loader";
import { getProviderById } from "@/modules/provider/providerApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProviderPage() {
  const { id } = useParams();
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProviderById(id as string)
      .then((res) => setProvider(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!provider)
    return <p className="p-12 font-mono text-ink/50">Provider not found.</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 text-center sm:text-left">
        {provider.logo ? (
          <img
            src={provider.logo}
            alt={provider.businessName}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-ink/5 flex items-center justify-center font-display text-3xl text-ink/30">
            {provider.businessName[0]}
          </div>
        )}
        <div>
          <h1 className="font-display text-3xl font-semibold mb-1">
            {provider.businessName}
          </h1>
          <p className="text-ink/60">
            {provider.description || "No description available."}
          </p>
        </div>
      </div>

      <h2 className="font-display text-xl font-semibold mb-6">Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {provider.meals.map((meal: any) => (
          <Link
            key={meal.id}
            href={`/meals/${meal.id}`}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
          >
            {meal.image ? (
              <img
                src={meal.image}
                alt={meal.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-ink/5 mb-3 flex items-center justify-center font-display text-xl text-ink/30">
                {meal.name[0]}
              </div>
            )}
            <h3 className="font-semibold">{meal.name}</h3>
            <p className="font-mono text-chili text-sm">
              ৳{meal.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>

      {provider.meals.length === 0 && (
        <p className="text-ink/50 font-mono">No meals available yet.</p>
      )}
    </div>
  );
}
