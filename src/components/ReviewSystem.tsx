"use client";

import { useState } from "react";
import { MessageSquare, Edit3, ShieldAlert, Star } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { useSession } from "next-auth/react";
import { useReviews } from "@/context/ReviewContext";

interface ReviewSystemProps {
  productId: string;
  productImage: string;
}

export default function ReviewSystem({ productId, productImage }: ReviewSystemProps) {
  const { data: session } = useSession();
  const { userReview, loading, refreshReviews } = useReviews();
  const [isEditing, setIsEditing] = useState(false);

  const handleSuccess = () => {
    setIsEditing(false);
    refreshReviews();
  };

  const canEdit = (review: any) => {
    if (!review) return false;
    // Users can always edit if not yet approved (pending or rejected)
    if (review.status !== "approved") return true;
    
    // If approved, check if it's within 24 hours
    if (!review.approvedAt) return true; // Safety fallback
    const approvedTime = new Date(review.approvedAt).getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return Date.now() - approvedTime < twentyFourHours;
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-2xl">
          <div className="h-8 bg-gray-50 rounded-full w-1/4 mx-auto"></div>
          <div className="h-40 bg-gray-50 rounded-[2rem] w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 pt-20 border-t border-gray-100 max-w-2xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <h3 className="text-3xl font-serif text-gray-900 leading-tight tracking-tight">Luxury Feedback</h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed max-w-lg mx-auto">
            Share your architectural perspective. Your insights help us maintain the highest standards of luxury and design.
          </p>
        </div>

        {!session ? (
          <div className="p-8 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 text-center space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">
              Please sign in to share <br /> your experience
            </p>
          </div>
        ) : userReview && !isEditing ? (
          <div className="space-y-6">
            <div className="p-8 bg-[#FDFBF7] border border-[#D4AF37]/10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              
              <div className="relative space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
                    {userReview.user?.name}'s {userReview.status} Review
                  </span>
                  {canEdit(userReview) && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-3 bg-white hover:bg-gray-900 group/btn rounded-xl transition-all shadow-sm border border-gray-100 flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4 text-gray-600 group-hover/btn:text-white transition-colors" />
                      <span className="text-[10px] font-bold text-gray-600 group-hover/btn:text-white uppercase tracking-widest hidden md:inline">Edit</span>
                    </button>
                  )}
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 bg-white shrink-0">
                    <img src={productImage} alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-3.5 h-3.5 ${star <= userReview.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <p className="text-sm font-light text-gray-600 italic leading-relaxed line-clamp-3">"{userReview.comment}"</p>
                  </div>
                </div>
                
                {userReview.status === 'pending' && (
                  <div className="flex items-center gap-2 pt-4 py-2 border-t border-gray-100 mt-4">
                    <ShieldAlert className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Await architectural moderation...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ReviewForm 
            productId={productId} 
            onSuccess={handleSuccess} 
            isEditing={isEditing}
            initialData={userReview ? { rating: userReview.rating, comment: userReview.comment } : undefined}
          />
        )}
      </div>
    </div>
  );
}
