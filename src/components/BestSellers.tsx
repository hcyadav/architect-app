"use client";

import Link from "next/link";
import { Truck } from "lucide-react";

interface BestSellerProduct {
  id: string;
  slug?: string;
  title: string;
  price: number;
  mrp?: number;
  discountPercentage?: number;
  imageUrl: string;
  category: string;
  subCategory?: string;
}

interface BestSellersProps {
  products: BestSellerProduct[];
  title?: string;
}

export default function BestSellers({ products, title = "25 Best Seller Products" }: BestSellersProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-8 pt-16 border-t border-gray-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="space-y-2">
          <h3 className="text-3xl font-sans text-gray-900 tracking-tight" style={{ color: "#374151" }}>{title}</h3>
          <div className="flex items-center gap-2 text-green-600">
            <Truck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Free delivery on eligible orders</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-light italic">Discover our most loved architectural masterpieces.</p>
      </div>

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
                {product.subCategory || product.category}
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
    </div >
  );
}
