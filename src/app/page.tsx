import Link from "next/link";
import prisma from "@/lib/prisma";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { ProductCard } from "@/components/landing/ProductCard";
import { BestProduct } from "@/components/landing/BestProduct";
import { HappyPeople } from "@/components/landing/HappyPeople";
import { ClientLogos } from "@/components/landing/ClientLogos";
import { ContactSection } from "@/components/landing/ContactSection";
import { cn } from "@/lib/utils";
import type { LandingProduct } from "@/components/landing/types";
import { FadeIn } from "@/components/landing/FadeIn";
import { Separator } from "@/components/ui/separator";

export const revalidate = 300;

const HOME_PAGE_SIZE = 7;

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

function toProduct(product: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  subCategory?: string | null;
  price?: number | null;
  mrp?: number | null;
  discountPercentage?: number | null;
}): LandingProduct {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    category: product.category as LandingProduct["category"],
    subCategory: product.subCategory || undefined,
    price: product.price || undefined,
    mrp: product.mrp || undefined,
    discountPercentage: product.discountPercentage || undefined,
  };
}

function readPage(value?: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = readPage(resolvedSearchParams.page);

  const [totalProducts, featured, testimonials] = await Promise.all([
    prisma.product.count(),
    prisma.product.findFirst({
      where: { isBestProduct: true },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        category: true,
        subCategory: true,
        price: true,
        mrp: true,
        discountPercentage: true,
      },
    }),
    prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        product: {
          select: {
            imageUrl: true,
            id: true,
            title: true,
            price: true,
            mrp: true,
            discountPercentage: true,
          }
        }
      }
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalProducts / HOME_PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * HOME_PAGE_SIZE,
    take: HOME_PAGE_SIZE,
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      category: true,
      subCategory: true,
      price: true,
      mrp: true,
      discountPercentage: true,
    },
  });

  const mappedProducts = products.map((p: any) => toProduct(p));
  const heroProduct = featured ? toProduct(featured as any) : mappedProducts[0];

  return (
    <div className="bg-background">
      <HeroSection
        title="Create spaces that last a lifetime."
        description="From concept to execution, we build homes and workspaces with calm detail and premium craftsmanship."
        ctaLabel="EXPLORE COLLECTIONS"
        ctaHref="/products"
        backgroundImage={"/hero.png"}
      />

      <FeatureShowcase />

      {/* <ExperienceSection /> */}

      {/* Latest Collection */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">The Catalog</span>
            </div>
            <h2 className="font-sans text-3xl font-medium tracking-tight text-slate-700 md:text-5xl">
              Explore latest collection
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mappedProducts.map((product, i) => (
            <FadeIn key={product.id} delayMs={i * 100} direction="up">
              <ProductCard product={product} />
            </FadeIn>
          ))}
          <FadeIn key="cta-redirect" delayMs={mappedProducts.length * 100} direction="up">
            <Link
              href="/residential"
              className="group relative flex flex-col items-center justify-center h-full rounded-[2rem] bg-orange-50 border-2 border-dashed border-orange-200 p-8 transition-all hover:bg-orange-100/50 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-200/50 text-center min-h-[400px]"
            >
              <div className="space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition-transform group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3 className="font-sans text-2xl font-medium tracking-tight text-slate-900 leading-tight">
                  Furniture that blends with your personal style
                </h3>
                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-600">
                  EXPLORE NOW
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                    <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>

        <div className="mt-16 flex items-center justify-center gap-4">
          <Link
            href={`/?page=${Math.max(1, currentPage - 1)}`}
            className={cn(
              "p-4 rounded-full border border-slate-200 bg-white transition hover:bg-slate-50 hover:border-slate-300",
              currentPage === 1 && "pointer-events-none opacity-20"
            )}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </Link>
          <span className="text-sm font-bold tracking-widest text-slate-400">
            {currentPage} / {totalPages}
          </span>
          <Link
            href={`/?page=${Math.min(totalPages, currentPage + 1)}`}
            className={cn(
              "p-4 rounded-full border border-slate-200 bg-white transition hover:bg-slate-50 hover:border-slate-300",
              currentPage === totalPages && "pointer-events-none opacity-20"
            )}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </Link>
        </div>
      </section>

      {/* {featured && <BestProduct product={toProduct(featured)} />} */}
      <HappyPeople testimonials={testimonials} />

      <ClientLogos />
      <ExperienceSection />

      <ContactSection />
    </div>
  );
}

