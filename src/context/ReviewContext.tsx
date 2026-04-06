"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ReviewContextType {
  reviews: any[];
  userReview: any | null;
  loading: boolean;
  refreshReviews: () => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children, productId }: { children: React.ReactNode; productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [userReview, setUserReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.approved || []);
        setUserReview(data.userReview || null);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <ReviewContext.Provider value={{ reviews, userReview, loading, refreshReviews: fetchReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
}
