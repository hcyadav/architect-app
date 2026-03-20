"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/landing/Container";
import { FadeIn } from "@/components/landing/FadeIn";
import { SectionHeader } from "@/components/landing/SectionHeader";

type Logo = {
  name: string;
  src: string;
  url: string;
};

const logos: Logo[] = [
  { name: "Atelier One", src: "/next.svg", url: "https://chatgpt.com/" },
  { name: "Noble Structures", src: "/vercel.svg", url: "https://example.com" },
  { name: "Urban Crest", src: "/globe.svg", url: "https://example.com" },
  { name: "Stonefield", src: "/window.svg", url: "https://example.com" },
  { name: "Arcline", src: "/file.svg", url: "https://example.com" },
  { name: "Frame & Form", src: "/next.svg", url: "https://example.com" },
  { name: "Atelier One", src: "/next.svg", url: "https://chatgpt.com/" },
  { name: "Noble Structures", src: "/vercel.svg", url: "https://example.com" },
  { name: "Urban Crest", src: "/globe.svg", url: "https://example.com" },
  { name: "Stonefield", src: "/window.svg", url: "https://example.com" },
  { name: "Arcline", src: "/file.svg", url: "https://example.com" },
  { name: "Frame & Form", src: "/next.svg", url: "https://example.com" }
];

export function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ FIXED TYPE HERE
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🔁 Auto scroll
  useEffect(() => {
    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Handle loop back manually if user scrolls manually
    if (direction === "right") {
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth - 10
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    } else {
       if (scrollRef.current.scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
      }
    }
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });

      // loop back when end reached
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <section className="bg-background overflow-hidden">
      <Container>
        <FadeIn className="space-y-14 py-14">

          <SectionHeader
            align="center"
            label="Our Clients"
            title="Trusted by Leading Customers"
            description="We build long-term relationships through quality, trust, and consistent results."
          />

          <div className="relative group/carousel">
            {/* Left Button */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full border border-border/40 bg-white/80 backdrop-blur-md shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-2 transition-all duration-300 hover:bg-white hover:scale-110"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Carousel Content */}
            <div
              ref={scrollRef}
              onMouseEnter={stopAutoScroll}
              onMouseLeave={startAutoScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth px-2 no-scrollbar"
            >
              {logos.map((logo, index) => (
                <FadeIn key={index} delayMs={index * 50}>

                  <Link
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex min-w-[160px] h-24 items-center justify-center rounded-xl border border-border/40 bg-white/40 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={110}
                      height={28}
                      className="h-7 w-auto opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>

                </FadeIn>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full border border-border/40 bg-white/80 backdrop-blur-md shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:-translate-x-2 transition-all duration-300 hover:bg-white hover:scale-110"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

        </FadeIn>
      </Container>

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}