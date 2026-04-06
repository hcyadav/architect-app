import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let category = searchParams.get("category");
    if (category === "product") category = "residential";
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
    
    // Auto-generate SKU if not provided
    if (!body.sku) {
      const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
      const prefix = body.companyName ? body.companyName.substring(0, 3).toUpperCase() : "ARCH";
      body.sku = `${prefix}-${randomStr}`;
    }

    // Ensure data types are correct for Prisma
    if (body.discountPercentage) body.discountPercentage = parseFloat(body.discountPercentage);
    if (body.price) body.price = parseFloat(body.price);
    if (body.mrp) body.mrp = parseFloat(body.mrp);
    if (body.stock) body.stock = parseInt(body.stock);

    // Generate Slug
    let slug = slugify(body.title);
    // Check for uniqueness
    const existingSlug = await prisma.product.findUnique({
      where: { slug }
    });
    if (existingSlug) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
    }
    body.slug = slug;

    const product = await prisma.product.create({
      data: body,
    });

    // Revalidate paths cache
    revalidatePath("/products");
    revalidatePath("/residential");
    revalidatePath("/corporate");
    revalidatePath("/premium");
    revalidatePath("/");
    // @ts-ignore
    revalidateTag("products");

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 },
    );
  }
}
