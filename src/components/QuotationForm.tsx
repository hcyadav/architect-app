"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Send, CheckCircle2, Lock, Phone, MessageSquare, User, Mail } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

export default function QuotationForm({ productId }: { productId: string }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status !== "authenticated") {
      toast.error("Please log in to send a quotation request");
      signIn();
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter a message for your quotation request");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/quotation", {
        productId,
        ...formData,
        // Fallback to session values if empty
        name: formData.name || session?.user?.name,
        email: formData.email || session?.user?.email,
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
      <div className="bg-[#FDFBF7] border border-[#D4AF37]/20 p-8 rounded-[2rem] text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-[#D4AF37]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
        </div>
        <div className="space-y-2">
            <h3 className="text-2xl font-sans text-gray-900">Request Received</h3>
            <p className="text-gray-500 font-light max-w-xs mx-auto">
              Our architectural specialists will analyze your requirements and contact you within 24 hours.
            </p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold text-[#D4AF37] hover:underline"
        >
            Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group">
      {status !== "authenticated" && (
        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex items-center justify-center p-8 text-center transition-all group-hover:backdrop-blur-[4px]">
            <div className="max-w-xs space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-sans">Logged-in Users Only</h4>
                <p className="text-sm text-gray-400 font-light">To maintain data security and provide a personalized experience, please log in to send a request.</p>
                <button 
                    onClick={() => signIn()}
                    className="w-full py-3 bg-[#D4AF37] text-white rounded-xl text-sm font-bold hover:bg-[#B5952F] shadow-lg shadow-[#D4AF37]/10"
                >
                    Sign In to Continue
                </button>
            </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <h3 className="text-xl font-sans text-gray-900 tracking-tight">Request a Quote</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name || session?.user?.name || ""}
                        onChange={handleChange}
                        placeholder="Ex. John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all text-sm"
                    />
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Phone</label>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all text-sm"
                    />
                </div>
            </div>
        </div>

        <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Requirements</label>
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all resize-none text-sm placeholder:text-gray-300"
                placeholder="Describe your property details, preferred materials, budget range or timeline..."
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-xl shadow-gray-100 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group group-hover:scale-[1.01]"
        >
            <Send className={`w-4 h-4 transition-transform ${loading ? "animate-pulse" : "group-hover:translate-x-1"}`} />
            <span>{loading ? "Transmitting..." : "Submit Enquiry"}</span>
        </button>
        <p className="text-[10px] text-gray-400 text-center font-light leading-relaxed">
            By submitting, you agree to our <span className="underline decoration-dotted">Privacy Policy</span> and grant us permission to contact you regarding this enquiry.
        </p>
      </form>
    </div>
  );
}
