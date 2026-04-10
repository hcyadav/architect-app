"use client";

import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="flex justify-center gap-1 opacity-20">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-gray-400" />)}
        </div>
        <p className="text-sm text-gray-400 font-light italic tracking-wide">
          Be the first to leave an architectural masterpiece review for this product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="group relative">
          <div className="flex gap-6 items-start">
            <div className="shrink-0 w-12 h-12 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
              {review.user.image ? (
                <img src={review.user.image} alt={review.user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{review.user.name[0]}</span>
              )}
            </div>

            <div className="flex-1 space-y-3 pb-8 border-b border-gray-50 group-last:border-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">{review.user.name}</h5>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= review.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-100"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  {formatDistanceToNow(new Date(review.createdAt))} ago
                </span>
              </div>

              <p className="text-medium font-light leading-relaxed text-gray-800 whitespace-pre-line italic">
                "{review.comment}"
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
