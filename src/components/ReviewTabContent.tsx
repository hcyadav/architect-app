"use client";

import { useReviews } from "@/context/ReviewContext";
import ReviewList from "./ReviewList";
import { Star, Loader2 } from "lucide-react";

export default function ReviewTabContent() {
  const { reviews, loading } = useReviews();

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-200" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="flex justify-center gap-1 opacity-20">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />)}
        </div>
        <p className="text-sm text-gray-400 font-light italic tracking-wide">
          Be the first to leave an architectural masterpiece review for this product.
        </p>
      </div>
    );
  }

  return <ReviewList reviews={reviews} />;
}
