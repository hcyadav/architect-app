import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
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
  await getServerSession(authOptions);

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
    select: { id: true, slug: true, title: true, price: true, mrp: true, imageUrl: true, category: true }
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

  // Breadcrumb
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: product.category, href: `/${product.category}` },
    { label: product.subCategory, href: `/${product.category}?sub=${product.subCategory}` },
  ];

  // Specs: first 4 customFields displayed as 2×2 card grid
  const specCards = (product.customFields || []).slice(0, 4);

  // Discount
  const hasMrp = product.mrp && product.mrp > product.price;
  const discountPct = hasMrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : product.discountPercentage || 0;

  // Tabs
  const tabs = [
    {
      label: "Description",
      content: (
        <div className="prose prose-sm max-w-none text-gray-500 font-light leading-relaxed whitespace-pre-line" style={{ fontSize: "14px", lineHeight: "1.8" }}>
          {product.description}
        </div>
      )
    },
    {
      label: "Specifications",
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/30">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-100">
              {product.customFields?.map((f: any, i: number) => (
                <tr key={i} className="hover:bg-white transition-colors">
                  <td className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-[0.06em] w-1/3">
                    {f.label}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-light" style={{ fontSize: "14px" }}>
                    {f.value}
                  </td>
                </tr>
              ))}
              <tr className="hover:bg-white transition-colors">
                <td className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-[0.06em]">
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

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "12px", color: "#9ca3af" }}>
              {breadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <Link href={b.href} className="hover:text-gray-700 transition-colors">
                    {b.label}
                  </Link>
                  {i < breadcrumbs.length - 1 && <span aria-hidden="true">›</span>}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* ── Hero Grid ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-0">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Left — Image Gallery */}
            <div className="lg:w-[52%]">
              <ProductGallery
                mainImage={product.imageUrl}
                additionalImages={product.additionalImages}
                title={product.title}
              />
            </div>

            {/* Right — Product Info */}
            <div className="lg:w-[48%] flex flex-col gap-5">

              {/* 1. Brand + Rating row */}
              <div className="flex items-center justify-between">
                {product.companyName ? (
                  <span style={{ fontSize: "11px", letterSpacing: "0.06em", color: "#B4623A", fontWeight: 700, textTransform: "uppercase" }}>
                    {product.companyName}
                  </span>
                ) : <span />}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                  <span style={{ fontSize: "12px", fontWeight: 600, marginLeft: "4px", color: "#111827" }}>
                    {avgRating.toFixed(1)}
                  </span>
                  {reviewCount > 0 && (
                    <span style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "2px" }}>
                      ({reviewCount})
                    </span>
                  )}
                </div>
              </div>

              {/* 2. Product Title */}
              <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#111827", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
                {product.title}
              </h1>

              {/* 3. Price Block */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline gap-3">
                  <span style={{ fontSize: "26px", fontWeight: 500, color: "#111827" }}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {hasMrp && (
                    <span style={{ fontSize: "16px", color: "#9ca3af", textDecoration: "line-through", fontWeight: 400 }}>
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  {discountPct > 0 && (
                    <span style={{
                      fontSize: "12px", fontWeight: 700, color: "#16a34a",
                      background: "#dcfce7", padding: "2px 8px", borderRadius: "4px"
                    }}>
                      Save {discountPct}%
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                  Incl. GST · Delivery &amp; installation extra
                </p>
              </div>

              {/* 4. Specs Grid (2×2 card layout) */}
              {specCards.length > 0 && (
                <div className="grid grid-cols-2 gap-2.5">
                  {specCards.map((spec: any, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: "#f9fafb",
                        border: "0.5px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "10px 14px"
                      }}
                    >
                      <p style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af", fontWeight: 600 }}>
                        {spec.label}
                      </p>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "#111827", marginTop: "2px" }}>
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. Trust Badges — single bordered pill */}
              <div
                style={{
                  display: "inline-flex",
                  border: "0.5px solid #e5e7eb",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  alignSelf: "flex-start",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "#6b7280"
                }}
              >
                {[
                  { label: "Quality Assured" },
                  { label: "Fast Delivery" },
                  { label: "Reliable Support" },
                ].map((badge, i, arr) => (
                  <span
                    key={i}
                    style={{
                      padding: "7px 14px",
                      borderRight: i < arr.length - 1 ? "0.5px solid #e5e7eb" : "none",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* 6. Enquiry Form */}
              <div>
                <QuotationForm productId={id} />
              </div>

            </div>
          </div>

          {/* ── Tabs Section ── */}
          <ProductTabs tabs={tabs} />

          {/* ── Frequently Bought Together ── */}
          {bundleProducts.length > 0 && (
            <ProductBundle
              currentProduct={{ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl }}
              bundleProducts={bundleProducts as any}
            />
          )}

          {/* ── Related Products ── */}
          <RelatedProducts
            products={relatedProducts as any}
            title="Related products · free delivery on eligible orders"
          />

          {/* ── Best Sellers ── */}
          <BestSellers
            products={bestSellers as any}
            title="Best Seller Products"
          />

          {/* ── Review Submission ── */}
          <ReviewSystem productId={product.id} productImage={product.imageUrl} />
        </div>

      </ReviewProvider>
    </div>
  );
}
