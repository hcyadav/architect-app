"use client";

import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  clientName: string;
  role?: string;
  content: string;
  imageUrl?: string;
}

interface HappyPeopleProps {
  testimonials: Testimonial[];
}

export function HappyPeople({ testimonials }: HappyPeopleProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-12">
            <FadeIn>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Testimonials</span>
              </div>
              <h2 className="mt-8 font-serif text-5xl font-medium leading-tight text-slate-900 md:text-6xl">
                Hear from happy customers
              </h2>
            </FadeIn>

            <div className="space-y-8">
              {testimonials.slice(0, 3).map((item, i) => (
                <FadeIn key={item.id} delayMs={i * 100}>
                  <div className="flex gap-6 group">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-xl transition-transform group-hover:scale-110">
                      <AvatarImage src={item.imageUrl} alt={item.clientName} />
                      <AvatarFallback className="bg-orange-50 text-orange-600 font-bold">
                        {item.clientName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-medium text-slate-900">{item.clientName}</h4>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.role || "Client"}</p>
                      <p className="mt-2 text-slate-500 max-w-md leading-relaxed">
                        &quot;{item.content}&quot;
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <FadeIn delayMs={300}>
               <div className="relative aspect-4/5 overflow-hidden rounded-[3rem] border">
                 <Image 
                   src="/uploads/1772704211002-sofa1.jpg" 
                   alt="Interior" 
                   fill 
                   className="object-cover"
                 />
                 <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between border">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Arm Chair</p>
                          <p className="font-sans text-xl font-bold text-slate-900">$220 <span className="text-sm font-normal text-slate-400 line-through ml-2">$265</span></p>
                       </div>
                       <button className="h-12 w-12 rounded-full bg-orange-600 text-white flex items-center justify-center transition-transform hover:scale-110">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                       </button>
                    </div>
                 </div>
               </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
