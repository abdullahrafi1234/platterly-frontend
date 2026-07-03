import { getAllCategories } from "@/modules/category/categoryApi";

export default async function Categories() {
  const res = await getAllCategories();
  const categories = res.data || [];

  return (
    <section className="py-16 px-4 border-b-2 border-dashed border-ink/20">
      <div className="container mx-auto">
        <p className="font-mono text-sm text-herb tracking-widest mb-2">
          02 — CATEGORIES
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
          Browse by cuisine
        </h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat: { id: string; name: string }) => (
            <span
              key={cat.id}
              className="border-2 border-ink px-5 py-2 rounded-full font-medium hover:bg-ink hover:text-cream transition-colors cursor-pointer"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
