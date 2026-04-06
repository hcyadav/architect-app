"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/landing/Container";
import { FadeIn } from "@/components/landing/FadeIn";
import { SectionHeader } from "@/components/landing/SectionHeader";
import type { LandingProduct } from "@/components/landing/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturedCarouselProps {
  products: LandingProduct[];
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const slides = useMemo(() => products.slice(0, 5), [products]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const next = () => setActiveIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section>
      <Container>
        <FadeIn className="space-y-10">
          <SectionHeader
            label="Featured"
            title="Signature Work, Curated"
            description="A refined selection of projects that define our studio's approach to proportion, light, and materiality."
          />

          <div className="relative h-[480px] overflow-hidden rounded-2xl bg-black md:h-[560px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-300 ease-out",
                  index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <p className="text-xs uppercase tracking-wide text-white/75">{slide.subCategory || slide.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">{slide.title}</h3>
                  <p className="mt-3 max-w-2xl text-white/80">{slide.description}</p>
                  <Link
                    href={`/products/${slide.slug || slide.id}`}
                    className={cn( "mt-6 rounded-2xl")}
                  >
                    Explore Details
                  </Link>
                </div>
              </div>
            ))}

            {slides.length > 1 ? (
              <>
                <div className="absolute inset-x-0 top-6 z-20 flex justify-between px-6">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={prev}
                    className="rounded-2xl"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="size-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={next}
                    className="rounded-2xl"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                </div>

                <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2">
                  {slides.map((slide, index) => (
                    <Button
                      key={slide.id}
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "rounded-full p-0 transition-all duration-300 ease-out",
                        index === activeIndex
                          ? "w-8 bg-white hover:bg-white"
                          : "w-2.5 bg-white/45 hover:bg-white/70"
                      )}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
