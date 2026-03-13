"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton({ label = "Back" }: { label?: string }) {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            onClick={() => router.back()}
            className="group h-auto py-3 px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-gray-100 rounded-2xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-500 shadow-sm mb-10"
        >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1.5 transition-transform duration-500" />
            {label}
        </Button>
    );
}
