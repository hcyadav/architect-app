"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function BestProductsCarousel() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                const res = await axios.get("/api/products?isBestProduct=true&pageSize=10");
                setProducts(res.data.items || []);
            } catch (error) {
                console.error("Failed to fetch best products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBestProducts();
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    if (loading) {
        return (
            <div className="w-full py-16 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37] mx-auto"></div>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="space-y-4">
            <div className="flex items-end justify-between px-4 sm:px-6">
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">
                        Our Featured Best
                    </h2>
                    <p className="text-gray-500 font-light text-lg">
                        A curated selection of our most exceptional architectural works.
                    </p>
                </div>
                <div className="hidden sm:flex gap-3">
                    <button
                        onClick={() => scroll("left")}
                        className="p-3 border border-gray-200 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all bg-white shadow-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-3 border border-gray-200 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all bg-white shadow-sm"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto px-4 sm:px-6 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="min-w-[70vw] snap-center mx-auto"
                    >
                        <div className="group relative w-full h-[50vh] overflow-hidden rounded-[2rem] bg-gray-100 shadow-xl border border-gray-100 mx-auto">
                            <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full text-white">
                                        {p.category}
                                    </span>
                                    {p.subCategory && (
                                        <span className="text-xs font-light text-gray-300 drop-shadow-sm">
                                            {p.subCategory}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-serif font-medium">{p.title}</h3>
                                <p className="text-sm text-gray-300 font-light line-clamp-2 max-w-lg leading-relaxed">
                                    {p.description}
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href={`/products/${p._id}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg"
                                    >
                                        View Project
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile only indicators */}
            <div className="flex justify-center sm:hidden gap-1.5 px-4 pb-4">
                {products.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                ))}
            </div>
        </section>
    );
}
