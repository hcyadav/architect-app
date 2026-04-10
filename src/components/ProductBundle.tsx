"use client";

import Link from "next/link";
import { Plus, CheckCircle2 } from "lucide-react";

interface BundleProduct {
  id: string;
  slug?: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface ProductBundleProps {
  currentProduct: BundleProduct;
  bundleProducts: BundleProduct[];
}

export default function ProductBundle({ currentProduct, bundleProducts }: ProductBundleProps) {
  if (bundleProducts.length === 0) return null;

  const allProducts = [currentProduct, ...bundleProducts];
  const totalPrice = allProducts.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div className="mt-8 bg-gray-50/50 rounded-[2.5rem] p-8 md:p-12 border border-blue-50/50">
      <div className="flex items-center gap-2 mb-8">
        <CheckCircle2 className="w-5 h-5 text-gray-900" />
        <h3 className="text-xl font-sans text-gray-900 tracking-tight">Frequently Bought Together</h3>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-4 flex-1">
          {allProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4">
              <Link href={`/products/${p.slug || p.id}`} className="group relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm transition-all group-hover:shadow-md">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-900 shadow-sm">
                  {i + 1}
                </div>
              </Link>
              {i < allProducts.length - 1 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100/50 text-gray-400">
                  <Plus className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-72 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total Bundle Price</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p>
          </div>
          <button
            className="w-full py-4 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            onClick={() => {
              // In a real app, this would add all to cart
              alert("Bundle added to selection!");
            }}
          >
            Select Bundle
          </button>
          {/* <p className="text-[10px] text-gray-400 text-center leading-tight">Prices include GST. Delivery and installation extra.</p> */}
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {allProducts.map((p, i) => (
          <div key={p.id} className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-bold text-gray-900">Item {i + 1}:</span>
            <span className="truncate flex-1">{p.title}</span>
            <span className="font-bold">₹{p.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
