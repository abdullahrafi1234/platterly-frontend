import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b-2 border-dashed border-ink/20 py-24 px-4">
      <div className="container mx-auto text-center">
        <p className="font-mono text-sm text-chili tracking-widest mb-4">
          ORDER #001 — TODAY&apos;S MENU
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6">
          Fresh meals, <br />
          <span className="text-chili italic">fast at your door.</span>
        </h1>
        <p className="text-lg text-ink/70 max-w-xl mx-auto mb-8">
          Order from local kitchens you trust — cooked fresh, delivered fast, no
          fuss.
        </p>
        <Link href="/meals">
          <Button size="lg" className="bg-chili hover:bg-chili/90 text-white">
            Browse Meals
          </Button>
        </Link>
      </div>
    </section>
  );
}
