"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Receipt,
  Plus,
  Trash2,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  X,
  FileCheck2,
  Send,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import { downloadBillingPDF, IBilling } from "@/lib/pdfGenerator";

interface Item {
  description: string;
  rate: string;
  quantity: string;
  amount: number;
}

export default function BillingForm({
  onCreatedOrUpdated,
  selectedBill,
  onClearSelection,
  prefillData,
}: {
  onCreatedOrUpdated: () => void;
  selectedBill?: IBilling | null;
  onClearSelection?: () => void;
  prefillData?: {
    name?: string;
    email?: string;
    items?: { description: string; rate: number; quantity: number }[];
    notes?: string;
  } | null;
}) {
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);

  // Form Fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"Initiated" | "Inprogress" | "Approved">("Initiated");
  const [items, setItems] = useState<Item[]>([
    { description: "", rate: "", quantity: "1", amount: 0 },
  ]);
  const [customFields, setCustomFields] = useState<{ label: string; value: string }[]>([]);

  // Active bill tracking
  const isEditing = Boolean(selectedBill?.id);
  const isApproved = (selectedBill?.status === "Approved") || (status === "Approved");
  const billingNumber = selectedBill?.billingNumber || selectedBill?.billing_number || null;

  // Populate from selectedBill
  useEffect(() => {
    if (selectedBill) {
      setClientName(selectedBill.clientName || "");
      setClientEmail(selectedBill.clientEmail || "");
      const resolvedAddress =
        selectedBill.clientAddress ||
        selectedBill.customFields?.find((f) => f.label?.trim().toLowerCase() === "address")?.value ||
        "";
      setClientAddress(resolvedAddress);
      setNotes(selectedBill.notes || "");
      setStatus(selectedBill.status || "Initiated");
      setCustomFields(
        (selectedBill.customFields || []).filter(
          (f) => f.label?.trim().toLowerCase() !== "address"
        )
      );

      if (selectedBill.items && selectedBill.items.length > 0) {
        setItems(
          selectedBill.items.map((i) => ({
            description: i.description,
            rate: String(i.rate),
            quantity: String(i.quantity),
            amount: i.amount,
          }))
        );
      } else {
        setItems([{ description: "", rate: "", quantity: "1", amount: 0 }]);
      }
    } else if (prefillData) {
      setClientName(prefillData.name || "");
      setClientEmail(prefillData.email || "");
      setNotes(prefillData.notes || "");
      setStatus("Initiated");
      if (prefillData.items && prefillData.items.length > 0) {
        setItems(
          prefillData.items.map((i) => ({
            description: i.description,
            rate: String(i.rate),
            quantity: String(i.quantity),
            amount: Number(i.rate) * Number(i.quantity),
          }))
        );
      }
    } else {
      resetForm();
    }
  }, [selectedBill, prefillData]);

  const resetForm = () => {
    setClientName("");
    setClientEmail("");
    setClientAddress("");
    setNotes("");
    setStatus("Initiated");
    setItems([{ description: "", rate: "", quantity: "1", amount: 0 }]);
    setCustomFields([]);
  };

  const handleItemChange = (index: number, field: keyof Item, value: string) => {
    if (isApproved) return;
    const newItems = [...items];
    const item = { ...newItems[index] };

    if (field === "description") {
      item.description = value;
    } else if (field === "rate") {
      item.rate = value;
    } else if (field === "quantity") {
      item.quantity = value;
    }

    const r = parseFloat(item.rate) || 0;
    const q = parseFloat(item.quantity) || 0;
    item.amount = r * q;

    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => {
    if (isApproved) return;
    setItems([...items, { description: "", rate: "", quantity: "1", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (isApproved || items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const addCustomField = () => {
    if (isApproved) return;
    setCustomFields([...customFields, { label: "", value: "" }]);
  };

  const removeCustomField = (index: number) => {
    if (isApproved) return;
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const handleCustomFieldChange = (index: number, field: "label" | "value", value: string) => {
    if (isApproved) return;
    const newFields = [...customFields];
    newFields[index][field] = value;
    setCustomFields(newFields);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  // Save or Update Bill
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isApproved) {
      toast.error("Approved bills are finalized and cannot be modified.");
      return;
    }

    if (!clientName.trim()) {
      return toast.error("Client name is required");
    }

    const validItems = items.filter(
      (i) => i.description.trim() && parseFloat(i.rate) >= 0 && parseFloat(i.quantity) > 0
    );
    if (validItems.length === 0) {
      return toast.error("Add at least one complete item with description, rate, and quantity");
    }

    setLoading(true);

    try {
      const payload = {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim() || null,
        clientAddress: clientAddress.trim() || null,
        items: validItems.map((i) => ({
          description: i.description.trim(),
          rate: parseFloat(i.rate),
          quantity: parseFloat(i.quantity),
          amount: i.amount,
        })),
        customFields: customFields.filter((f) => f.label.trim() && f.value.trim()),
        totalAmount,
        notes: notes.trim() || null,
        status: isEditing ? status : "Initiated",
      };

      if (isEditing && selectedBill?.id) {
        await axios.put(`/api/billing/${selectedBill.id}`, payload);
        toast.success("Bill updated successfully!");
      } else {
        await axios.post("/api/billing", payload);
        toast.success("Bill created in 'Initiated' status!");
        resetForm();
      }

      onCreatedOrUpdated();
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || "Failed to save bill";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Approve Bill Workflow
  const handleApprove = async () => {
    if (!selectedBill?.id) {
      toast.error("Please save the bill first before approving.");
      return;
    }

    if (isApproved) {
      toast.error("This bill is already approved.");
      return;
    }

    setApproving(true);
    try {
      const res = await axios.post(`/api/billing/${selectedBill.id}/approve`);
      toast.success(
        `Bill Approved! Assigned sequential number: ${res.data.billingNumber || res.data.billing_number}`
      );
      setShowApproveConfirm(false);
      onCreatedOrUpdated();
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || "Approval failed";
      toast.error(message);
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 transition-all">
      {/* Top Header Row with Title on Left, Billing Number & Status on Top-Right */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-sans text-gray-900 tracking-tight">
                {isEditing ? "Billing Record" : "New Billing Entry"}
              </h2>
              {isEditing && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                  ID: {selectedBill?.id?.slice(-6)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 font-light mt-0.5">
              {isApproved
                ? "Finalized and locked against modification"
                : isEditing
                ? "Edit details or proceed to approve bill"
                : "Initiate new bill. Assigned sequential number upon approval."}
            </p>
          </div>
        </div>

        {/* Top-Right: Prominent Billing Number & Status */}
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${
              status === "Approved"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : status === "Inprogress"
                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                : "bg-blue-50 text-blue-700 border border-blue-200/60"
            }`}
          >
            {status === "Approved" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : status === "Inprogress" ? (
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            )}
            {status === "Inprogress" ? "In Progress" : status}
          </div>

          {/* Billing Number Display */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${
              billingNumber
                ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-gray-900"
                : "bg-gray-50 border-gray-200 text-gray-400"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Billing No:
            </span>
            <span
              className={`font-mono text-sm font-bold tracking-wider ${
                billingNumber ? "text-[#D4AF37]" : "text-gray-400 font-normal italic"
              }`}
            >
              {billingNumber || "Pending Approval"}
            </span>
          </div>

          {/* Reset / New Bill button */}
          {(isEditing || prefillData) && (
            <button
              type="button"
              onClick={() => {
                if (onClearSelection) onClearSelection();
                resetForm();
              }}
              className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-700 transition-all"
              title="Clear selection / New bill"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Approved Lock Warning Notice */}
      {isApproved && (
        <div className="mb-8 p-4 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-900">
                This bill is Approved and Locked
              </p>
              <p className="text-xs text-emerald-700/80 font-light">
                Billing number <strong className="font-semibold">{billingNumber}</strong> has been
                finalized. Details are preserved and read-only.
              </p>
            </div>
          </div>
          {selectedBill && (
            <button
              type="button"
              onClick={() => downloadBillingPDF(selectedBill)}
              className="px-4 py-2 bg-white text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-sm shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          )}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset disabled={isApproved} className="space-y-8 disabled:opacity-85">
          {/* Client Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-gray-50">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Client Name / Company *
              </label>
              <input
                type="text"
                required
                readOnly={isApproved}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all text-base font-light ${
                  isApproved
                    ? "bg-gray-50/80 cursor-not-allowed text-gray-700"
                    : "focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                }`}
                placeholder="Ex. Rajesh Sharma"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Client Email (Optional)
              </label>
              <input
                type="email"
                readOnly={isApproved}
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all text-base font-light ${
                  isApproved
                    ? "bg-gray-50/80 cursor-not-allowed text-gray-700"
                    : "focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                }`}
                placeholder="Ex. rajesh@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Status Stage
              </label>
              {isApproved ? (
                <div className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-100 rounded-2xl text-base font-medium text-emerald-700">
                  Approved (Locked)
                </div>
              ) : (
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white outline-none transition-all text-base font-light"
                >
                  <option value="Initiated">Initiated (Default Draft)</option>
                  <option value="Inprogress">Inprogress (Under Processing)</option>
                </select>
              )}
            </div>

            <div className="space-y-2 md:col-span-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Client Address (Optional)
              </label>
              <input
                type="text"
                readOnly={isApproved}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all text-base font-light ${
                  isApproved
                    ? "bg-gray-50/80 cursor-not-allowed text-gray-700"
                    : "focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                }`}
                placeholder="Ex. 123 MG Road, Mumbai, Maharashtra"
              />
            </div>
          </div>

          {/* Internal Notes Row */}
          <div className="space-y-2 pb-6 border-b border-gray-50">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              Billing Remarks / Reference Notes
            </label>
            <input
              type="text"
              readOnly={isApproved}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all text-base font-light ${
                isApproved
                  ? "bg-gray-50/80 cursor-not-allowed text-gray-700"
                  : "focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
              }`}
              placeholder="Ex. Milestone 1 - Architectural drawing and timber woodwork completed"
            />
          </div>

          {/* Custom Fields Section */}
          <div className="space-y-3 pb-6 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Custom Terms / Specifications
              </h3>
              {!isApproved && (
                <button
                  type="button"
                  onClick={addCustomField}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D4AF37] hover:bg-[#D4AF37]/5 px-3 py-1.5 rounded-xl transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Specification
                </button>
              )}
            </div>

            {customFields.length > 0 && (
              <div className="space-y-3 pt-2">
                {customFields.map((field, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <input
                      type="text"
                      readOnly={isApproved}
                      placeholder="Property (e.g. GSTIN, Payment Mode)"
                      value={field.label}
                      onChange={(e) => handleCustomFieldChange(index, "label", e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm font-light"
                    />
                    <input
                      type="text"
                      readOnly={isApproved}
                      placeholder="Value (e.g. 27AAAAA0000A1Z5, Net Banking)"
                      value={field.value}
                      onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm font-light"
                    />
                    {!isApproved && (
                      <button
                        type="button"
                        onClick={() => removeCustomField(index)}
                        className="p-2 text-gray-300 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Line Items Section */}
          <div className="space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <div className="col-span-6">Description / Scope of Work</div>
              <div className="col-span-2">Rate (₹)</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right">Amount (₹)</div>
              <div className="col-span-1"></div>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50/50 p-4 rounded-2xl md:p-0 md:bg-transparent md:grid md:grid-cols-12 md:gap-4 md:items-center space-y-4 md:space-y-0"
                >
                  <div className="md:col-span-6">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-1 block">
                      Description
                    </label>
                    <textarea
                      readOnly={isApproved}
                      rows={2}
                      required
                      value={item.description}
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                      className={`w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-light resize-none ${
                        isApproved
                          ? "cursor-not-allowed bg-gray-50/50"
                          : "focus:ring-2 focus:ring-[#D4AF37]"
                      }`}
                      placeholder="Description of item or service (e.g. Teak Wood Dining Table)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:col-span-3 items-center">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-1 block">
                        Rate (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        required
                        readOnly={isApproved}
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                        className={`w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-light ${
                          isApproved
                            ? "cursor-not-allowed bg-gray-50/50"
                            : "focus:ring-2 focus:ring-[#D4AF37]"
                        }`}
                        placeholder="Rate"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-1 block">
                        Qty
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        required
                        readOnly={isApproved}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className={`w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-light text-center ${
                          isApproved
                            ? "cursor-not-allowed bg-gray-50/50"
                            : "focus:ring-2 focus:ring-[#D4AF37]"
                        }`}
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:col-span-2 pt-2 md:pt-0">
                    <div className="md:hidden">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                        Subtotal
                      </label>
                      <span className="text-lg font-sans text-[#D4AF37]">
                        ₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="hidden md:block text-right font-medium text-gray-900 pr-2 flex-1">
                      ₹{item.amount.toLocaleString()}
                    </div>
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    {!isApproved && items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isApproved && (
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/5 px-4 py-2.5 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Item Row
              </button>
            )}
          </div>
        </fieldset>

        {/* Footer Actions Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-50 gap-6">
          <div className="bg-[#D4AF37]/5 px-6 py-4 rounded-2xl border border-[#D4AF37]/10 flex items-center gap-4 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Total Valuation
            </span>
            <span className="text-2xl font-sans text-[#D4AF37]">
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* If approved, show download PDF and new bill options */}
            {isApproved ? (
              <>
                {selectedBill && (
                  <button
                    type="button"
                    onClick={() => downloadBillingPDF(selectedBill)}
                    className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-2xl text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    Download Invoice PDF
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (onClearSelection) onClearSelection();
                    resetForm();
                  }}
                  className="px-6 py-3.5 bg-gray-900 text-white rounded-2xl text-sm font-semibold hover:bg-black transition-all shadow-lg shadow-gray-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create New Bill
                </button>
              </>
            ) : (
              <>
                {/* Save / Update Button */}
                <button
                  type="submit"
                  disabled={loading || approving}
                  className="px-8 py-3.5 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading
                    ? "Saving..."
                    : isEditing
                    ? "Update Bill Details"
                    : "Save Bill (Initiated)"}
                </button>

                {/* Approve Button (Enabled if bill already exists or upon confirmation) */}
                {isEditing && (
                  <button
                    type="button"
                    disabled={loading || approving}
                    onClick={() => setShowApproveConfirm(true)}
                    className="px-8 py-3.5 bg-[#D4AF37] text-white rounded-2xl font-semibold hover:bg-[#c49f2e] transition-all shadow-xl shadow-[#D4AF37]/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    Approve & Assign Number
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </form>

      {/* Approval Confirmation Dialog */}
      {showApproveConfirm && (
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
                <span className="font-semibold text-gray-900">{clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Valuation:</span>
                <span className="font-semibold text-[#D4AF37]">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Action:</span>
                <span className="font-semibold text-emerald-600">Assign Next Billing Number</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={approving}
                onClick={() => setShowApproveConfirm(false)}
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={approving}
                onClick={handleApprove}
                className="px-6 py-2.5 bg-[#D4AF37] text-white rounded-xl text-sm font-semibold hover:bg-[#c49f2e] transition-all shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {approving ? "Approving..." : "Confirm Approval"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
