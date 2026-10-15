"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import {
  Inbox,
  FileCheck,
  Calendar,
  Download,
  Sparkles,
  X,
  Send,
  Receipt,
  FileText,
  PlusCircle,
  ArrowRight,
  Lock,
  Eye,
  Edit3,
} from "lucide-react";
import OfficialQuotationForm from "@/components/OfficialQuotationForm";
import BillingForm from "@/components/BillingForm";
import BillingList from "@/components/BillingList";
import {
  downloadQuotationPDF,
  IBilling,
  IOfficialQuotation,
} from "@/lib/pdfGenerator";
import { IndianRupee } from "lucide-react";

export default function QuotationDashboard() {
  // Single top-level tab: "inquiries" | "quotation" | "billing"
  const [activeTab, setActiveTab] = useState<
    "inquiries" | "quotation" | "billing"
  >("quotation");

  // Quotation Data States
  const [requests, setRequests] = useState<any[]>([]);
  const [officialQuotes, setOfficialQuotes] = useState<any[]>([]);
  const [quoteLoading, setQuoteLoading] = useState(true);

  // Pagination for Quotation
  const [reqPage, setReqPage] = useState(1);
  const [reqTotalPages, setReqTotalPages] = useState(1);
  const [reqTotal, setReqTotal] = useState(0);
  const [offPage, setOffPage] = useState(1);
  const [offTotalPages, setOffTotalPages] = useState(1);
  const [offTotal, setOffTotal] = useState(0);
  const [quotePrefillData, setQuotePrefillData] = useState<any>(null);
  const [selectedQuotationForEdit, setSelectedQuotationForEdit] =
    useState<IOfficialQuotation | null>(null);

  // Reframe State for Inquiries
  const [isReframeModalOpen, setIsReframeModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [reframedMessage, setReframedMessage] = useState("");
  const [sendingResponse, setSendingResponse] = useState(false);

  // Billing Data States
  const [bills, setBills] = useState<IBilling[]>([]);
  const [billLoading, setBillLoading] = useState(false);
  const [billPage, setBillPage] = useState(1);
  const [billTotalPages, setBillTotalPages] = useState(1);
  const [billTotal, setBillTotal] = useState(0);
  const [billCounts, setBillCounts] = useState({
    all: 0,
    initiated: 0,
    inprogress: 0,
    approved: 0,
  });
  const [billSearch, setBillSearch] = useState("");
  const [billStatusFilter, setBillStatusFilter] = useState("ALL");
  const [selectedBillForEdit, setSelectedBillForEdit] =
    useState<IBilling | null>(null);
  const [billPrefillData, setBillPrefillData] = useState<any>(null);

  // --- QUOTATION FETCHING ---
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`/api/quotation?page=${reqPage}`);
      setRequests(res.data.items || []);
      setReqTotalPages(res.data.totalPages || 1);
      setReqTotal(res.data.total || 0);
    } catch (e) {}
  };

  const fetchOfficialQuotes = async () => {
    try {
      const res = await axios.get(
        `/api/admin/official-quotations?page=${offPage}`,
      );
      setOfficialQuotes(res.data.items || []);
      setOffTotalPages(res.data.totalPages || 1);
      setOffTotal(res.data.total || 0);
    } catch (e) {}
  };

  // --- BILLING FETCHING ---
  const fetchBills = useCallback(async () => {
    setBillLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(billPage),
        limit: "10",
        status: billStatusFilter,
        search: billSearch,
      });
      const res = await axios.get(`/api/billing?${params.toString()}`);
      setBills(res.data.items || []);
      setBillTotal(res.data.total || 0);
      setBillTotalPages(res.data.totalPages || 1);
      if (res.data.counts) {
        setBillCounts(res.data.counts);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Failed to load billing records",
      );
    } finally {
      setBillLoading(false);
    }
  }, [billPage, billStatusFilter, billSearch]);

  // Load Inquiries on Tab or Page Change
  useEffect(() => {
    if (activeTab === "inquiries") {
      setQuoteLoading(true);
      fetchRequests().finally(() => setQuoteLoading(false));
    }
  }, [activeTab, reqPage]);

  // Load Official Quotes on Tab or Page Change
  useEffect(() => {
    if (activeTab === "quotation") {
      setQuoteLoading(true);
      fetchOfficialQuotes().finally(() => setQuoteLoading(false));
    }
  }, [activeTab, offPage]);

  // Load Bills on Tab or Filters Change
  useEffect(() => {
    if (activeTab === "billing") {
      fetchBills();
    }
  }, [activeTab, fetchBills]);

  // Initial load of counts
  useEffect(() => {
    fetchRequests();
    fetchOfficialQuotes();
    axios
      .get("/api/billing?limit=1")
      .then((res) => {
        if (res.data.counts) setBillCounts(res.data.counts);
        if (res.data.total !== undefined) setBillTotal(res.data.total);
      })
      .catch(() => {});
  }, []);

  // Quick Approve from Billing List
  const handleApproveBillFromList = async (bill: IBilling) => {
    if (!bill.id) return;
    try {
      const res = await axios.post(`/api/billing/${bill.id}/approve`);
      toast.success(
        `Approved! Sequential number assigned: ${res.data.billingNumber || res.data.billing_number}`,
      );
      fetchBills();
      if (selectedBillForEdit?.id === bill.id) {
        setSelectedBillForEdit(res.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Approval failed");
    }
  };

  // Delete Bill from List
  const handleDeleteBill = async (id: string) => {
    try {
      await axios.delete(`/api/billing/${id}`);
      toast.success("Bill deleted successfully");
      if (selectedBillForEdit?.id === id) {
        setSelectedBillForEdit(null);
      }
      fetchBills();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to delete bill");
    }
  };

  // Inquiry Reframe Actions
  const openReframeModal = (quote: any) => {
    setSelectedQuote(quote);
    const clientName = quote.name || quote.userId?.name || "Client";
    const polished = `Dear ${clientName}, we have reviewed your inquiry: "${quote.message}". We would be delighted to assist you with our architectural expertise. Our team is currently preparing a detailed proposal tailored to your vision. We will reach out to you shortly to discuss this further.`;
    setReframedMessage(polished);
    setIsReframeModalOpen(true);
  };

  const handleSendResponse = async () => {
    if (!reframedMessage.trim()) return;
    setSendingResponse(true);
    try {
      await axios.post("/api/admin/quotation/reframe", {
        quotationId: selectedQuote.id,
        reframedMessage: reframedMessage.trim(),
      });
      toast.success("Response sent to client email!");
      setIsReframeModalOpen(false);
      fetchRequests();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send response");
    } finally {
      setSendingResponse(false);
    }
  };

  // Transfer from Official Quote to Bill
  const convertQuoteToBill = (q: any) => {
    setBillPrefillData({
      name: q.clientName,
      email: q.clientEmail,
      items: q.items || [],
      notes: q.notes
        ? `Derived from Quotation: ${q.notes}`
        : "Derived from Quotation",
    });
    setSelectedBillForEdit(null);
    setActiveTab("billing");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success(
      `Loaded details from "${q.clientName}" into new Billing document`,
    );
  };

  // Tab definitions for the single horizontal row
  const tabs = [
    {
      id: "inquiries" as const,
      label: "Client Inquiries",
      count: reqTotal,
      icon: Inbox,
    },
    {
      id: "quotation" as const,
      label: "Quotation",
      count: offTotal,
      icon: FileText,
    },
    {
      id: "billing" as const,
      label: "Billing",
      count: billCounts.all || billTotal,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-8 mb-20">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="pb-6 border-b border-gray-100 mt-2 lg:mt-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans text-gray-900 mb-2 tracking-tight">
          Quotation & Billing
        </h1>
        <p className="text-gray-500 font-light text-sm sm:text-base md:text-lg">
          Generate official proposals, manage client inquiries, and process
          approved bills with sequential numbering.
        </p>
      </div>

      {/* ===== Single Top-Level Tab Row: Client Inquiries | Quotation | Billing ===== */}
      <div className="flex p-1.5 bg-gray-100 rounded-2xl w-full sm:max-w-2xl overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 py-3 px-2 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${isActive && tab.id === "billing" ? "text-orange-600" : ""}`}
              />
              <span className="truncate">
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1 text-xs opacity-70">({tab.count})</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* ==================== BILLING TAB VIEW ==================== */}
      {activeTab === "billing" && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Billing Form (Create, View, or Edit) */}
          <BillingForm
            selectedBill={selectedBillForEdit}
            prefillData={billPrefillData}
            onClearSelection={() => {
              setSelectedBillForEdit(null);
              setBillPrefillData(null);
            }}
            onCreatedOrUpdated={() => {
              fetchBills();
              setSelectedBillForEdit(null);
              setBillPrefillData(null);
            }}
          />

          {/* Billing Records List & Table */}
          <BillingList
            bills={bills}
            loading={billLoading}
            page={billPage}
            totalPages={billTotalPages}
            total={billTotal}
            counts={billCounts}
            searchTerm={billSearch}
            setSearchTerm={(s) => {
              setBillSearch(s);
              setBillPage(1);
            }}
            statusFilter={billStatusFilter}
            setStatusFilter={(st) => {
              setBillStatusFilter(st);
              setBillPage(1);
            }}
            onPageChange={(p) => setBillPage(p)}
            onSelectBill={(b) => {
              setSelectedBillForEdit(b);
              window.scrollTo({ top: 120, behavior: "smooth" });
            }}
            onApproveBill={handleApproveBillFromList}
            onDeleteBill={handleDeleteBill}
          />
        </div>
      )}

      {/* ==================== CLIENT INQUIRIES TAB VIEW ==================== */}
      {activeTab === "inquiries" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {quoteLoading ? (
            <div className="py-24 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
              {requests.length === 0 ? (
                <div className="py-24 text-center text-gray-400 font-light">
                  No client inquiries found.
                </div>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {requests.map((q) => (
                    <li
                      key={q.id}
                      className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 uppercase font-bold text-xs">
                              {(q.name || q.userId?.name || "U").charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {q.name || q.userId?.name}
                              </h3>
                              <p className="text-sm text-gray-500 font-light">
                                {q.email || q.userId?.email}
                              </p>
                            </div>
                          </div>
                          <div className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#EEEEEE] italic text-gray-700 font-light">
                            &quot;{q.message}&quot;
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
                              setQuotePrefillData({
                                name: q.userId?.name || "",
                                email: q.userId?.email || "",
                              });
                              setActiveTab("quotation");
                            }}
                            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all"
                          >
                            Itemize
                          </button>
                          <button
                            onClick={() => {
                              setBillPrefillData({
                                name: q.name || q.userId?.name || "",
                                email: q.email || q.userId?.email || "",
                                notes: `Client Inquiry: ${q.message}`,
                              });
                              setActiveTab("billing");
                              toast.success(
                                "Loaded client details into Billing document",
                              );
                            }}
                            className="px-5 py-2.5 bg-white border border-orange-600/50 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-50 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            {/* To Bill */}
                          </button>
                          <button
                            onClick={() => openReframeModal(q)}
                            className="px-6 py-2.5 border border-orange-600 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Reframe
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Inquiries Pagination */}
              {!quoteLoading && reqTotalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-50">
                  <button
                    onClick={() => setReqPage((prev) => Math.max(1, prev - 1))}
                    disabled={reqPage === 1}
                    className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium text-gray-500">
                    Page {reqPage} of {reqTotalPages}
                  </span>
                  <button
                    onClick={() =>
                      setReqPage((prev) => Math.min(reqTotalPages, prev + 1))
                    }
                    disabled={reqPage === reqTotalPages}
                    className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ==================== QUOTATION TAB VIEW ==================== */}
      {activeTab === "quotation" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {quoteLoading ? (
            <div className="py-24 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-8">
              <OfficialQuotationForm
                onCreatedOrUpdated={() => {
                  fetchOfficialQuotes();
                  setSelectedQuotationForEdit(null);
                }}
                selectedQuotation={selectedQuotationForEdit}
                onClearSelection={() => setSelectedQuotationForEdit(null)}
                prefillData={quotePrefillData}
                onPrefillClear={() => setQuotePrefillData(null)}
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
                          <th className="px-8 py-4 text-center">Status</th>
                          <th className="px-8 py-4 text-center">Date</th>
                          <th className="px-8 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {officialQuotes.map((q) => (
                          <tr
                            key={q.id}
                            className="hover:bg-gray-50/30 transition-colors group"
                          >
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                  {q.clientName?.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-900">
                                    {q.clientName}
                                  </span>
                                  <span className="text-[10px] text-gray-400">
                                    {q.clientEmail}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-900 font-medium">
                                  {q.items?.length} Items listed
                                </span>
                                <p className="text-xs text-gray-400 font-light truncate max-w-xs">
                                  {q.items
                                    ?.map((i: any) => i.description)
                                    .join(", ")}
                                </p>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full font-bold text-sm">
                                ₹{q.totalAmount?.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                                  q.status === "Published"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : q.status === "Inprogress"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-blue-50 text-blue-700 border-blue-200"
                                }`}
                              >
                                {q.status === "Published" && (
                                  <Lock className="w-3 h-3 text-emerald-600" />
                                )}
                                {q.status || "Ready"}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-xs text-gray-500 font-light">
                                {new Date(q.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedQuotationForEdit(q);
                                    window.scrollTo({
                                      top: 120,
                                      behavior: "smooth",
                                    });
                                  }}
                                  className="px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all flex items-center gap-1.5"
                                  title={
                                    q.status === "Published"
                                      ? "View Published Quotation"
                                      : "Edit Quotation"
                                  }
                                >
                                  {q.status === "Published" ? (
                                    <>
                                      <Eye className="w-3.5 h-3.5" />
                                      View
                                    </>
                                  ) : (
                                    <>
                                      <Edit3 className="w-3.5 h-3.5" />
                                      Edit
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => convertQuoteToBill(q)}
                                  className="px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all flex items-center gap-1.5"
                                  title="Create Bill from this Quote"
                                >
                                  {/* <Receipt className="w-3.5 h-3.5" /> */}
                                  Bill
                                </button>
                                <button
                                  onClick={() => downloadQuotationPDF(q)}
                                  className="p-2.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all shadow-sm bg-white border border-gray-100"
                                  title="Download PDF"
                                >
                                  <Download className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-gray-50">
                      {officialQuotes.map((q) => (
                        <div key={q.id} className="p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">
                                {q.clientName?.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {q.clientName}
                                </h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                                  {new Date(q.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                                  q.status === "Published"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : q.status === "Inprogress"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-blue-50 text-blue-700 border-blue-200"
                                }`}
                              >
                                {q.status === "Published" && (
                                  <Lock className="w-2.5 h-2.5 text-emerald-600" />
                                )}
                                {q.status || "Ready"}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedQuotationForEdit(q);
                                  window.scrollTo({
                                    top: 120,
                                    behavior: "smooth",
                                  });
                                }}
                                className="p-2.5 bg-gray-50 text-gray-700 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all"
                                title={
                                  q.status === "Published" ? "View" : "Edit"
                                }
                              >
                                {q.status === "Published" ? (
                                  <Eye className="w-4 h-4" />
                                ) : (
                                  <Edit3 className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => convertQuoteToBill(q)}
                                className="p-2.5 bg-gray-50 text-gray-700 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all"
                                title="Create Bill"
                              >
                                <Receipt className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => downloadQuotationPDF(q)}
                                className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Total Valuation
                              </span>
                              <span className="text-lg font-sans text-orange-600">
                                ₹{q.totalAmount?.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 font-light line-clamp-2">
                              {q.items?.length} items:{" "}
                              {q.items
                                ?.map((i: any) => i.description)
                                .join(", ")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Official Quotes Pagination */}
              {!quoteLoading && offTotalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-50 bg-gray-50/30">
                  <button
                    onClick={() => setOffPage((prev) => Math.max(1, prev - 1))}
                    disabled={offPage === 1}
                    className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                    Page {offPage} of {offTotalPages}
                  </span>
                  <button
                    onClick={() =>
                      setOffPage((prev) => Math.min(offTotalPages, prev + 1))
                    }
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
      )}

      {/* Reframe Modal */}
      {isReframeModalOpen && selectedQuote && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-xl">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-sans text-gray-900">
                    Reframe & Respond
                  </h2>
                  <p className="text-xs text-gray-400 font-light mt-1">
                    Refine customer inquiry into a professional response
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReframeModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Original Inquiry
                </label>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-600 font-light text-sm">
                  &quot;{selectedQuote.message}&quot;
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Professional Response (Email to Client)
                </label>
                <textarea
                  value={reframedMessage}
                  onChange={(e) => setReframedMessage(e.target.value)}
                  className="w-full h-48 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 focus:bg-white outline-none transition-all text-sm font-light leading-relaxed resize-none"
                  placeholder="Draft your professional response..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsReframeModalOpen(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendResponse}
                  disabled={sendingResponse || !reframedMessage.trim()}
                  className="px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {sendingResponse ? "Sending Email..." : "Send Response"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
