"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  Edit3,
  Trash2,
  FileCheck2,
  Receipt,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { IBilling, downloadBillingPDF } from "@/lib/pdfGenerator";

export default function BillingList({
  bills,
  loading,
  page,
  totalPages,
  total,
  counts,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onPageChange,
  onSelectBill,
  onApproveBill,
  onDeleteBill,
}: {
  bills: IBilling[];
  loading: boolean;
  page: number;
  totalPages: number;
  total: number;
  counts: { all: number; initiated: number; inprogress: number; approved: number };
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  onPageChange: (p: number) => void;
  onSelectBill: (bill: IBilling) => void;
  onApproveBill: (bill: IBilling) => void;
  onDeleteBill: (id: string) => void;
}) {
  const [billToApprove, setBillToApprove] = useState<IBilling | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Approved
          </span>
        );
      case "Inprogress":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3 h-3 text-amber-600" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-blue-600" />
            Initiated
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls & Search / Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100 rounded-2xl max-w-fit">
          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              statusFilter === "ALL"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All Bills ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("Initiated")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              statusFilter === "Initiated"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Initiated ({counts.initiated})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("Inprogress")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              statusFilter === "Inprogress"
                ? "bg-white text-amber-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            In Progress ({counts.inprogress})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("Approved")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              statusFilter === "Approved"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Approved ({counts.approved})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search client, bill no, notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-sm transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-24 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto"></div>
          </div>
        ) : bills.length === 0 ? (
          <div className="py-24 text-center text-gray-400 font-light space-y-2">
            <Receipt className="w-10 h-10 mx-auto text-gray-300 stroke-1" />
            <p className="text-base">No billing records found.</p>
            <p className="text-xs text-gray-400">
              {searchTerm || statusFilter !== "ALL"
                ? "Try adjusting your search query or status filter."
                : "Use the form above to create your first billing entry."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="w-full text-left border-collapse hidden md:table">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-50">
                  <th className="px-6 py-4">Billing No.</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Scope / Items</th>
                  <th className="px-6 py-4 text-right">Amount (₹)</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bills.map((bill) => {
                  const bNum = bill.billingNumber || bill.billing_number;
                  const isApproved = bill.status === "Approved";

                  return (
                    <tr
                      key={bill.id}
                      className="hover:bg-gray-50/40 transition-colors group"
                    >
                      {/* Billing No */}
                      <td className="px-6 py-5 whitespace-nowrap">
                        {bNum ? (
                          <span className="font-mono text-sm font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-xl border border-[#D4AF37]/20">
                            {bNum}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 font-light italic bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
                            Pending Approval
                          </span>
                        )}
                      </td>

                      {/* Client */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                            {bill.clientName?.charAt(0) || "C"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{bill.clientName}</p>
                            {bill.clientEmail && (
                              <p className="text-xs text-gray-400 font-light truncate max-w-[180px]">
                                {bill.clientEmail}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-gray-800">
                            {bill.items?.length || 0} item{(bill.items?.length || 0) > 1 ? "s" : ""}
                          </span>
                          <p className="text-xs text-gray-400 font-light truncate max-w-[220px]">
                            {bill.items?.map((i) => i.description).join(", ")}
                          </p>
                        </div>
                      </td>

                      {/* Valuation */}
                      <td className="px-6 py-5 text-right whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full font-bold text-sm">
                          ₹{bill.totalAmount?.toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        {getStatusBadge(bill.status)}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <span className="text-xs text-gray-500 font-light">
                          {bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : "-"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View or Edit */}
                          <button
                            type="button"
                            onClick={() => onSelectBill(bill)}
                            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                            title={isApproved ? "View Bill (Locked)" : "Edit Bill Details"}
                          >
                            {isApproved ? (
                              <Eye className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Edit3 className="w-4 h-4 text-blue-600" />
                            )}
                          </button>

                          {/* Quick Approve Action (only when not approved) */}
                          {!isApproved && (
                            <button
                              type="button"
                              onClick={() => setBillToApprove(bill)}
                              className="p-2 text-amber-500 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all"
                              title="Approve Bill & Assign Number"
                            >
                              <FileCheck2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Download PDF */}
                          <button
                            type="button"
                            onClick={() => downloadBillingPDF(bill)}
                            className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          {/* Delete Action (only when not approved) */}
                          {!isApproved ? (
                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  confirm(`Delete billing entry for "${bill.clientName}"?`) &&
                                  bill.id
                                ) {
                                  onDeleteBill(bill.id);
                                }
                              }}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Draft Bill"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span
                              className="p-2 text-gray-200 cursor-not-allowed"
                              title="Approved bills are locked against deletion"
                            >
                              <Lock className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-50">
              {bills.map((bill) => {
                const bNum = bill.billingNumber || bill.billing_number;
                const isApproved = bill.status === "Approved";

                return (
                  <div key={bill.id} className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{bill.clientName}</h3>
                          {getStatusBadge(bill.status)}
                        </div>
                        <p className="text-xs text-gray-400">
                          {bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : ""}
                        </p>
                      </div>

                      {bNum ? (
                        <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-xl">
                          {bNum}
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400 italic bg-gray-50 px-2 py-0.5 rounded-lg">
                          Pending Approval
                        </span>
                      )}
                    </div>

                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Total Amount
                      </span>
                      <span className="text-lg font-sans text-[#D4AF37] font-semibold">
                        ₹{bill.totalAmount?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => onSelectBill(bill)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-200 transition-all flex items-center gap-1.5"
                      >
                        {isApproved ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                        {isApproved ? "View" : "Edit"}
                      </button>

                      {!isApproved && (
                        <button
                          type="button"
                          onClick={() => setBillToApprove(bill)}
                          className="px-4 py-2 bg-[#D4AF37] text-white rounded-xl text-xs font-medium hover:bg-[#c49f2e] transition-all flex items-center gap-1.5"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => downloadBillingPDF(bill)}
                        className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-[#D4AF37] transition-all"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-50 bg-gray-50/30">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quick Approval Modal */}
      {billToApprove && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-sans text-gray-900 tracking-tight">
                  Approve and Finalize Bill?
                </h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Approving will assign the next sequential billing number and permanently lock
                  this bill against future modifications.
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Client:</span>
                <span className="font-semibold text-gray-900">{billToApprove.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Valuation:</span>
                <span className="font-semibold text-[#D4AF37]">
                  ₹{billToApprove.totalAmount?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status Change:</span>
                <span className="font-semibold text-emerald-600">
                  {billToApprove.status} → Approved
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBillToApprove(null)}
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onApproveBill(billToApprove);
                  setBillToApprove(null);
                }}
                className="px-6 py-2.5 bg-[#D4AF37] text-white rounded-xl text-sm font-semibold hover:bg-[#c49f2e] transition-all shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
