"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategorizedProducts {
  category: "product" | "corporate" | "premium";
}

export default function PublicCategoryPage({ category }: CategorizedProducts) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSub, setActiveSub] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isFetching = useRef(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Debounce search input
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
      const url = `/api/products?category=${category}${activeSub !== "All" ? `&subCategory=${activeSub}` : ""}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}&page=${pageNum}`;
      const res = await axios.get(url);
      const newItems = res.data.items || [];

      setProducts(prev => isInitial ? newItems : [...prev, ...newItems]);
      setTotalPages(res.data.totalPages);
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

  // Infinite scroll observer
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

  // Extract unique subCategories for tabs
  const [subCategories, setSubCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchAllSubCategories = async () => {
      try {
        const res = await axios.get(`/api/products/subcategories?category=${category}`);
        const subs = res.data || [];
        setSubCategories(["All", ...subs]);
      } catch (e) { }
    };
    fetchAllSubCategories();
  }, [category]);

  const getTitle = () => {
    if (category === "product") return "Residential & Products";
    if (category === "premium") return "Premium Collections";
    return "Corporate Projects";
  };

  const getSubtitle = () => {
    if (category === "product") return "Explore our curated collection of architectural designs and interior products.";
    if (category === "premium") return "Unveiling our most exclusive and luxurious architectural masterpieces.";
    return "Discover our bespoke corporate and commercial architectural designs.";
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 px-4 md:px-8">
      <div className="space-y-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight font-serif">
            {getTitle()}
          </h1>
          <p className="text-gray-500 font-light text-lg max-w-2xl leading-relaxed">
            {getSubtitle()}
          </p>
        </div>

        {/* Search & Sub Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
          {subCategories.length > 1 && (
            <div className="flex flex-wrap gap-3 order-2 md:order-1">
              {subCategories.map((sub) => (
                <Button
                  key={sub}
                  variant={activeSub === sub ? "default" : "outline"}
                  onClick={() => setActiveSub(sub)}
                  className={`h-11 px-6 rounded-2xl text-sm font-medium transition-all duration-300 ${activeSub === sub
                    ? "bg-[#D4AF37] hover:bg-[#B8962E] text-white shadow-lg border-none active:scale-95"
                    : "bg-white text-gray-500 border-gray-100 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                    }`}
                >
                  {sub}
                </Button>
              ))}
            </div>
          )}

          {/* Dynamic Search Input */}
          <div className="relative w-full md:w-80 order-1 md:order-2 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-11 pr-11 bg-white border-gray-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#D4AF37]/20 focus-visible:border-[#D4AF37] outline-none transition-all text-sm shadow-sm"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearch("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-400 hover:text-gray-600 hover:bg-transparent"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : !loading && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
            <p className="text-gray-500 font-light">
              We haven't added any projects in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Infinite Scroll Loader */}
      {(loading || page < totalPages) && (
        <div ref={loaderRef} className="py-12 flex justify-center">
          <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
        </div>
      )}
    </div>
  );
}
