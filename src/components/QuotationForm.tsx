"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Send, CheckCircle2 } from "lucide-react";

export default function QuotationForm({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message for your quotation request");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/quotation", {
        productId,
        message,
      });
      setSubmitted(true);
      toast.success("Quotation request sent successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send quotation request");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-100 p-8 rounded-2xl text-center space-y-4">
        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-green-900">Request Sent!</h3>
        <p className="text-green-700 font-light">
          Your quotation request has been successfully submitted. Our team will review it and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Any Specific Requirements</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all resize-none"
          placeholder="Please describe your requirements, timeline, or any specific details you'd like us to know..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[#D4AF37] hover:bg-[#B5952F] text-white font-medium rounded-xl transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        <Send className={`w-4 h-4 transition-transform ${loading ? "animate-pulse" : "group-hover:translate-x-1"}`} />
        <span>{loading ? "Sending Request..." : "Request Quotation"}</span>
      </button>
    </form>
  );
}
