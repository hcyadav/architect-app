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
                    <h2 className="text-3xl md:text-4xl font-sans text-gray-900 tracking-tight">
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
                {products.map((p, index) => (
                    <div
                        key={p.id}
                        className="min-w-full snap-center relative"
                    >
                        <div className="group relative w-full h-[80vh] overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl mx-auto">
                            {/* Hero Image - Full occupy */}
                            <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Dark Gradient Overlay for text legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />

                            {/* "Showing X of Y" label */}
                            <div className="absolute top-8 left-8 text-white/70 text-sm font-light italic tracking-widest">
                                Product {index + 1} of {products.length}
                            </div>

                            {/* Bottom Overlay for Title, Description and Button */}
                            <div className="absolute bottom-12 left-8 md:bottom-20 md:left-20 right-8 max-w-2xl z-20 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-[#D4AF37] text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                                            {p.subCategory || "Premium"}
                                        </span>
                                        <span className="text-white/60 text-[10px] items-center flex gap-1 font-medium tracking-widest">
                                            <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                            EXCEPTIONAL WORK
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-sans font-medium text-white tracking-tighter leading-tight drop-shadow-xl">
                                        {p.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm md:text-lg line-clamp-2 max-w-xl leading-relaxed font-light drop-shadow-md">
                                        {p.description}
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Link
                                        href={`/products/${p.slug || p.id}`}
                                        className="group/btn inline-flex items-center gap-3 px-10 py-4 bg-white text-gray-900 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-2xl"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Pagination Dots (Fixed overlay per slide for visual reference) */}
                            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                                {products.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-10 h-1.5 rounded-full transition-all duration-500 ${i === index ? "bg-[#D4AF37] w-14" : "bg-white/20"}`}
                                    />
                                ))}
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
