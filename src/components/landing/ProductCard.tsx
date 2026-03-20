import Image from "next/image";
import Link from "next/link";
import type { LandingProduct } from "@/components/landing/types";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: LandingProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col h-full rounded-[2rem] bg-white p-4 transition-all hover:shadow-2xl hover:shadow-slate-200/50">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-50">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-unset transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-10"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-2 pt-3">

        {/* Title + Category */}
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-medium leading-tight text-slate-900 line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>

          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {product.subCategory || product.category}
          </p>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-3">
          <span className="font-sans text-base font-bold text-slate-900">
            {product.price ? `₹${product.price}` : "₹470"}
          </span>
          <span className="text-xs text-slate-300 line-through">
            ₹550
          </span>
        </div>

        {/* Button pinned at bottom */}
        <div className="mt-auto pt-4">
          <Button className="w-full">
            <Link href={`/products/${product.id}`}>
              See Details
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}

