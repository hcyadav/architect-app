"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }: { label?: string }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-500 bg-white border border-gray-100 rounded-2xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 shadow-sm group mb-10 active:scale-95"
        >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            {label}
        </button>
    );
}
