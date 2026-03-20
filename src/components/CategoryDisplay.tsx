"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { ProductCard } from "@/components/landing/ProductCard";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/landing/FadeIn";

interface CategoryDisplayProps {
  category?: "product" | "corporate" | "premium" | "all";
}

export default function CategoryDisplay({ category = "all" }: CategoryDisplayProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSub, setActiveSub] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [subCategories, setSubCategories] = useState<string[]>(["All"]);
  const isFetching = useRef(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [category, activeSub, debouncedSearch]);

  const fetchProducts = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    if (isFetching.current) return;
    isFetching.current = true;

    if (isInitial) setLoading(true);
    try {
      const categoryParam = category && category !== "all" ? `&category=${category}` : "";
      const url = `/api/products?${categoryParam}${activeSub !== "All" ? `&subCategory=${activeSub}` : ""}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}&page=${pageNum}`;
      const res = await axios.get(url);
      const newItems = res.data.items || [];

      setProducts(prev => isInitial ? newItems : [...prev, ...newItems]);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [category, activeSub, debouncedSearch]);

  useEffect(() => {
    fetchProducts(page, page === 1);
  }, [page, fetchProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages && !isFetching.current) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, page, totalPages]);

  useEffect(() => {
    const fetchAllSubCategories = async () => {
      try {
        const categoryParam = category && category !== "all" ? `?category=${category}` : "";
        const res = await axios.get(`/api/products/subcategories${categoryParam}`);
        const subs = res.data || [];
        setSubCategories(["All", ...subs]);
      } catch (e) { }
    };
    fetchAllSubCategories();
  }, [category]);

  const getTitle = () => {
    if (category === "product") return "Residential & Products";
    if (category === "premium") return "Premium Collections";
    if (category === "corporate") return "Corporate Projects";
    return "Our Complete Collection";
  };

  const getSubtitle = () => {
    if (category === "product") return "Explore our curated collection of architectural designs and interior products.";
    if (category === "premium") return "Unveiling our most exclusive and luxurious architectural masterpieces.";
    if (category === "corporate") return "Discover our bespoke corporate and commercial architectural designs.";
    return "Browse our complete collection of design-led products and crafted spaces.";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <FadeIn className="space-y-12" direction="none">
        <div className="space-y-6 border-b border-slate-100 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Explore</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-medium text-slate-900 tracking-tight font-serif leading-tight">
              {getTitle()}
            </h1>
            <p className="text-slate-500 font-light text-xl max-w-2xl leading-relaxed">
              {getSubtitle()}
            </p>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pt-4">
            <div className="flex flex-wrap gap-3">
              {subCategories.map((sub) => (
                <Button
                  key={sub}
                  variant={activeSub === sub ? "default" : "outline"}
                  onClick={() => setActiveSub(sub)}
                  className={`h-12 px-8 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeSub === sub
                    ? "bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-600/20 border-none"
                    : "bg-white text-slate-500 border-slate-200 hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                >
                  {sub}
                </Button>
              ))}
            </div>

            <div className="relative w-full xl:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 pl-12 pr-12 bg-white border-slate-200 rounded-full focus-visible:ring-2 focus-visible:ring-orange-600/20 focus-visible:border-orange-600 outline-none transition-all text-sm shadow-sm"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((p, i) => (
              <FadeIn key={p.id} delayMs={i * 50} direction="up">
                <ProductCard product={p} />
              </FadeIn>
            ))
          ) : !loading && (
            <div className="col-span-full py-32 text-center border border-dashed border-slate-200 rounded-[3rem] bg-white">
              <h3 className="text-xl font-medium text-slate-900 mb-2 font-serif">No items found</h3>
              <p className="text-slate-500 font-light max-w-sm mx-auto">
                We haven&apos;t added any projects in this category yet. Please check back soon.
              </p>
            </div>
          )}
        </div>

        {(loading || page < totalPages) && (
          <div ref={loaderRef} className="py-24 flex justify-center">
            <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
          </div>
        )}
      </FadeIn>
    </div>
  );
}
