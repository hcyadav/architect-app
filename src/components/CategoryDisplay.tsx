"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";
import { Search, X } from "lucide-react";

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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1); // Reset page when category, subcategory or search search changes
  }, [category, activeSub, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [category, activeSub, page, debouncedSearch]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = `/api/products?category=${category}${activeSub !== "All" ? `&subCategory=${activeSub}` : ""}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}&page=${page}`;
      const res = await axios.get(url);
      setProducts(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique subCategories for tabs
  const [subCategories, setSubCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchAllSubCategories = async () => {
      try {
        // Fetch a large number to get all possible subcategories in this category
        const res = await axios.get(`/api/products?category=${category}&pageSize=1000`);
        const items = res.data.items || [];
        const subs = Array.from(new Set(items.map((p: any) => p.subCategory).filter(Boolean))) as string[];
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
    <div className="max-w-7xl mx-auto space-y-12">
      {/* <BackButton /> */}
      <div className="space-y-6 pb-6 border-b border-gray-100 mt-4 md:mt-0">
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
            <div className="flex flex-wrap gap-2 order-2 md:order-1">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(sub)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeSub === sub
                    ? "bg-[#D4AF37] text-white shadow-md scale-105"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Dynamic Search Input */}
          <div className="relative w-full md:w-80 order-1 md:order-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all text-sm shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-24 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto"></div>
          </div>
        ) : products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
            <p className="text-gray-500 font-light">
              We haven't added any projects in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Pagination UI */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-8">
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
