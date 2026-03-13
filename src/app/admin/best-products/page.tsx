"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, ExternalLink } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function BestProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBestProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/products?isBestProduct=true&pageSize=100");
            setProducts(res.data.items || []);
        } catch (error) {
            toast.error("Failed to fetch best products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBestProducts();
    }, [fetchBestProducts]);

    const handleRemoveFromBest = async (id: string) => {
        if (!confirm("Remove from Best Products?")) return;
        try {
            await axios.put(`/api/products/${id}/admin`, { isBestProduct: false });
            toast.success("Removed from Best Products");
            fetchBestProducts();
        } catch (error) {
            toast.error("Failed to remove product");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 mb-10">
            <Toaster position="top-right" />
            <BackButton />

            <div className="pb-6 border-b border-gray-100 mt-2 lg:mt-0">
                <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3 tracking-tight">
                    Best Products
                </h1>
                <p className="text-gray-500 font-light text-lg">
                    Manage your featured "Best Products" that appear on the home page.
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Featured Items</h3>
                    <span className="text-sm text-gray-400">{products.length} Products</span>
                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37] mx-auto"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-20 text-center text-gray-400 font-light">
                        <p>No products marked as "Best Product" yet.</p>
                        <Link
                            href="/admin/products"
                            className="mt-4 inline-block text-[#D4AF37] hover:underline font-medium"
                        >
                            Go to products to select some
                        </Link>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-50">
                        {products.map((p) => (
                            <li
                                key={p._id}
                                className="flex items-center gap-6 p-6 hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                                    <img src={p.imageUrl} alt={p.title} className="object-cover w-full h-full" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-gray-100 text-[10px] uppercase tracking-wider font-semibold text-gray-500 rounded-full">
                                            {p.category}
                                        </span>
                                        <span className="text-xs text-gray-400 font-light">{p.subCategory}</span>
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-900 truncate">{p.title}</h4>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <Link
                                        href={`/products/${p._id}`}
                                        target="_blank"
                                        className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-2xl transition-all"
                                        title="View Product"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveFromBest(p._id)}
                                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                        title="Remove from Best"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
