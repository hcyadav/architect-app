import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

import QuotationForm from "@/components/QuotationForm";
import ProductGallery from "@/components/ProductGallery";
import BackButton from "@/components/BackButton";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  }) as any;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-light text-gray-900">Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 p-2">
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col lg:flex-row gap-8 lg:p-4 lg:items-start">
        <div className="lg:w-1/2 p-4 md:p-6 text-center lg:text-left lg:sticky lg:top-24">
          <ProductGallery
            mainImage={product.imageUrl}
            additionalImages={product.additionalImages}
            title={product.title}
          />
        </div>

        {/* Right panel with scrollbar */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col min-h-screen">
          {/* Category & Sub Category */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="px-[10px] py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[10px] font-bold uppercase tracking-widest">
              {product.category}
            </span>
            {product.subCategory && (
              <span className="px-[10px] py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {product.subCategory}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            {product.title}
          </h1>

          {/* Price & Company Name */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {product.price && (
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <div className="inline-flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded-xl text-lg font-bold">
                    <span className="text-xs font-light mr-0.5">₹</span>
                    {Number(product.price).toLocaleString()}
                  </div>
                  {product.discountPercentage && (
                    <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold ring-1 ring-orange-100">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                {product.mrp && (
                  <p className="text-sm text-gray-400 ml-1">
                    M.R.P: <span className="line-through decoration-gray-300">₹{Number(product.mrp).toLocaleString()}</span>
                  </p>
                )}
              </div>
            )}
            {product.companyName && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FDFBF7] border border-[#EEEEEE] rounded-xl">
                <div className="w-5 h-5 bg-[#D4AF37]/10 rounded-md flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">{product.companyName}</span>
              </div>
            )}
          </div>

          {/* All Product Details - Custom Fields + Standard Info */}
          {((product.customFields && product.customFields.length > 0) || product.price || product.companyName || product.subCategory) && (
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                Product Specifications
              </h3>
              <div className="space-y-4 max-w-md">
                {/* Displaying Sub Category as Category per request */}
                {product.subCategory && (
                  <div className="flex items-start">
                    <span className="w-32 md:w-40 font-bold text-gray-700 shrink-0">
                      Category
                    </span>
                    <span className="text-gray-700">
                      {product.subCategory}
                    </span>
                  </div>
                )}

                {/* Price */}
                {/* {product.price && (
                  <div className="flex items-start">
                    <span className="w-32 md:w-40 font-bold text-gray-900 shrink-0">
                      Starting Price
                    </span>
                    <span className="text-gray-700">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                  </div>
                )} */}

                {/* Company Name */}
                {product.companyName && (
                  <div className="flex items-start">
                    <span className="w-32 md:w-40 font-bold text-gray-900 shrink-0">
                      Company
                    </span>
                    <span className="text-gray-700">
                      {product.companyName}
                    </span>
                  </div>
                )}

                {/* Custom Fields */}
                {Array.isArray(product.customFields) && product.customFields.map((field: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="w-32 md:w-40 font-bold text-gray-900 shrink-0">
                      {field.label}
                    </span>
                    <span className="text-gray-700">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed font-light whitespace-pre-line text-sm">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-50">
            {/* <h3 className="text-lg font-medium text-gray-900 mb-4">Request a Quote</h3> */}
            <QuotationForm productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
