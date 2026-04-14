"use client";

import { FadeIn } from "./FadeIn";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

export function FeatureShowcase() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-5xl text-center">
        <FadeIn>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Why from us?</span>
          </div>

          <h2 className="font-sans text-3xl font-medium leading-[1.3] text-slate-700 md:text-5xl lg:text-6xl relative">
            We are crafting amazing{" "}

            {/* Hover Card 1 – Seating / Armchairs */}
            <HoverCard>
              <HoverCardTrigger>
                <Image
                  className="inline-block mx-1 -translate-y-1 rounded-md cursor-pointer ring-2 ring-transparent hover:ring-orange-400 transition-all"
                  src="/uploads/hover/without-color.jpg"
                  width={56}
                  height={56}
                  alt="Seating preview"
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-0">
                <div className="flex gap-3">
                  <Image
                    className="rounded-md object-contain"
                    src="/uploads/hover/without-color.jpg"
                    width={200}
                    height={200}
                    alt="Seating"
                  />
                  <div className="flex flex-col gap-1 mt-4">
                    <h4 className="text-sm font-semibold text-slate-900">Premium Seating</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Handcrafted armchairs &amp; lounge seats built with premium fabrics and ergonomic design for lasting comfort.
                    </p>
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-orange-600 font-bold">100+ designs available</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{" "}

            product that{" "}

            {/* Hover Card 2 – Sofas & Living */}
            <HoverCard>
              <HoverCardTrigger>
                <Image
                  className="inline-block mx-1 -translate-y-1 rounded-md cursor-pointer ring-2 ring-transparent hover:ring-orange-400 transition-all"
                  src="/uploads/hover/color.jpg"
                  width={56}
                  height={56}
                  alt="Sofas preview"
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-0">
                <div className="flex gap-3">
                  <Image
                    className="rounded-md object-contain"
                    src="/uploads/hover/color.jpg"
                    width={200}
                    height={200}
                    alt="Sofas"
                  />
                  <div className="flex flex-col gap-1 mt-4 mb-2">
                    <h4 className="text-sm font-semibold text-slate-900">Luxury Sofas</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Statement sofas that transform your living space — available in sectional, L-shape, and classic silhouettes.
                    </p>
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-orange-600 font-bold">Eco-friendly materials</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{" "}

            delight, constantly uplift the home, office{" "}

            {/* Hover Card 3 – Lighting & Ambience */}
            <HoverCard>
              <HoverCardTrigger>
                <Image
                  className="inline-block mx-1 -translate-y-1 rounded-md cursor-pointer ring-2 ring-transparent hover:ring-orange-400 transition-all"
                  src="/uploads/hover/without-color.jpg"
                  width={56}
                  height={56}
                  alt="Lighting preview"
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-0">
                <div className="flex gap-3">
                  <Image
                    className="rounded-md object-contain"
                    src="/uploads/hover/without-color.jpg"
                    width={200}
                    height={200}
                    alt="Seating"
                  />
                  <div className="flex flex-col gap-1 mt-4">
                    <h4 className="text-sm font-semibold text-slate-900">Premium Seating</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Handcrafted armchairs &amp; lounge seats built with premium fabrics and ergonomic design for lasting comfort.
                    </p>
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-orange-600 font-bold">100+ designs available</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{" "}

            environment
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-600" />
              <span className="text-sm font-medium uppercase tracking-widest text-slate-500">Premium Wood</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-600" />
              <span className="text-sm font-medium uppercase tracking-widest text-slate-500">Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-600" />
              <span className="text-sm font-medium uppercase tracking-widest text-slate-500">Fast Delivery</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

