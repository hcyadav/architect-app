"use client";

import { FadeIn } from "./FadeIn";
import { Armchair, Sofa, Lamp, Home } from "lucide-react";

export function FeatureShowcase() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-5xl text-center">
        <FadeIn>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Why from us?</span>
          </div>
          
          <h2 className="font-serif text-4xl font-medium leading-[1.3] text-slate-900 md:text-6xl lg:text-7xl">
            We are crafting amazing <Armchair className="inline-block h-10 w-10 text-slate-400 mx-2 -translate-y-1" /> product that{" "}
            <Sofa className="inline-block h-10 w-10 text-orange-600 mx-2 -translate-y-1" /> delight, constantly uplift the home, office{" "}
            <Lamp className="inline-block h-10 w-10 text-slate-400 mx-2 -translate-y-1" /> environment
          </h2>
          
          <div className="mt-12 flex flex-wrap justify-center gap-12 text-slate-400">
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
