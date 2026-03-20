import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    console.log("Fetching subcategories for category:", category);
    const products = await prisma.product.findMany({
      where: category ? { category: category as any } : {},
      distinct: ['subCategory'],
      select: { subCategory: true }
    });
    
    const filteredSubCategories = products
      .map((p: any) => p.subCategory)
      .filter((sub: any): sub is string => !!sub && sub.trim() !== "");
      
    console.log("Filtered subcategories for", category, ":", filteredSubCategories);

    return NextResponse.json(filteredSubCategories, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
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
