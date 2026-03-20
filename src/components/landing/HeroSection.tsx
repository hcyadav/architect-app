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

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <FadeIn className="max-w-3xl space-y-8">
              <div className="inline-flex items-center rounded-full border border-white/30 bg-black/10 px-4 py-1.5 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  Specialized in space creation
                </span>
              </div>

              <h1 className="font-serif text-2xl font-medium leading-[1.1] text-white  md:text-4xl lg:text-6xl xl:text-6xl mb-2">
                {title.includes("Lifetime") ? title : "Create spaces that last a lifetime."}
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 sm:flex-row sm:items-center sm:justify-between md:justify-start">
                <p className="max-w-md text-sm text-white/80 leading-relaxed md:text-md">
                  {description}
                </p>
                <Link
                  href={ctaHref}
                  className={"group inline-flex items-center gap-3 w-full md:w-72 justify-center rounded-full bg-orange-600 py-3 px-3 sm:px-4 md:px-6 lg:px-8 text-sm font-bold text-white transition-all hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/20"}
                >
                  {ctaLabel}
                  <svg
                    width="14"
                    height="14"
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
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
