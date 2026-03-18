import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const paramsResolved = await params;
    const revalidateTime = parseInt(process.env.CACHE_TTL_PRODUCTS || "3600");
    
    const product = await prisma.product.findUnique({
      where: { id: paramsResolved.id }
    });
    
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    
    return NextResponse.json(product, {
      headers: {
        'Cache-Control': `public, s-maxage=${revalidateTime}, stale-while-revalidate=59`
      }
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
}
