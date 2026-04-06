"use client";

import { useState } from "react";
import { Star, Send, Loader2, Edit3 } from "lucide-react";
import { toast } from "react-hot-toast";

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
  initialData?: {
    rating: number;
    comment: string;
  };
  isEditing?: boolean;
}

export default function ReviewForm({ productId, onSuccess, initialData, isEditing }: ReviewFormProps) {
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(initialData?.comment || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setLoading(true);
    try {
      const url = `/api/products/${productId}/reviews`;
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(isEditing ? "Review updated successfully" : "Review submitted! Waiting for admin approval.");
      if (!isEditing) setComment("");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50/50 p-6 md:p-8 rounded-[2rem] border border-gray-100">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none transition-transform active:scale-110"
              >
                <Star
                  className={`w-6 h-6 transition-all duration-300 ${
                    star <= (hover || rating) 
                      ? "fill-[#D4AF37] text-[#D4AF37] scale-110" 
                      : "text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Your Experience</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe your architectural experience with this product..."
            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-light text-gray-600 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/5 focus:border-[#D4AF37] transition-all min-h-[120px] resize-none overflow-hidden"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-gray-900/10"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        ) : isEditing ? (
          <>
            <Edit3 className="w-4 h-4 transition-transform group-hover:scale-110" />
            Update Review
          </>
        ) : (
          <>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            Submit Luxury Review
          </>
        )}
      </button>

      <p className="text-[10px] text-gray-400 text-center font-medium uppercase tracking-widest italic">
        * All reviews undergo architectural standards review before publication.
      </p>
    </form>
  );
}
