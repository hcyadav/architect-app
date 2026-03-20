import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const isBestProduct = searchParams.get("isBestProduct");
    const searchTerm = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSizeParam =
      searchParams.get("pageSize") || process.env.NEXT_PUBLIC_PAGE_SIZE || "10";
    const pageSize = isNaN(parseInt(pageSizeParam))
      ? 10
      : parseInt(pageSizeParam);

    let where: any = {};
    if (category) where.category = category;
    if (isBestProduct === "true") where.isBestProduct = true;
    if (subCategory && subCategory !== "All") where.subCategory = subCategory;
    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json(
      {
        items: products,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 },
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

    const product = await prisma.product.create({
      data: body,
    });

    // Revalidate paths cache
    revalidatePath("/products");
    revalidatePath("/premium");
    revalidatePath("/corporate");
    revalidatePath("/residential");
    revalidatePath("/");
    // @ts-ignore
    revalidateTag("products");
    // @ts-ignore
    revalidateTag("subcategories");

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 },
    );
  }
}
