import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Product from "@/models/Product";
import connectToDatabase from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const revalidateTime = parseInt(process.env.CACHE_TTL_PRODUCTS || "3600");

    const getCachedSubcategories = unstable_cache(
      async (cat: string | null) => {
        const query = cat ? { category: cat } : {};
        const subCategories = await Product.distinct("subCategory", query);
        return subCategories.filter((sub: string) => sub && sub.trim() !== "");
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
