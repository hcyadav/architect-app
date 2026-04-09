"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  MessageSquare,
  Search,
  Filter,
  Trash2,
  Loader2,
  ExternalLink
} from "lucide-react";
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";


export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?status=${status}`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data);
      }
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [status]);

  const handleAction = async (id: string, action: "approved" | "rejected" | "delete") => {
    try {
      if (action === "delete") {
        if (!confirm("Are you sure you want to delete this review?")) return;
        const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
        if (res.ok) {
          toast.success("Review deleted");
          fetchReviews();
        }
        return;
      }

      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      if (res.ok) {
        toast.success(`Review ${action}`);
        fetchReviews();
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const filteredReviews = reviews.filter(r =>
    r.user.name.toLowerCase().includes(search.toLowerCase()) ||
    r.product.title.toLowerCase().includes(search.toLowerCase()) ||
    r.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-sans text-gray-900 tracking-tight">Review Moderation</h1>
          <p className="text-sm text-gray-400 font-light italic">Uphold architectural standards by moderating user feedback.</p>
        </div>

        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
          {["pending", "approved", "rejected", "all"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${status === s
                  ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" />
        <input
          type="text"
          placeholder="Search by user, product, or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-light text-gray-600 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/5 focus:border-[#D4AF37] transition-all"
        />
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-200" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="py-32 text-center space-y-4 bg-gray-50/30 rounded-[3rem] border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <Filter className="w-6 h-6 text-gray-200" />
          </div>
          <p className="text-sm text-gray-400 font-light italic uppercase tracking-widest">No reviews found matching architectural criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <div key={review.id} className="group flex flex-col bg-white border border-gray-100 rounded-[2.5rem] p-8 space-y-6 transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:border-[#D4AF37]/10 relative overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-4 right-8">
                <div className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] ${review.status === 'approved' ? 'bg-green-50 text-green-600' :
                    review.status === 'rejected' ? 'bg-red-50 text-red-600' :
                      'bg-[#D4AF37]/10 text-[#D4AF37]'
                  }`}>
                  {review.status}
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Product</h3>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{review.product.title}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Architect</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-300">
                      {review.user.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">{review.user.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{review.user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-100"}`} />
                    ))}
                  </div>
                  <p className="text-xs font-light text-gray-500 italic leading-relaxed line-clamp-4">
                    "{review.comment}"
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(review.createdAt))}
                </span>

                <div className="flex gap-2">
                  {review.status !== 'approved' && (
                    <button
                      onClick={() => handleAction(review.id, "approved")}
                      className="p-3 bg-green-50 hover:bg-green-600 text-green-600 hover:text-white rounded-xl transition-all shadow-sm"
                      title="Approve"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  {review.status !== 'rejected' && (
                    <button
                      onClick={() => handleAction(review.id, "rejected")}
                      className="p-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                      title="Reject"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(review.id, "delete")}
                    className="p-3 bg-gray-50 hover:bg-gray-900 text-gray-400 hover:text-white rounded-xl transition-all"
                    title="Delete Permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
