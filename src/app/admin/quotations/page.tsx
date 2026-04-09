"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { 
  Trash2, 
  MessageSquare, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  ExternalLink,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical
} from "lucide-react";
import BackButton from "@/components/BackButton";

interface Quotation {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  adminNotes?: string;
  quotedPrice?: number;
  createdAt: string;
  product?: {
    title: string;
    imageUrl: string;
  };
}

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // For Editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchQuotations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/quotation?pageSize=100");
      setQuotations(res.data.items || []);
    } catch (error) {
      toast.error("Failed to fetch quotations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      await axios.put(`/api/quotation/${id}`, {
        status: editStatus,
        adminNotes: editNotes,
        quotedPrice: editPrice,
      });
      toast.success("Quotation updated");
      setEditingId(null);
      fetchQuotations();
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await axios.delete(`/api/quotation/${id}`);
      toast.success("Enquiry deleted");
      fetchQuotations();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch = 
      q.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || q.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW": return "bg-blue-50 text-blue-600 ring-blue-100";
      case "IN_PROGRESS": return "bg-orange-50 text-orange-600 ring-orange-100";
      case "RESOLVED": return "bg-green-50 text-green-600 ring-green-100";
      default: return "bg-gray-50 text-gray-600 ring-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
      <Toaster position="top-right" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <BackButton />
            <h1 className="text-4xl font-sans text-gray-900 tracking-tight">Project Enquiries</h1>
            <p className="text-gray-400 font-light text-lg">Manage user requirements and architectural quotations.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search enquiries..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm min-w-[280px]"
                />
            </div>
            <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-11 pr-8 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm appearance-none"
                >
                    <option value="ALL">All Status</option>
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                </select>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Property / Product</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Requirement</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mx-auto"></div>
                  </td>
                </tr>
              ) : filteredQuotations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-400 font-light">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                          {q.name?.[0] || <User className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{q.name}</p>
                          <div className="flex flex-col gap-0.5 mt-1">
                             <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                <Mail className="w-3 h-3" /> {q.email}
                             </div>
                             {q.phone && (
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                    <Phone className="w-3 h-3" /> {q.phone}
                                </div>
                             )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                        {q.product ? (
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden border border-gray-100">
                                    <img src={q.product.imageUrl} className="object-cover w-full h-full" />
                                </div>
                                <p className="text-sm text-gray-600 font-medium max-w-[150px] truncate">{q.product.title}</p>
                            </div>
                        ) : (
                            <span className="text-xs text-gray-400 italic">General Project Enquiry</span>
                        )}
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-2">
                             <Calendar className="w-3 h-3" /> {new Date(q.createdAt).toLocaleDateString()}
                        </div>
                    </td>
                    <td className="px-6 py-6">
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-sm font-light">
                            {q.message}
                        </p>
                    </td>
                    <td className="px-6 py-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ring-1 transition-all ${getStatusColor(q.status)}`}>
                            {q.status}
                        </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => {
                                    setEditingId(q.id);
                                    setEditStatus(q.status);
                                    setEditNotes(q.adminNotes || "");
                                    setEditPrice(q.quotedPrice ? String(q.quotedPrice) : "");
                                }}
                                className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => handleDelete(q.id)}
                                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal (Simple overlay) */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setEditingId(null)} />
            <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                <h3 className="text-2xl font-sans text-gray-900 mb-8">Process Enquiry</h3>
                
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Status</label>
                        <select 
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm"
                        >
                            <option value="NEW">NEW</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="RESOLVED">RESOLVED</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Quoted Price (Optional)</label>
                        <input 
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl"
                            placeholder="₹ XXXXX"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Admin Notes</label>
                        <textarea 
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl resize-none h-32"
                            placeholder="Add internal notes about this client..."
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button 
                            disabled={saving}
                            onClick={() => handleUpdate(editingId)}
                            className="flex-1 py-4 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button 
                            onClick={() => setEditingId(null)}
                            className="flex-1 py-4 bg-white border border-gray-100 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
