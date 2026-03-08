"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Inbox, FileCheck, CircleDollarSign, Calendar, User, Briefcase, Download } from "lucide-react";
import OfficialQuotationForm from "@/components/OfficialQuotationForm";
import { downloadQuotationPDF } from "@/lib/pdfGenerator";
import BackButton from "@/components/BackButton";

export default function QuotationDashboard() {
  const [activeTab, setActiveTab] = useState<"requests" | "official">("requests");
  const [requests, setRequests] = useState<any[]>([]);
  const [officialQuotes, setOfficialQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [reqPage, setReqPage] = useState(1);
  const [reqTotalPages, setReqTotalPages] = useState(1);
  const [reqTotal, setReqTotal] = useState(0);
  const [offPage, setOffPage] = useState(1);
  const [offTotalPages, setOffTotalPages] = useState(1);
  const [offTotal, setOffTotal] = useState(0);
  const [prefillData, setPrefillData] = useState<any>(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`/api/quotation?page=${reqPage}`);
      setRequests(res.data.items || []);
      setReqTotalPages(res.data.totalPages || 1);
      setReqTotal(res.data.total || 0);
    } catch (e) { }
  };

  const fetchOfficialQuotes = async () => {
    try {
      const res = await axios.get(`/api/admin/official-quotations?page=${offPage}`);
      setOfficialQuotes(res.data.items || []);
      setOffTotalPages(res.data.totalPages || 1);
      setOffTotal(res.data.total || 0);
    } catch (e) { }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (activeTab === "requests") {
        await fetchRequests();
      } else {
        await fetchOfficialQuotes();
      }
      setLoading(false);
    };
    init();
  }, [activeTab, reqPage, offPage]);

  return (
    <div className="max-w-6xl mx-auto space-y-10 mb-20">
      <Toaster position="top-right" />

      <BackButton />

      <div className="pb-6 border-b border-gray-100 mt-2 lg:mt-0">
        <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3 tracking-tight">
          Quotation Management
        </h1>
        <p className="text-gray-500 font-light text-lg">
          Review client inquiries and manage officially generated quotes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl max-w-md">
        <button
          onClick={() => setActiveTab("requests")}
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === "requests"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          <Inbox className="w-4 h-4" />
          Client Inquiries ({reqTotal})
        </button>
        <button
          onClick={() => setActiveTab("official")}
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === "official"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          <FileCheck className="w-4 h-4" />
          Official Quotes ({offTotal})
        </button>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto"></div>
        </div>
      ) : activeTab === "requests" ? (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
          {requests.length === 0 ? (
            <div className="py-24 text-center text-gray-400 font-light">
              No client inquiries found.
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {requests.map((q) => (
                <li key={q._id} className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 uppercase font-bold text-xs">
                          {q.userId?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{q.userId?.name}</h3>
                          <p className="text-sm text-gray-500 font-light">{q.userId?.email}</p>
                        </div>
                      </div>
                      <div className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#EEEEEE] italic text-gray-700 font-light">
                        "{q.message}"
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest">
                        <span className="px-3 py-1 bg-white border border-orange-100 text-orange-500 rounded-full shadow-sm">
                          {q.status}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(q.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setPrefillData({
                            name: q.userId?.name || "",
                            email: q.userId?.email || ""
                          });
                          setActiveTab("official");
                        }}
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Client Inquiries Pagination */}
          {!loading && reqTotalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-50">
              <button
                onClick={() => setReqPage(prev => Math.max(1, prev - 1))}
                disabled={reqPage === 1}
                className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-500">
                Page {reqPage} of {reqTotalPages}
              </span>
              <button
                onClick={() => setReqPage(prev => Math.min(reqTotalPages, prev + 1))}
                disabled={reqPage === reqTotalPages}
                className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <OfficialQuotationForm
            onCreated={fetchOfficialQuotes}
            prefillData={prefillData}
            onPrefillClear={() => setPrefillData(null)}
          />

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            {officialQuotes.length === 0 ? (
              <div className="py-24 text-center text-gray-400 font-light">
                No official quotations generated yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Desktop Table View */}
                <table className="w-full text-left border-collapse hidden md:table">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <th className="px-8 py-4">Client</th>
                      <th className="px-8 py-4">Project / Product</th>
                      <th className="px-8 py-4 text-right">Quote Amount</th>
                      <th className="px-8 py-4 text-center">Date</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {officialQuotes.map((q) => (
                      <tr key={q._id} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                              {q.clientName?.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{q.clientName}</span>
                              <span className="text-[10px] text-gray-400">{q.clientEmail}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-900 font-medium">
                              {q.items?.length} Items listed
                            </span>
                            <p className="text-xs text-gray-400 font-light truncate max-w-xs">
                              {q.items?.map((i: any) => i.description).join(", ")}
                            </p>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full font-bold text-sm">
                            ₹{q.totalAmount?.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="text-xs text-gray-500 font-light">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            onClick={() => downloadQuotationPDF(q)}
                            className="p-2.5 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-xl transition-all shadow-sm bg-white border border-gray-100"
                            title="Download PDF"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-50">
                  {officialQuotes.map((q) => (
                    <div key={q._id} className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">
                            {q.clientName?.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{q.clientName}</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                              {new Date(q.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadQuotationPDF(q)}
                          className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Valuation</span>
                          <span className="text-lg font-serif text-[#D4AF37]">₹{q.totalAmount?.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 font-light line-clamp-2">
                          {q.items?.length} items: {q.items?.map((i: any) => i.description).join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Official Quotes Pagination */}
          {!loading && offTotalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-50 bg-gray-50/30">
              <button
                onClick={() => setOffPage(prev => Math.max(1, prev - 1))}
                disabled={offPage === 1}
                className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                Page {offPage} of {offTotalPages}
              </span>
              <button
                onClick={() => setOffPage(prev => Math.min(offTotalPages, prev + 1))}
                disabled={offPage === offTotalPages}
                className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
