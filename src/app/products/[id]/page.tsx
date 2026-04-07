import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";

import QuotationForm from "@/components/QuotationForm";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";
import ProductBundle from "@/components/ProductBundle";
import RelatedProducts from "@/components/RelatedProducts";
import BestSellers from "@/components/BestSellers";
import ReviewSystem from "@/components/ReviewSystem";
import { ReviewProvider } from "@/context/ReviewContext";
import ReviewTabContent from "@/components/ReviewTabContent";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  // Safely handle ObjectID vs Slug
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  const product = await prisma.product.findFirst({
    where: isObjectId
      ? { OR: [{ id: id }, { slug: id }] }
      : { slug: id }
  }) as any;

  if (!product) {
    notFound();
  }

  // Fetch Recommended/Bundle Products
  const bundleProducts = product.bundleProductIds?.length > 0
    ? await prisma.product.findMany({
      where: { id: { in: product.bundleProductIds } },
      select: { id: true, title: true, price: true, imageUrl: true }
    })
    : [];

  // Fetch Related Products (by category/subcategory)
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      subCategory: product.subCategory,
      id: { not: product.id }
    },
    take: 25,
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, title: true, price: true, imageUrl: true, category: true }
  });

  // Fetch Best Sellers (excluding current subCategory)
  const bestSellers = await prisma.product.findMany({
    where: {
      isBestProduct: true,
      subCategory: { not: product.subCategory },
      id: { not: product.id }
    },
    take: 25,
    select: {
      id: true,
      slug: true,
      title: true,
      price: true,
      imageUrl: true,
      category: true,
      subCategory: true
    }
  });

  // Fetch Review Statistics
  const reviewStats = await prisma.review.aggregate({
    where: { productId: product.id, status: "approved" },
    _avg: { rating: true },
    _count: { id: true }
  });

  const avgRating = reviewStats._avg.rating || 5.0;
  const reviewCount = reviewStats._count.id || 0;
  console.log("product", product);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: product.category, href: `/${product.category}` },
    { label: product.subCategory, href: `/${product.category}?sub=${product.subCategory}` },
    // { label: product.title, href: "#" },
  ];

  const highlights = product.customFields?.slice(0, 4) || [];

  const tabs = [
    {
      label: "Description",
      content: (
        <div className="prose prose-sm max-w-none text-gray-500 font-light leading-relaxed whitespace-pre-line">
          {product.description}
        </div>
      )
    },
    {
      label: "Specifications",
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-50 bg-gray-50/30">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-100">
              {product.customFields?.map((f: any, i: number) => (
                <tr key={i} className="hover:bg-white transition-colors">
                  <td className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-1/3">
                    {f.label}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-light">
                    {f.value}
                  </td>
                </tr>
              ))}
              <tr className="hover:bg-white transition-colors">
                <td className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Availability
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 font-light">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      label: `Reviews (${reviewCount})`,
      content: <ReviewTabContent />
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <ReviewProvider productId={product.id}>
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {breadcrumbs.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <Link href={b.href} className="hover:text-gray-900 transition-colors">
                  {b.label}
                </Link>
                {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
              </div>
            ))}
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left - Gallery */}
            <div className="lg:w-[55%]">
              <ProductGallery
                mainImage={product.imageUrl}
                additionalImages={product.additionalImages}
                title={product.title}
              />
            </div>

            {/* Right - Info */}
            <div className="lg:w-[45%] space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {product.companyName && (
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                      {product.companyName}
                    </span>
                  )}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i <= Math.round(avgRating) ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                    <span className="text-[10px] font-bold ml-1 text-gray-900">{avgRating.toFixed(1)}</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-4xl font-serif text-gray-900 leading-[1.1] tracking-tight">
                  {product.title}
                </h1>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                  {product.mrp > product.price && (
                    <p className="text-lg text-gray-400 line-through font-light">₹{product.mrp.toLocaleString()}</p>
                  )}
                </div>
                {product.discountPercentage > 0 && (
                  <span className="inline-block px-2 py-0.5 bg-gray-900 text-white text-[10px] font-bold rounded uppercase tracking-widest">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="py-6 border-y border-gray-50">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Highlights</h4>
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {highlights.map((h: any, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-light">
                        <span className="text-gray-900 font-bold">•</span>
                        <span>{h.label}: {h.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features Icons */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-gray-50/50 rounded-2xl space-y-2 text-center">
                  <ShieldCheck className="w-5 h-5 text-gray-900" />
                  <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Quality Assured</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50/50 rounded-2xl space-y-2 text-center">
                  <Truck className="w-5 h-5 text-gray-900" />
                  <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50/50 rounded-2xl space-y-2 text-center">
                  <RefreshCw className="w-5 h-5 text-gray-900" />
                  <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Reliable Support</span>
                </div>
              </div>

              <div className="pt-8">
                <QuotationForm productId={id} />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <ProductTabs tabs={tabs} />

          {/* Bundle Section */}
          {bundleProducts.length > 0 && (
            <ProductBundle
              currentProduct={{ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl }}
              bundleProducts={bundleProducts as any}
            />
          )}

          {/* Related Products Section */}
          <RelatedProducts
            products={relatedProducts as any}
            title="Related products with free delivery on eligible orders"
          />

          {/* Best Sellers Section */}
          <BestSellers
            products={bestSellers as any}
            title="Best Seller Products"
          />

          {/* Reviews Submission Section (Moved to Bottom) */}
          <ReviewSystem productId={product.id} productImage={product.imageUrl} />
        </div>
      </ReviewProvider>
    </div>
  );
}
