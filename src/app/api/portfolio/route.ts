import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
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
