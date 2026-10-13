"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Plus,
  Calculator,
  Trash2,
  Send,
  X,
  Lock,
  Download,
  AlertTriangle,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { IOfficialQuotation, downloadQuotationPDF } from "@/lib/pdfGenerator";

interface Item {
  description: string;
  rate: string;
  quantity: string;
  amount: number;
}

export default function OfficialQuotationForm({
  onCreatedOrUpdated,
  onCreated,
  selectedQuotation,
  onClearSelection,
  prefillData,
  onPrefillClear,
}: {
  onCreatedOrUpdated?: () => void;
  onCreated?: () => void;
  selectedQuotation?: IOfficialQuotation | null;
  onClearSelection?: () => void;
  prefillData?: { name: string; email: string } | null;
  onPrefillClear?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"Ready" | "Inprogress" | "Published">("Ready");
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { description: "", rate: "", quantity: "", amount: 0 }
  ]);
  const [customFields, setCustomFields] = useState<{ label: string; value: string }[]>([]);

  // Active tracking
  const isEditing = Boolean(selectedQuotation?.id);
  const isPublished = selectedQuotation?.status === "Published";

  useEffect(() => {
    if (selectedQuotation) {
      setClientName(selectedQuotation.clientName || "");
      setClientEmail(selectedQuotation.clientEmail || "");
      setNotes(selectedQuotation.notes || "");
      setStatus(selectedQuotation.status || "Ready");
      setCustomFields(selectedQuotation.customFields || []);

      if (selectedQuotation.items && selectedQuotation.items.length > 0) {
        setItems(
          selectedQuotation.items.map((i) => ({
            description: i.description,
            rate: String(i.rate),
            quantity: String(i.quantity),
            amount: i.amount,
          }))
        );
      } else {
        setItems([{ description: "", rate: "", quantity: "", amount: 0 }]);
      }
    } else if (prefillData) {
      setClientName(prefillData.name || "");
      setClientEmail(prefillData.email || "");
      setNotes("");
      setStatus("Ready");
      setItems([{ description: "", rate: "", quantity: "", amount: 0 }]);
      setCustomFields([]);
    } else {
      resetForm();
    }
  }, [selectedQuotation, prefillData]);

  const resetForm = () => {
    setClientName("");
    setClientEmail("");
    setNotes("");
    setStatus("Ready");
    setItems([{ description: "", rate: "", quantity: "", amount: 0 }]);
    setCustomFields([]);
  };

  const handleStatusChange = (newStatus: "Ready" | "Inprogress" | "Published") => {
    if (selectedQuotation?.status === "Published") return;
    if (newStatus === "Published") {
      setShowPublishConfirm(true);
    } else {
      setStatus(newStatus);
    }
  };

  const handleItemChange = (index: number, field: keyof Item, value: string) => {
    if (isPublished) return;
    const newItems = [...items];
    const item = { ...newItems[index] };

    if (field === "description") {
      item.description = value;
    } else if (field === "rate") {
      item.rate = value;
    } else if (field === "quantity") {
      item.quantity = value;
    }

    if (field === "rate" || field === "quantity") {
      const r = parseFloat(item.rate) || 0;
      const q = parseFloat(item.quantity) || 0;
      item.amount = r * q;
    }

    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => {
    if (isPublished) return;
    setItems([...items, { description: "", rate: "", quantity: "", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (isPublished) return;
    if (items.length === 1) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const addCustomField = () => {
    if (isPublished) return;
    setCustomFields([...customFields, { label: "", value: "" }]);
  };

  const removeCustomField = (index: number) => {
    if (isPublished) return;
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const handleCustomFieldChange = (index: number, field: "label" | "value", value: string) => {
    if (isPublished) return;
    const newFields = [...customFields];
    newFields[index][field] = value;
    setCustomFields(newFields);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedQuotation?.status === "Published") {
      return toast.error("This quotation has been published and can no longer be edited.");
    }

    if (!clientName.trim()) return toast.error("Client name is required");

    const validItems = items.filter((i) => i.description.trim() && i.rate && i.quantity);
    if (validItems.length === 0) {
      return toast.error("Add at least one complete item with description, rate, and quantity");
    }

    const validCustomFields = customFields.filter((f) => f.label.trim() && f.value.trim());

    setLoading(true);

    try {
      const payload = {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim() || null,
        items: validItems.map((i) => ({
          description: i.description.trim(),
          rate: parseFloat(i.rate),
          quantity: parseFloat(i.quantity),
          amount: i.amount,
        })),
        customFields: validCustomFields,
        totalAmount,
        notes: notes.trim() || null,
        status,
      };

      if (isEditing && selectedQuotation?.id) {
        await axios.put(`/api/admin/official-quotations/${selectedQuotation.id}`, payload);
        if (status === "Published") {
          toast.success("Quotation published and locked!");
        } else {
          toast.success("Quotation updated successfully!");
        }
      } else {
        await axios.post("/api/admin/official-quotations", payload);
        if (status === "Published") {
          toast.success("Quotation created and published!");
        } else {
          toast.success("Quotation generated successfully in 'Ready' status!");
        }
        resetForm();
      }

      if (onCreatedOrUpdated) onCreatedOrUpdated();
      if (onCreated) onCreated();
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to save quotation";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 transition-all">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#D4AF37]/10 rounded-xl">
            <Calculator className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-sans text-gray-900">
                {isEditing ? (isPublished ? "View Official Quotation" : "Edit Official Quotation") : "New Itemized Quotation"}
              </h2>
              {isEditing && (
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                    status === "Published"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : status === "Inprogress"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  {status}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 font-light">
              {isEditing
                ? isPublished
                  ? "This quotation is permanently locked in read-only mode"
                  : "Update quote line items, valuation, or change status"
                : "Generate detailed professional quotes in ₹"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {isEditing && onClearSelection && (
            <button
              type="button"
              onClick={onClearSelection}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-medium hover:bg-gray-50 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Quotation
            </button>
          )}

          {prefillData && onPrefillClear && (
            <button
              type="button"
              onClick={onPrefillClear}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
              title="Clear prefilled inquiry data"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Published Lock Notice Banner */}
      {isPublished && (
        <div className="mb-8 p-5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-950">
                This quotation has been published and can no longer be edited.
              </p>
              <p className="text-xs text-emerald-700 font-light mt-0.5">
                All itemized details, pricing, and client records are permanently locked in read-only mode.
              </p>
            </div>
          </div>
          {selectedQuotation && (
            <button
              type="button"
              onClick={() => downloadQuotationPDF(selectedQuotation)}
              className="px-4 py-2 bg-white text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-sm shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          )}
        </div>
      )}

      {/* Form Fields wrapped in fieldset disabled when published */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset disabled={isPublished} className="space-y-8 disabled:opacity-90">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-gray-50">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Client Name / Reference *
              </label>
              <input
                type="text"
                required
                readOnly={isPublished}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all text-base font-light ${
                  isPublished
                    ? "bg-gray-50/80 cursor-not-allowed text-gray-700"
                    : "focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                }`}
                placeholder="Ex. Mr. Rajesh Kumar"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Client Email (Optional)
              </label>
              <input
                type="email"
                readOnly={isPublished}
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all text-base font-light ${
                  isPublished
                    ? "bg-gray-50/80 cursor-not-allowed text-gray-700"
                    : "focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                }`}
                placeholder="Ex. rajesh@example.com"
              />
            </div>

            {/* Quotation Status Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Quotation Status
              </label>
              {isPublished ? (
                <div className="w-full px-5 py-3.5 bg-gray-50/80 border border-gray-100 rounded-2xl text-base font-medium text-emerald-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  Published (Locked)
                </div>
              ) : (
                <select
                  value={status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value as "Ready" | "Inprogress" | "Published")
                  }
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white outline-none transition-all text-base font-light"
                >
                  <option value="Ready">Ready (Default Editable)</option>
                  <option value="Inprogress">Inprogress (Work in Progress)</option>
                  <option value="Published">Published (Lock Permanently)</option>
                </select>
              )}
            </div>
          </div>

          {/* Internal Notes Row */}
          <div className="space-y-2 pb-6 border-b border-gray-50">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              Internal Notes / Terms
            </label>
            <input
              type="text"
              readOnly={isPublished}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all text-base font-light ${
                isPublished
                  ? "bg-gray-50/80 cursor-not-allowed text-gray-700"
                  : "focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
              }`}
              placeholder="Ex. 50% advance on order confirmation, validity 15 days"
            />
          </div>

          {/* Custom Fields Section */}
          <div className="space-y-4 pb-8 border-b border-gray-50">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
              Special Terms / Custom Fields
            </h3>
            <div className="space-y-3">
              {customFields.map((field, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center animate-in fade-in slide-in-from-left-2 transition-all"
                >
                  <input
                    type="text"
                    disabled={isPublished}
                    placeholder="Key (e.g. Warranty)"
                    value={field.label}
                    onChange={(e) => handleCustomFieldChange(index, "label", e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm disabled:cursor-not-allowed"
                  />
                  <input
                    type="text"
                    disabled={isPublished}
                    placeholder="Value (e.g. 2 Years)"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm disabled:cursor-not-allowed"
                  />
                  {!isPublished && (
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
              {!isPublished && (
                <button
                  type="button"
                  onClick={addCustomField}
                  className="flex items-center gap-2 text-xs font-medium text-[#D4AF37] hover:bg-[#D4AF37]/5 px-3 py-1.5 rounded-lg transition-all"
                >
                  <Plus className="w-3 h-3" />
                  Add Key-Value Pair
                </button>
              )}
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <div className="col-span-6">Description</div>
              <div className="col-span-2">Rate (₹)</div>
              <div className="col-span-1">Qty</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-1"></div>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50/50 p-4 rounded-2xl md:p-0 md:bg-transparent md:grid md:grid-cols-12 md:gap-4 md:items-center space-y-4 md:space-y-0 relative"
                >
                  <div className="md:col-span-5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-2 block">
                      Description
                    </label>
                    <textarea
                      disabled={isPublished}
                      value={item.description}
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                      required
                      rows={3}
                      className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-base disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Item description (e.g. Office Chair)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:col-span-4 items-end">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-2 block">
                        Rate (₹)
                      </label>
                      <input
                        type="number"
                        disabled={isPublished}
                        required
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-base disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-2 block">
                        Qty
                      </label>
                      <input
                        type="number"
                        disabled={isPublished}
                        required
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-base text-center disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:col-span-3 pt-2 md:pt-0">
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
                    {!isPublished && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isPublished && (
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:bg-[#D4AF37]/5 px-4 py-2 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Another Item
              </button>
            )}
          </div>
        </fieldset>

        {/* Total & Action Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-50 gap-6">
          <div className="bg-[#D4AF37]/5 px-6 py-4 rounded-2xl border border-[#D4AF37]/10 flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Total Valuation
            </span>
            <span className="text-2xl font-sans text-[#D4AF37]">
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {isPublished ? (
              <div className="flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-500 rounded-2xl font-medium text-sm">
                <Lock className="w-4 h-4 text-gray-400" />
                Quotation Published (Read-Only)
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-10 py-4 text-white rounded-2xl font-semibold transition-all shadow-xl disabled:opacity-70 flex items-center justify-center gap-3 active:scale-[0.98] ${
                  status === "Published"
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                    : "bg-gray-900 hover:bg-gray-800 shadow-gray-200"
                }`}
              >
                {status === "Published" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading
                  ? "Saving..."
                  : isEditing
                  ? status === "Published"
                    ? "Publish & Lock Quotation"
                    : "Update Quotation"
                  : status === "Published"
                  ? "Create & Publish Quotation"
                  : "Create Professional Quotation"}
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Confirmation Modal for Publishing */}
      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-6">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Publish & Permanently Lock Quotation?
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Once a quotation becomes <strong className="font-semibold text-gray-900">Published</strong>,
                it is permanently locked against further editing. You will not be able to modify line items,
                pricing, or revert its status back to Ready or Inprogress.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setShowPublishConfirm(false);
                }}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatus("Published");
                  setShowPublishConfirm(false);
                  toast.success("Status set to Published. Save the form to finalize lock.");
                }}
                className="px-6 py-2.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Yes, Set to Published
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
