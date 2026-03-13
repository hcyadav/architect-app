import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    // Use the params parameter, wait, params in Next 15 is slightly different
    // params is a Promise in Next.js 15, let's await it
    const paramsResolved = await params;
    const revalidateTime = parseInt(process.env.CACHE_TTL_PRODUCTS || "3600");
    
    const product = await Product.findById(paramsResolved.id).lean();
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    
    return NextResponse.json(product, {
      headers: {
        'Cache-Control': `public, s-maxage=${revalidateTime}, stale-while-revalidate=59`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}
