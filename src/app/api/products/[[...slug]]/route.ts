import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

const slugify = (text: string) => {
    return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
};

export async function GET(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
    try {
        const { slug } = await params;
        const { searchParams } = new URL(req.url);

        // 1. Subcategories: GET /api/products/subcategories
        if (slug?.[0] === "subcategories") {
            let category = searchParams.get("category");
            if (category === "product") category = "residential";
            const products = await prisma.product.findMany({ where: category ? { category: category as any } : {}, distinct: ['subCategory'], select: { subCategory: true } });
            const filtered = products.map((p: any) => p.subCategory).filter((sub: any): sub is string => !!sub && sub.trim() !== "");
            return NextResponse.json(filtered, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
        }

        // 2. Product Detail or Reviews: GET /api/products/[id] or /api/products/[id]/reviews
        if (slug && slug.length > 0) {
            const productId = slug[0];

            // GET /api/products/[id]/reviews
            if (slug[1] === "reviews") {
                const session = await getServerSession(authOptions);
                const userId = (session?.user as any)?.id;
                const [approved, own] = await Promise.all([
                    prisma.review.findMany({ where: { productId, status: "approved" }, include: { user: { select: { name: true, image: true } } }, orderBy: { createdAt: "desc" } }),
                    userId ? prisma.review.findFirst({ where: { productId, userId, status: { not: "rejected" } }, include: { user: { select: { name: true, image: true } } } }) : null
                ]);
                return NextResponse.json({ approved, userReview: own });
            }

            // GET /api/products/[id]
            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
            const ttl = process.env.CACHE_TTL_PRODUCTS || "3600";
            return NextResponse.json(product, { headers: { 'Cache-Control': `public, s-maxage=${ttl}, stale-while-revalidate=59` } });
        }

        // 3. Product List: GET /api/products
        let category = searchParams.get("category");
        if (category === "product") category = "residential";
        const subCategory = searchParams.get("subCategory");
        const isBestProduct = searchParams.get("isBestProduct");
        const searchTerm = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const pageSize = parseInt(searchParams.get("pageSize") || process.env.NEXT_PUBLIC_PAGE_SIZE || "10");

        let where: any = {};
        if (category) where.category = category;
        if (isBestProduct === "true") where.isBestProduct = true;
        if (subCategory && subCategory !== "All") where.subCategory = subCategory;
        if (searchTerm) where.OR = [{ title: { contains: searchTerm, mode: "insensitive" } }, { description: { contains: searchTerm, mode: "insensitive" } }];

        const [total, products] = await Promise.all([
            prisma.product.count({ where }),
            prisma.product.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize })
        ]);

        return NextResponse.json({ items: products, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }, { headers: { "Cache-Control": "no-store, max-age=0" } });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
    try {
        const { slug } = await params;
        const body = await req.json();
        const session = await getServerSession(authOptions);

        // 1. Submit Review: POST /api/products/[id]/reviews
        if (slug?.[1] === "reviews") {
            if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            const productId = slug[0];
            const { rating, comment } = body;
            const existing = await prisma.review.findFirst({ where: { userId: (session.user as any).id, productId } });
            if (existing) {
                if (existing.status === "rejected") {
                    return NextResponse.json(await prisma.review.update({ where: { id: existing.id }, data: { rating: Number(rating), comment, status: "pending", approvedAt: null } }));
                }
                return NextResponse.json({ error: "Already reviewed" }, { status: 409 });
            }
            return NextResponse.json(await prisma.review.create({ data: { userId: (session.user as any).id, productId, rating: Number(rating), comment } }), { status: 201 });
        }

        // 2. Create Product: POST /api/products
        if (!session || (session.user as any)?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        if (!body.sku) body.sku = `${body.companyName?.substring(0,3).toUpperCase() || "ARCH"}-${Math.random().toString(36).substring(2,7).toUpperCase()}`;
        if (body.discountPercentage) body.discountPercentage = parseFloat(body.discountPercentage);
        if (body.price) body.price = parseFloat(body.price);
        if (body.mrp) body.mrp = parseFloat(body.mrp);
        if (body.stock) body.stock = parseInt(body.stock);
        let s = slugify(body.title);
        const ex = await prisma.product.findUnique({ where: { slug: s } });
        body.slug = ex ? `${s}-${Math.random().toString(36).substring(2,6)}` : s;
        const product = await prisma.product.create({ data: body });
        ["/products", "/residential", "/corporate", "/premium", "/"].forEach(p => revalidatePath(p));
        // @ts-ignore
        revalidateTag("products");
        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
    try {
        const { slug } = await params;
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // 1. Edit Review: PUT /api/products/[id]/reviews
        if (slug?.[1] === "reviews") {
            const productId = slug[0];
            const review = await prisma.review.findFirst({ where: { userId: (session.user as any).id, productId } });
            if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });
            return NextResponse.json(await prisma.review.update({ where: { id: review.id }, data: { rating: Number(body.rating) || review.rating, comment: body.comment || review.comment, status: "pending", approvedAt: null } }));
        }

        // 2. Admin Update Product: PUT /api/products/[id]/admin
        if (slug?.[1] === "admin") {
            if ((session.user as any)?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            const id = slug[0];
            if (body.discountPercentage !== undefined) body.discountPercentage = parseFloat(body.discountPercentage || 0);
            if (body.price) body.price = parseFloat(body.price);
            if (body.mrp) body.mrp = parseFloat(body.mrp);
            if (body.stock) body.stock = parseInt(body.stock || 1);
            if (body.title && !body.slug) {
                let s = slugify(body.title);
                const ex = await prisma.product.findFirst({ where: { slug: s, id: { not: id } } });
                body.slug = ex ? `${s}-${Math.random().toString(36).substring(2,6)}` : s;
            }
            const product = await prisma.product.update({ where: { id }, data: body });
            ["/products", "/premium", "/corporate", "/residential", "/"].forEach(p => revalidatePath(p));
            // @ts-ignore
            revalidateTag("products"); revalidateTag("subcategories");
            return NextResponse.json(product);
        }

        return NextResponse.json({ error: "Invalid path" }, { status: 404 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
    try {
        const { slug } = await params;
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

        // 1. Admin Delete Product: DELETE /api/products/[id]/admin
        if (slug?.[1] === "admin") {
            const id = slug[0];
            const product = await prisma.product.findUnique({ where: { id }, select: { imageUrl: true, additionalImages: true } });
            if (product) {
                const keys: string[] = [];
                if (product.imageUrl) { const k = product.imageUrl.split("/").pop(); if (k) keys.push(k); }
                if (product.additionalImages && Array.isArray(product.additionalImages)) product.additionalImages.forEach(u => { const k = u.split("/").pop(); if (k) keys.push(k); });
                if (keys.length > 0) try { await utapi.deleteFiles(keys); } catch (e) {}
            }
            await prisma.product.delete({ where: { id } });
            ["/products", "/premium", "/corporate", "/residential", "/"].forEach(p => revalidatePath(p));
            // @ts-ignore
            revalidateTag("products"); revalidateTag("subcategories");
            return NextResponse.json({ message: "Deleted" });
        }
        return NextResponse.json({ error: "Invalid path" }, { status: 404 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
