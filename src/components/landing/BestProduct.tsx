"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
import type { LandingProduct } from "./types";

interface BestProductProps {
  product: LandingProduct;
}

export function BestProduct({ product }: BestProductProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[3rem] bg-white border border-slate-100">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full lg:aspect-auto">
              <Image
                src={product.imageUrl || "/uploads/1772704211002-sofa1.jpg"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-10 md:p-20">
              <FadeIn className="space-y-8">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Featured Item</span>
                </div>

                <h2 className="font-serif text-5xl font-medium leading-[1.1] text-slate-900 md:text-7xl">
                  {product.title}
                </h2>

                <p className="text-lg leading-relaxed text-slate-500">
                  {product.description}
                </p>

                <div className="flex items-center justify-between gap-8 border-t border-slate-100 pt-8">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-widest text-[10px]">Price</p>
                    <div className="flex flex-col">
                      <p className="text-4xl font-bold text-slate-900">
                        ₹{product.price ? Number(product.price).toLocaleString() : "1,850.65"}
                      </p>
                      {(product.mrp || product.discountPercentage) && (
                        <div className="flex items-center gap-2 mt-1">
                          {product.mrp && (
                            <span className="text-sm text-slate-400 line-through">
                              M.R.P: ₹{Number(product.mrp).toLocaleString()}
                            </span>
                          )}
                          {product.discountPercentage && (
                            <span className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                              {product.discountPercentage}% OFF
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="group inline-flex h-14 items-center gap-3 rounded-full bg-orange-600 px-8 text-sm font-bold text-white transition-all hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/20"
                  >
                    VISIT SHOP
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
