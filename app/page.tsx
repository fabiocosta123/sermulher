import { Hero } from "@/components/Hero";
import { ProductHighlight } from "@/components/ProductHighlight"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductHighlight />
    </main>
  );
}