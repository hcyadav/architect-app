"use client";

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
    <div className="mt-8 pt-10 border-t border-gray-100">
      <h3
        style={{
          fontSize: "30px",
          fontWeight: 500,
          color: "#374151",
          marginBottom: "20px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
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
