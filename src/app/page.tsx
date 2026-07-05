import Categories from "@/components/home/Categories";
import FeaturedMeals from "@/components/home/FeaturedMeals";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <Categories></Categories>
      <FeaturedMeals></FeaturedMeals>
      <HowItWorks />
    </>
  );
}
