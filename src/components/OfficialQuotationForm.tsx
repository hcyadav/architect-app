"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Calculator, Trash2, Send } from "lucide-react";

interface Item {
  description: string;
  rate: string;
  quantity: string;
  amount: number;
}

export default function OfficialQuotationForm({ onCreated }: { onCreated: () => void }) {
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Item[]>([
    { description: "", rate: "", quantity: "", amount: 0 }
  ]);

  const handleItemChange = (index: number, field: keyof Item, value: string) => {
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
    setItems([...items, { description: "", rate: "", quantity: "", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return toast.error("Client name is required");

    const validItems = items.filter(i => i.description.trim() && i.rate && i.quantity);
    if (validItems.length === 0) return toast.error("Add at least one complete item with description, rate, and quantity");

    setLoading(true);

    try {
      const payload = {
        clientName: clientName.trim(),
        items: validItems.map(i => ({
          description: i.description.trim(),
          rate: parseFloat(i.rate),
          quantity: parseFloat(i.quantity),
          amount: i.amount
        })),
        totalAmount,
        notes: notes.trim(),
      };

      console.log("Submitting quotation:", payload);

      const response = await axios.post("/api/admin/official-quotations", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        toast.success("Quotation generated successfully!");
        setClientName("");
        setNotes("");
        setItems([{ description: "", rate: "", quantity: "", amount: 0 }]);
        onCreated();
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to create quotation";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-[#D4AF37]/10 rounded-xl">
          <Calculator className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <div>
          <h2 className="text-2xl font-serif text-gray-900">New Itemized Quotation</h2>
          <p className="text-sm text-gray-400 font-light">Generate detailed professional quotes in ₹</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gray-50">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Client Name / Reference</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white outline-none transition-all text-lg font-light"
              placeholder="Ex. Mr. Rajesh Kumar"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Internal Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] focus:bg-white outline-none transition-all text-lg font-light"
              placeholder="Ex. 50% Advance received"
            />
          </div>
        </div>

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
              <div key={index} className="bg-gray-50/50 p-4 rounded-2xl md:p-0 md:bg-transparent md:grid md:grid-cols-12 md:gap-4 md:items-center space-y-4 md:space-y-0 relative">
                <div className="md:col-span-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-2 block">Description</label>
                  {/* <input
                    type="text"
                    required
                    placeholder="Item description (e.g. Office Chair)"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-base"
                  /> */}


                  <textarea
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    required
                    rows={4}
                    className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-base"
                    placeholder="Item description (e.g. Office Chair)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-6 items-end">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-2 block">Rate (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                      className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-base"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden mb-2 block">Qty</label>
                    <input
                      type="number"
                      required
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none text-base text-center"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between md:col-span-2 pt-2 md:pt-0">
                  <div className="md:hidden">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Subtotal</label>
                    <span className="text-lg font-serif text-[#D4AF37]">₹{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="hidden md:block text-right font-medium text-gray-900 pr-2 flex-1">
                    ₹{item.amount.toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:bg-[#D4AF37]/5 px-4 py-2 rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Another Item
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-50 gap-6">
          <div className="bg-[#D4AF37]/5 px-6 py-4 rounded-2xl border border-[#D4AF37]/10 flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Valuation</span>
            <span className="text-2xl font-serif text-[#D4AF37]">₹{totalAmount.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 disabled:opacity-70 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            {loading ? "Generating Output..." : "Create Professional Quotation"}
          </button>
        </div>
      </form>
    </div>
  );
}
