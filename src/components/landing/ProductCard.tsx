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
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="font-sans text-base font-bold text-slate-900">
            ₹{product.price ? Number(product.price).toLocaleString() : "470"}
          </span>
          {product.mrp && (
            <span className="text-[10px] text-slate-400 line-through decoration-slate-500">
              M.R.P: ₹{Number(product.mrp).toLocaleString()}
            </span>
          )}
          {product.discountPercentage && (
            <span className="text-[10px] font-bold text-orange-600">
              ({product.discountPercentage}% off)
            </span>
          )}
        </div>

        <div className="mt-auto pt-4">
          <Link href={`/products/${product.id}`} className="w-full">
            <Button className="w-full cursor-pointer">
              See Details
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

