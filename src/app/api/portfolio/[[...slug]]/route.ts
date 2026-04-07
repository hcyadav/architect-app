import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  try {
    const { slug } = await params;
    
    // GET /api/portfolio/[id]
    if (slug && slug.length > 0) {
      const id = slug[0];
      const item = await prisma.portfolio.findUnique({
        where: { id },
        include: { product: true }
      });
      if (!item) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    // GET /api/portfolio
    const items = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
      include: { product: true }
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ error: "Error fetching portfolio" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: _id, product, createdAt, updatedAt, ...data } = await req.json();
    const item = await prisma.portfolio.create({
      data: data
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ error: "Error creating portfolio item" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { slug } = await params;
    if (!slug || slug.length === 0) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const id = slug[0];
    const { id: _id, product, createdAt, updatedAt, ...data } = await req.json();
    const item = await prisma.portfolio.update({
      where: { id },
      data: data
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return NextResponse.json({ error: "Error updating portfolio item" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { slug } = await params;
    if (!slug || slug.length === 0) {
       return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const id = slug[0];
    await prisma.portfolio.delete({
      where: { id }
    });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return NextResponse.json({ error: "Error deleting portfolio item" }, { status: 500 });
  }
}
