const steps = [
  {
    title: "Browse the menu",
    desc: "Explore meals from local kitchens near you, sorted by cuisine and price.",
  },
  {
    title: "Place your order",
    desc: "Add what you love to your cart and check out — cash on delivery, no fuss.",
  },
  {
    title: "Enjoy fresh food",
    desc: "Track your order as it's prepared, then delivered fresh to your door.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <p className="font-mono text-sm text-herb tracking-widest mb-2">
          HOW IT WORKS
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12">
          Three steps to your next meal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <p className="font-display text-6xl text-ink/10 mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-ink/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
