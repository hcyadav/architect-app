import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/landing/FadeIn";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
}

export function HeroSection({
  title,
  description,
  ctaLabel,
  ctaHref,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 md:aspect-[21/9]">
          <Image
            src={backgroundImage}
            alt="Aesthetica Hero"
            fill
            priority
            className="object-cover transition-transform duration-1000 hover:scale-105"
            sizes="100vw"
          />

          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end sm:justify-end p-4 sm:p-8 md:p-16 overflow-hidden">
            <FadeIn className="max-w-3xl space-y-2 sm:space-y-4 md:space-y-8">

              <div className="inline-flex items-center rounded-full border border-white/30 bg-black/20 px-2.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
                <span className="text-[7px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                  Specialized in space creation
                </span>
              </div>

              <h1 className="font-sans text-base sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.15] text-white">
                {title.includes("Lifetime") ? title : "Create spaces that last a lifetime."}
              </h1>

              <p className="max-w-md text-[11px] sm:text-sm md:text-base text-white/80 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {description}
              </p>

              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-2 w-fit rounded-full bg-orange-600 py-2 sm:py-3 px-4 sm:px-6 md:px-8 text-[10px] sm:text-sm font-bold text-white transition-all hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/20"
              >
                {ctaLabel}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
