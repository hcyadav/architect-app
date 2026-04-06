"use client";

import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";


interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number | null;
  mrp: number | null;
  discountPercentage: number | null;
}

interface Testimonial {
  id: string;
  clientName: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  imageUrl: string | null;
  productId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  product?: Product | null;
}

interface HappyPeopleProps {
  testimonials: Testimonial[];
}

export function HappyPeople({ testimonials }: HappyPeopleProps) {
  const router = useRouter();
  if (!testimonials || testimonials.length === 0) return null;
  console.log("testimonials", testimonials[0]?.productId);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-8">
            <FadeIn>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                  Testimonials
                </span>
              </div>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-slate-900 md:text-6xl">
                Hear from happy customers
              </h2>
            </FadeIn>
            <div className="hidden md:flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>

          <CarouselContent>
            {testimonials.map((item) => (
              <CarouselItem key={item.id} className="basis-full">
                <div className="grid lg:grid-cols-12 gap-16 items-center px-1">
                  <div className="lg:col-span-7 space-y-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < item.rating
                            ? "fill-orange-500 text-orange-500"
                            : "fill-slate-200 text-slate-200"
                            }`}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <p className="font-serif text-2xl md:text-3xl italic leading-relaxed text-slate-700">
                        &quot;{item.content}&quot;
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-white shadow-lg transition-transform hover:scale-110">
                        <AvatarImage src={item.product?.imageUrl || undefined} alt={item.clientName} />
                        <AvatarFallback className="bg-orange-50 text-orange-600 font-bold">
                          {item.clientName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-serif text-lg font-medium text-slate-900">
                          {item.clientName}
                        </h4>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {item.role || "Verified Client"} {item.company && `at ${item.company}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <FadeIn delayMs={300}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden border border-slate-100 rounded-lg shadow-xl shadow-slate-100">
                        <Image
                          src={item.product?.imageUrl || "/placeholder-product.jpg"}
                          alt={item.product?.title || "Product"}
                          fill
                          className="object-unset transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between border border-white/20 shadow-lg">
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                                Featured Product
                              </p>
                              <p className="font-sans text-lg font-bold text-slate-900 line-clamp-1">
                                {item.product?.title}
                              </p>
                            </div>
                            <button className="h-10 w-10 shrink-0 rounded-full bg-orange-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95" onClick={() => router.push(`/products/${item?.productId}`)}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex md:hidden justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
