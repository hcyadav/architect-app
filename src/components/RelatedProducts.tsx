"use client";

import Link from "next/link";

interface RelatedProduct {
  id: string;
  slug?: string;
  title: string;
  price: number;
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
    <div className="mt-16 pt-16 border-t border-gray-100">
      <h3 className="text-2xl font-serif text-gray-900 mb-8 tracking-tight">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug || product.id}`}
            className="group block"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-4 transition-all duration-500 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
              {product.title}
            </h4>
            <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">{product.category}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
