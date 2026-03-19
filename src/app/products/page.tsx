import Link from "next/link";

import prisma from "@/lib/prisma";
import { ProductCard } from "@/components/landing/ProductCard";
import { cn } from "@/lib/utils";
import type { LandingProduct } from "@/components/landing/types";

export const revalidate = 300;

const PAGE_SIZE = 9;

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

function readPage(value?: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function toProduct(product: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  subCategory?: string | null;
}): LandingProduct {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    category: product.category as LandingProduct["category"],
    subCategory: product.subCategory || undefined,
  };
}

import { FadeIn } from "@/components/landing/FadeIn";

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const requestedPage = readPage(params.page);

  const totalProducts = await prisma.product.count();
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      category: true,
      subCategory: true,
      price: true,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <FadeIn className="space-y-12" direction="none">
        <div className="space-y-6 pb-6 border-b border-slate-100">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Our Collection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-medium text-slate-900 tracking-tight font-serif leading-tight">
              All Products
            </h1>
            <p className="text-slate-500 font-light text-xl max-w-2xl leading-relaxed">
              Browse our complete collection of design-led products and crafted spaces.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <FadeIn key={product.id} delayMs={i * 50} direction="up">
              <ProductCard product={toProduct(product)} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-4">
          <Link
            href={`/products?page=${Math.max(1, currentPage - 1)}`}
            aria-disabled={currentPage === 1}
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-xs font-bold uppercase tracking-widest text-slate-600 transition hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50",
              currentPage === 1 && "pointer-events-none opacity-40",
            )}
          >
            Previous
          </Link>
          <div className="flex h-12 items-center justify-center rounded-full bg-slate-900 px-6 text-xs font-bold uppercase tracking-widest text-white">
            Page {currentPage} / {totalPages}
          </div>
          <Link
            href={`/products?page=${Math.min(totalPages, currentPage + 1)}`}
            aria-disabled={currentPage === totalPages}
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-xs font-bold uppercase tracking-widest text-slate-600 transition hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50",
              currentPage === totalPages && "pointer-events-none opacity-40",
            )}
          >
            Next
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

