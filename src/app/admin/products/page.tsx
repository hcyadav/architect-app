"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Upload, X, Plus, Trash2, Pencil, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import BackButton from "@/components/BackButton";
import { UploadButton } from "@/lib/uploadthing";


interface CustomField {
  label: string;
  value: string;
}

interface ProductData {
  id?: string;
  title: string;
  description: string;
  category: "residential" | "corporate" | "premium";
  subCategory: string;
  sku: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  imageUrl: string;
  additionalImages: string[];
  companyName: string;
  price: string;
  mrp: string;
  discountPercentage: string;
  stock: string;
  isBestProduct: boolean;
  customFields: CustomField[];
  bundleProductIds: string[];
}

const emptyForm: ProductData = {
  title: "",
  description: "",
  category: "residential",
  subCategory: "",
  sku: "",
  status: "ACTIVE",
  imageUrl: "",
  additionalImages: [],
  companyName: "",
  price: "",
  mrp: "",
  discountPercentage: "",
  stock: "1",
  isBestProduct: false,
  customFields: [],
  bundleProductIds: [],
};

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [additionalUploading, setAdditionalUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"residential" | "corporate" | "premium">("residential");

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Product listing for edit
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [fetchingSubCats, setFetchingSubCats] = useState(false);
  const [showNewSubCatInput, setShowNewSubCatInput] = useState(false);
  const [newSubCat, setNewSubCat] = useState("");


  const [formData, setFormData] = useState<ProductData>({ ...emptyForm });
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [markingBest, setMarkingBest] = useState(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const res = await axios.get(`/api/products?category=${activeTab}&pageSize=1000`);
      setProducts(res.data.items || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setProductsLoading(false);
    }
  }, [activeTab]);

  const fetchSubCategories = useCallback(async () => {
    setFetchingSubCats(true);
    try {
      const res = await axios.get(`/api/products/subcategories?category=${activeTab}`);
      setSubCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
    } finally {
      setFetchingSubCats(false);
    }
  }, [activeTab]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get(`/api/products?pageSize=2000`);
      setAllProducts(res.data.items || []);
    } catch (error) {
      console.error("Failed to fetch all products for selection", error);
    }
  }, []);

  useEffect(() => {
    if (showProductList) {
      fetchProducts();
    }
    fetchSubCategories();
    fetchAllProducts();
  }, [showProductList, activeTab, fetchProducts, fetchSubCategories, fetchAllProducts]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    let val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    let newFormData = { ...formData, [name]: val };

    // Auto-calculate price if MRP or Discount changes
    if (name === "mrp" || name === "discountPercentage") {
      const mrp = name === "mrp" ? val : formData.mrp;
      const discount = name === "discountPercentage" ? val : formData.discountPercentage;

      const m = parseFloat(mrp);
      const d = parseFloat(discount);
      if (!isNaN(m) && !isNaN(d)) {
        const discountedPrice = Math.round(m * (1 - d / 100));
        newFormData.price = String(discountedPrice);
      }
    }

    setFormData(newFormData);
  };

  const handleTabChange = (tab: "residential" | "corporate" | "premium") => {
    setActiveTab(tab);
    resetForm();
    setFormData((prev) => ({
      ...prev,
      category: tab,
      subCategory: "",
    }));
  };

  const resetForm = () => {
    setEditMode(false);
    setEditingProductId(null);
    setFormData({ ...emptyForm, category: activeTab });
    setShowNewSubCatInput(false);
    setNewSubCat("");
  };

  // Dynamic custom fields
  const addCustomField = () => {
    setFormData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { label: "", value: "" }],
    }));
  };

  const removeCustomField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const updateCustomField = (index: number, field: "label" | "value", val: string) => {
    setFormData((prev) => {
      const newFields = [...prev.customFields];
      newFields[index] = { ...newFields[index], [field]: val };
      return { ...prev, customFields: newFields };
    });
  };



  const removeAdditionalImage = (index: number) => {
    const newImgs = [...formData.additionalImages];
    newImgs.splice(index, 1);
    setFormData({ ...formData, additionalImages: newImgs });
  };

  // Load product data for editing
  const startEditing = (product: any) => {
    setEditMode(true);
    setEditingProductId(product.id);
    setShowProductList(false);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      category: product.category || activeTab,
      subCategory: product.subCategory || "",
      sku: product.sku || "",
      status: product.status || "ACTIVE",
      imageUrl: product.imageUrl || "",
      additionalImages: product.additionalImages || [],
      companyName: product.companyName || "",
      price: product.price ? String(product.price) : "",
      mrp: product.mrp ? String(product.mrp) : "",
      discountPercentage: product.discountPercentage ? String(product.discountPercentage) : "",
      stock: product.stock ? String(product.stock) : "1",
      isBestProduct: product.isBestProduct || false,
      customFields: product.customFields || [],
      bundleProductIds: product.bundleProductIds || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast.error("Main image is required");
      return;
    }

    setLoading(true);

    try {
      if (editMode && editingProductId) {
        // Update existing product
        await axios.put(`/api/products/${editingProductId}/admin`, formData);
        toast.success("Product updated successfully!");
      } else {
        // Create new product
        await axios.post("/api/products", formData);
        toast.success("Item saved successfully!");
      }
      resetForm();
      fetchSubCategories();
      if (showProductList) fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${productId}/admin`);
      toast.success("Product deleted");
      fetchProducts();
      fetchSubCategories();
      if (editingProductId === productId) resetForm();
    } catch (error: any) {
      toast.error("Failed to delete product");
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleMarkAsBest = async () => {
    if (selectedProductIds.length === 0) {
      toast.error("Please select at least one product");
      return;
    }

    setMarkingBest(true);
    try {
      await Promise.all(
        selectedProductIds.map((id) =>
          axios.put(`/api/products/${id}/admin`, { isBestProduct: true })
        )
      );
      toast.success("Products marked as best!");
      setSelectedProductIds([]);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update products");
    } finally {
      setMarkingBest(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 mb-10 mt-3">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-sans text-gray-900 tracking-tight">
            Manage Architecture
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Add new residential products, premium collections, or corporate projects.
          </p>
        </div>
        <Link
          href="/admin/quotations"
          className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-all shadow-lg shadow-gray-200"
        >
          <MessageSquare className="w-4 h-4" />
          View Enquiries
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-2xl max-w-lg">
        <button
          onClick={() => handleTabChange("residential")}
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "residential"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Residential / Product
        </button>
        <button
          onClick={() => handleTabChange("premium")}
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "premium"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Premium Product
        </button>
        <button
          onClick={() => handleTabChange("corporate")}
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "corporate"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Corporate Work
        </button>
      </div>

      {/* Toggle to show existing products for editing */}
      <div>
        <button
          onClick={() => { setShowProductList(!showProductList); }}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          <Pencil className="w-4 h-4" />
          {showProductList ? "Hide" : "Edit Existing"} Products
          {showProductList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Product List for Edit/Delete */}
      {showProductList && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {activeTab === "residential" ? "Residential / Product" : activeTab === "premium" ? "Premium" : "Corporate"} Items
              </h3>
              <p className="text-sm text-gray-400 font-light mt-1">Click edit to modify a product</p>
            </div>
            {selectedProductIds.length > 0 && (
              <button
                onClick={handleMarkAsBest}
                disabled={markingBest}
                className="px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium rounded-xl hover:bg-[#C4A030] transition-all shadow-sm flex items-center gap-2"
              >
                {markingBest ? "Updating..." : `Mark ${selectedProductIds.length} as Best`}
              </button>
            )}
          </div>

          {productsLoading ? (
            <div className="py-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mx-auto"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-light">
              No products found in this category.
            </div>
          ) : (
            <ul className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto custom-scrollbar">
              {products.map((p) => (
                <li
                  key={p.id}
                  className={`flex items-center gap-4 p-4 md:p-5 hover:bg-gray-50/50 transition-colors ${editingProductId === p.id ? "bg-[#D4AF37]/5 border-l-4 border-[#D4AF37]" : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(p.id)}
                      onChange={() => toggleSelectProduct(p.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={p.imageUrl} alt={p.title} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{p.title}</h4>
                    <p className="text-xs text-gray-400 font-light truncate">{p.subCategory}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => startEditing(p)}
                      className="p-2.5 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ---- Form ---- */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#EEEEEE]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">
            {editMode
              ? `Edit ${activeTab === "residential" ? "Product" : activeTab === "premium" ? "Premium Product" : "Corporate Project"
              }`
              : `Create New ${activeTab === "residential" ? "Product" : activeTab === "premium" ? "Premium Product" : "Corporate Project"
              }`}
          </h2>
          {editMode && (
            <button
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 - Basic Info */}
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Section 1 — Basic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                  placeholder="Ex. Minimalist Vista Home"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                >
                  <option value="residential">Residential</option>
                  <option value="corporate">Corporate</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sub Category</label>
                <div className="flex flex-col gap-2">
                  {!showNewSubCatInput ? (
                    <select
                      value={formData.subCategory}
                      onChange={(e) => {
                        if (e.target.value === "ADD_NEW") setShowNewSubCatInput(true);
                        else setFormData({ ...formData, subCategory: e.target.value });
                      }}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                      <option value="ADD_NEW" className="text-[#D4AF37] font-medium">+ Add New</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={newSubCat}
                      onChange={(e) => setNewSubCat(e.target.value)}
                      onBlur={() => {
                        if (newSubCat.trim()) {
                          setFormData({ ...formData, subCategory: newSubCat });
                          setSubCategories(prev => prev.includes(newSubCat) ? prev : [...prev, newSubCat]);
                        }
                        setShowNewSubCatInput(false);
                      }}
                      autoFocus
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="Enter subcategory"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                  placeholder="Ex. FUR-SOF-RED-L-001"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                  placeholder="Ex. Sony / Architectural Firm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="DRAFT">DRAFT</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  name="isBestProduct"
                  checked={formData.isBestProduct}
                  onChange={handleChange}
                  id="isBestProduct"
                  className="w-5 h-5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="isBestProduct" className="text-sm font-medium text-gray-700 cursor-pointer">Best Seller Product</label>
              </div>
            </div>
          </div>

          {/* Section 2 - Pricing */}
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Section 2 — Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">M.R.P (Original Price)</label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                  placeholder="Ex. 46890"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Discount (%)</label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                  placeholder="Ex. 36"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sale Price (Read-only)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl outline-none font-bold text-gray-900 cursor-not-allowed"
                  placeholder="Auto-calculated"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Stock (Available Units)</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                  placeholder="Ex. 10"
                />
              </div>
            </div>
          </div>

          {/* Section 3 - Images */}
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Section 3 — Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex justify-between">
                  <span>Main Featured Image <span className="text-red-500">*</span></span>
                </label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res?.[0]) {
                      setFormData(prev => ({ ...prev, imageUrl: res[0].url }));
                      toast.success("Main image uploaded");
                    }
                    setUploadingImage(false);
                  }}
                  onUploadError={(e) => { toast.error(e.message); setUploadingImage(false); }}
                  onUploadBegin={() => setUploadingImage(true)}
                  appearance={{ button: "bg-white border-2 border-dashed border-gray-200 rounded-xl !text-black w-full" }}
                  content={{ button: uploadingImage ? "Uploading..." : "Upload Main Image" }}
                />
                {formData.imageUrl && (
                  <div className="mt-4 relative h-40 w-full rounded-lg overflow-hidden border bg-white flex items-center justify-center">
                    <img src={formData.imageUrl} className="object-contain max-h-full" alt="Main" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Additional Images (Max 4)</label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      const urls = res.map(f => f.url);
                      setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ...urls].slice(0, 4) }));
                      toast.success("Images added");
                    }
                    setAdditionalUploading(false);
                  }}
                  onUploadError={(e) => { toast.error(e.message); setAdditionalUploading(false); }}
                  onUploadBegin={() => setAdditionalUploading(true)}
                  appearance={{ button: "bg-white border-2 border-dashed border-gray-200 rounded-xl !text-black w-full" }}
                  content={{ button: additionalUploading ? "Uploading..." : "Add More Images" }}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.additionalImages.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border">
                      <img src={img} className="object-cover w-full h-full" />
                      <button type="button" onClick={() => removeAdditionalImage(i)} className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 - Custom Fields */}
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Section 4 — Custom Details</h3>
              <button type="button" onClick={addCustomField} className="px-4 py-2 text-xs font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all">+ Add Field</button>
            </div>
            <div className="space-y-3">
              {formData.customFields.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <input type="text" value={f.label} onChange={(e) => updateCustomField(i, "label", e.target.value)} placeholder="Field Label (e.g. Color)" className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none" />
                  <input type="text" value={f.value} onChange={(e) => updateCustomField(i, "value", e.target.value)} placeholder="Field Content (e.g. Blue)" className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none" />
                  <button type="button" onClick={() => removeCustomField(i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5 - Description */}
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Section 5 — Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all resize-none"
              placeholder="Describe the project..."
            />
          </div>

          {/* Section 6 & 7 - Linked Products */}
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Section 6 & 7 — Bundle & Related</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bundle Products */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Bundle Products</label>
                <div className="space-y-3">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Search to add products..."
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                    />
                    {searchTerm && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                        {allProducts
                          .filter(p =>
                            p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                            !formData.bundleProductIds.includes(p.id)
                          )
                          .map(p => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, bundleProductIds: [...prev.bundleProductIds, p.id] }));
                                setSearchTerm("");
                              }}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                            >
                              <img src={p.imageUrl} alt="" className="w-8 h-8 rounded object-cover" />
                              <span className="font-medium">{p.title}</span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.bundleProductIds.map(id => {
                      const p = allProducts.find(item => item.id === id);
                      return (
                        <div key={id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg group">
                          <span className="text-xs font-medium text-gray-700">{p?.title || id}</span>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, bundleProductIds: prev.bundleProductIds.filter(i => i !== id) }))}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || uploadingImage || additionalUploading}
              className={`w-full py-4 text-white rounded-xl font-medium transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed ${editMode
                ? "bg-[#D4AF37] hover:bg-[#C4A030]"
                : "bg-gray-900 hover:bg-gray-800"
                }`}
            >
              {loading
                ? editMode
                  ? "Updating Project..."
                  : "Publishing Project..."
                : editMode
                  ? "Update Project"
                  : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
