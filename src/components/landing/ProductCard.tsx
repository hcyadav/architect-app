import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LandingProduct } from "@/components/landing/types";

interface ProductCardProps {
  product: LandingProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-[2rem] bg-white p-4 transition-all hover:shadow-2xl hover:shadow-slate-200/50">
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-50">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-medium leading-tight text-slate-900">
              {product.title}
            </h3>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {product.subCategory || product.category}
            </p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-900 transition-all hover:bg-orange-600 hover:border-orange-600 hover:text-white">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="font-sans text-base font-bold text-slate-900">
            {product.price ? `$${product.price}` : "$470"}
          </span>
          {/* Placeholder for "before" price to match design */}
          <span className="text-xs text-slate-300 line-through">
            $550
          </span>
        </div>
      </div>
    </div>
  );
}

