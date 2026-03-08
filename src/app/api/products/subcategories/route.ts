import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Product from "@/models/Product";
import connectToDatabase from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query = category ? { category } : {};
    
    // Get unique subcategories
    const subCategories = await Product.distinct("subCategory", query);
    
    // Filter out null or empty strings
    const filteredSubCategories = subCategories.filter(
      (sub: string) => sub && sub.trim() !== ""
    );

    return NextResponse.json(filteredSubCategories);
  } catch (error) {
    console.error("Subcategories fetch error", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}
