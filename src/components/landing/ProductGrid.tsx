import { Container } from "@/components/landing/Container";
import { FadeIn } from "@/components/landing/FadeIn";
import { ProductCard } from "@/components/landing/ProductCard";
import { SectionHeader } from "@/components/landing/SectionHeader";
import type { LandingProduct } from "@/components/landing/types";

interface ProductGridProps {
  products: LandingProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <Container>
        <FadeIn className="space-y-12">
          <SectionHeader
            label="Collections"
            title="Designed For Distinct Spaces"
            description="From contemporary residences to executive workspaces, our projects balance restraint with character."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {products.map((product, index) => (
              <FadeIn key={product.id} delayMs={index * 50}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
