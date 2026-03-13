import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { unstable_cache } from "next/cache";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const isBestProduct = searchParams.get("isBestProduct");
    const searchTerm = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSizeParam = searchParams.get("pageSize") || process.env.NEXT_PUBLIC_PAGE_SIZE || "10";
    const pageSize = isNaN(parseInt(pageSizeParam)) ? 10 : parseInt(pageSizeParam);

    await connectToDatabase();
    
    let query: any = {};
    if (category) query.category = category;
    if (isBestProduct === "true") query.isBestProduct = true;
    if (subCategory && subCategory !== "All") query.subCategory = subCategory;
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } }
      ];
    }

    const revalidateTime = parseInt(process.env.CACHE_TTL_PRODUCTS || "3600");
    const cacheKey = `products-${category}-${subCategory}-${isBestProduct}-${searchTerm}-${page}-${pageSize}`;

    // Server-side cached function
    const getCachedData = unstable_cache(
      async () => {
        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .lean();
        return { items: products, total };
      },
      [cacheKey],
      { revalidate: revalidateTime, tags: ["products"] }
    );

    const { items, total } = await getCachedData();

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }, {
      headers: {
        'Cache-Control': `public, max-age=${revalidateTime}, stale-while-revalidate=59`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    await connectToDatabase();
    
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
