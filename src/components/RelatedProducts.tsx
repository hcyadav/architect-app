"use client";

import { Truck } from "lucide-react";
import Link from "next/link";

interface RelatedProduct {
  id: string;
  slug?: string;
  title: string;
  price: number;
  mrp?: number;
  discountPercentage?: number;
  imageUrl: string;
  category: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title: string;
}

export default function RelatedProducts({ products, title }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-6 pt-10 border-t border-gray-200">
      <h3 className="flex flex-wrap items-center gap-3 mb-8 animate-fade-slide-in">
        <span className="text-2xl md:text-3xl sm:text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
          {title}
        </span>

        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border border-green-200 animate-badge-pop animate-pulse-ring">
          <Truck className="w-3.5 h-3.5 animate-truck-slide shrink-0" />
          No delivery charges on eligible items
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug || product.id}`}
            className="group block"
          >
            <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 border border-gray-100 mb-4 transition-all duration-500 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2 min-h-10">
                {product.title}
              </h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {product.category}
              </p>
              <div className="pt-1 flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-bold text-gray-900 italic">₹{product.price.toLocaleString("en-IN")}</span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-[11px] text-gray-400 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                )}
                {product.discountPercentage && (
                  <span className="text-[10px] font-bold text-orange-600">
                    ({product.discountPercentage}% off)
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
