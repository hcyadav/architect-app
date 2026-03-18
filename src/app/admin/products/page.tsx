"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Upload, X, Plus, Trash2, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import BackButton from "@/components/BackButton";
import { UploadButton } from "@/lib/uploadthing";


interface CustomField {
  label: string;
  value: string;
}

interface ProductData {
  _id?: string;
  title: string;
  description: string;
  category: "product" | "corporate" | "premium";
  subCategory: string;
  imageUrl: string;
  additionalImages: string[];
  companyName: string;
  price: string;
  customFields: CustomField[];
}

const emptyForm: ProductData = {
  title: "",
  description: "",
  category: "product",
  subCategory: "",
  imageUrl: "",
  additionalImages: [],
  companyName: "",
  price: "",
  customFields: [],
};

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [additionalUploading, setAdditionalUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"product" | "corporate" | "premium">("product");

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

  useEffect(() => {
    if (showProductList) {
      fetchProducts();
    }
    fetchSubCategories();
  }, [showProductList, activeTab, fetchProducts, fetchSubCategories]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (tab: "product" | "corporate" | "premium") => {
    setActiveTab(tab);
    resetForm();
    setFormData((prev) => ({
      ...prev,
      category: tab,
      subCategory: "",
      companyName: tab === "corporate" ? prev.companyName : "",
      price: tab === "corporate" ? "" : prev.price,
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
    setEditingProductId(product._id);
    setShowProductList(false);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      category: product.category || activeTab,
      subCategory: product.subCategory || "",
      imageUrl: product.imageUrl || "",
      additionalImages: product.additionalImages || [],
      companyName: product.companyName || "",
      price: product.price ? String(product.price) : "",
      customFields: product.customFields || [],
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
    <div className="max-w-6xl mx-auto space-y-12 mb-10">
      <Toaster position="top-right" />

      <BackButton />

      <div className="space-y-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">
            Manage Architecture
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Add new residential products, premium collections, or corporate projects.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl max-w-lg">
        <button
          onClick={() => handleTabChange("product")}
          className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "product"
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
                {activeTab === "product" ? "Residential / Product" : activeTab === "premium" ? "Premium" : "Corporate"} Items
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
                  key={p._id}
                  className={`flex items-center gap-4 p-4 md:p-5 hover:bg-gray-50/50 transition-colors ${editingProductId === p._id ? "bg-[#D4AF37]/5 border-l-4 border-[#D4AF37]" : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(p._id)}
                      onChange={() => toggleSelectProduct(p._id)}
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
                      onClick={() => handleDelete(p._id)}
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
              ? `Edit ${activeTab === "product" ? "Product" : activeTab === "premium" ? "Premium Product" : "Corporate Project"
              }`
              : `Create New ${activeTab === "product" ? "Product" : activeTab === "premium" ? "Premium Product" : "Corporate Project"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                placeholder="Ex. Minimalist Vista Home"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sub Category</label>
              <div className="flex flex-col gap-2">
                {!showNewSubCatInput ? (
                  <div className="flex gap-2">
                    <select
                      value={formData.subCategory}
                      onChange={(e) => {
                        if (e.target.value === "ADD_NEW") {
                          setShowNewSubCatInput(true);
                        } else {
                          setFormData({ ...formData, subCategory: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all appearance-none"
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                      <option value="ADD_NEW" className="text-[#D4AF37] font-medium">+ Add New Subcategory</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSubCat}
                      onChange={(e) => setNewSubCat(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newSubCat.trim()) {
                            setFormData({ ...formData, subCategory: newSubCat.trim() });
                            if (!subCategories.includes(newSubCat.trim())) {
                              setSubCategories([...subCategories, newSubCat.trim()]);
                            }
                            setShowNewSubCatInput(false);
                            setNewSubCat("");
                          }
                        }
                      }}
                      autoFocus
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                      placeholder="Type and press Enter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewSubCatInput(false)}
                      className="px-4 py-3 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {formData.subCategory && !showNewSubCatInput && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-md">Current: {formData.subCategory}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewSubCatInput(true);
                        setNewSubCat(formData.subCategory);
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600 underline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>

            {activeTab === "corporate" && (
              <div className="space-y-2 col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                  placeholder="Ex. Google, Tesla, Inc."
                />
              </div>
            )}

            {activeTab === "product" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Starting Price (Optional)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                  placeholder="Ex. 1200"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                <span>Main Featured Image <span className="text-red-500">*</span></span>
              </label>

              <div className="flex items-center gap-4">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setFormData((prev) => ({ ...prev, imageUrl: res[0].url }));
                      toast.success("Main image uploaded");
                    }
                    setUploadingImage(false);
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                    setUploadingImage(false);
                  }}
                  onUploadBegin={() => {
                    setUploadingImage(true);
                  }}
                  appearance={{
                    button: "bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#D4AF37] hover:bg-[#FDFBF7] text-gray-600 font-medium w-full h-auto py-4 after:bg-[#D4AF37]",
                    allowedContent: "hidden"
                  }}
                  content={{
                    button({ ready }) {
                      if (uploadingImage) return "Uploading...";
                      if (formData.imageUrl) return "Change Image";
                      return "Upload Image";
                    }
                  }}
                />
              </div>

              {formData.imageUrl && (
                <div className="mt-4 relative h-[300px] w-full max-w-lg rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
                  <img src={formData.imageUrl} className="object-contain max-h-full max-w-full" alt="Main upload" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700  flex justify-between">Additional Images (Optional)</label>

              <div className="flex items-center gap-4">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      const urls = res.map(file => file.url);
                      setFormData((prev) => ({
                        ...prev,
                        additionalImages: [...prev.additionalImages, ...urls],
                      }));
                      toast.success(`${res.length} images added`);
                    }
                    setAdditionalUploading(false);
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                    setAdditionalUploading(false);
                  }}
                  onUploadBegin={() => {
                    setAdditionalUploading(true);
                  }}
                  appearance={{
                    button: "bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#D4AF37] hover:bg-[#FDFBF7] text-gray-600 font-medium w-full h-auto py-4 after:bg-[#D4AF37]",
                    allowedContent: "hidden"
                  }}
                  content={{
                    button({ ready }) {
                      if (additionalUploading) return "Uploading...";
                      return "Add Images";
                    }
                  }}
                />
              </div>

              {formData.additionalImages.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {formData.additionalImages.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border group">
                      <img src={img} className="object-cover w-full h-full" />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(i)}
                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---- Dynamic Custom Fields Section ---- */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Custom Details</label>
                <p className="text-xs text-gray-400 font-light mt-0.5">
                  Add custom label and content fields for extra product information
                </p>
              </div>
              <button
                type="button"
                onClick={addCustomField}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#D4AF37] bg-[#D4AF37]/10 rounded-xl hover:bg-[#D4AF37]/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Field
              </button>
            </div>

            {formData.customFields.length > 0 && (
              <div className="space-y-3">
                {formData.customFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 group animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateCustomField(index, "label", e.target.value)}
                        placeholder="Label (e.g. Material, Dimensions)"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all text-sm"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateCustomField(index, "value", e.target.value)}
                        placeholder="Value (e.g. Teak Wood, 6x4 ft)"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCustomField(index)}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all mt-0.5"
                      title="Remove field"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-gray-700">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe the architectural aspects, client goals, materials used..."
            />
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
