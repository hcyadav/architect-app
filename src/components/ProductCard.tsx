"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
// No icons used currently

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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full border border-gray-50">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"}
          alt={product.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1.5 font-serif tracking-wide line-clamp-1">
            {product.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-light mb-4">
            {product.description}
          </p>
        </div>

        <button
          onClick={handleViewDetails}
          className="w-full py-3 px-4 bg-[#FDFBF7] text-[#D4AF37] border border-[#EEEEEE] font-medium text-sm rounded-xl hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
