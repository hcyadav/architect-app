import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const revalidateTime = parseInt(process.env.CACHE_TTL_PRODUCTS || "3600");

    const getCachedSubcategories = unstable_cache(
      async (cat: string | null) => {
        const products = await prisma.product.findMany({
          where: cat ? { category: cat as any } : {},
          distinct: ['subCategory'],
          select: { subCategory: true }
        });
        return products
          .map(p => p.subCategory)
          .filter((sub): sub is string => !!sub && sub.trim() !== "");
      },
      [`subcategories-${category}`],
      { revalidate: revalidateTime, tags: ["products", "subcategories"] }
    );

    const filteredSubCategories = await getCachedSubcategories(category);

    return NextResponse.json(filteredSubCategories, {
      headers: {
        'Cache-Control': `public, max-age=${revalidateTime}, stale-while-revalidate=59`
      }
    });
  } catch (error) {
    console.error("Subcategories fetch error", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}
