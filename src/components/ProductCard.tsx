"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { status } = useSession();

  const handleViewDetails = () => {
    if (status === "unauthenticated") {
      signIn("google");
    } else {
      router.push(`/products/${product._id}`);
    }
  };

  return (
    <Card className="group overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgb(0,0,0,0.08)] transition-all duration-700 flex flex-col h-full rounded-[2rem] bg-white">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <CardContent className="p-6 flex flex-col flex-1 gap-2">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-gray-50 text-[10px] uppercase tracking-normal font-bold text-gray-400 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-colors duration-500">
              {product.subCategory || "Masterpiece"}
            </span>
          </div>
          <h3 className="text-xl font-medium text-gray-900 font-serif tracking-tighter line-clamp-1 group-hover:text-[#D4AF37] transition-colors duration-500">
            {product.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-light opacity-80">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <Button
            onClick={handleViewDetails}
            variant="outline"
            className="w-full h-12 bg-gray-50/50 hover:bg-gray-900 border-gray-100 hover:border-gray-900 text-gray-900 hover:text-white font-bold text-xs uppercase tracking-normal rounded-xl transition-all duration-500 flex gap-2 group/btn"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
