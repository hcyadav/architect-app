import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendAdminNotification } from "@/lib/nodemailer";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSizeParam = searchParams.get("pageSize") || process.env.NEXT_PUBLIC_PAGE_SIZE || "10";
    const pageSize = isNaN(parseInt(pageSizeParam)) ? 10 : parseInt(pageSizeParam);

    const [total, quotations] = await Promise.all([
      prisma.quotation.count(),
      prisma.quotation.findMany({
        include: {
          user: {
            select: { name: true, email: true }
          },
          product: {
            select: { title: true, imageUrl: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      })
    ]);

    return NextResponse.json({
      items: quotations,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (error) {
    console.error("Error fetching quotations:", error);
    return NextResponse.json({ error: "Error fetching quotations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { name, email, message, productId } = await req.json();

    if (!session && (!name || !email)) {
      return NextResponse.json({ error: "Unauthorized or missing guest info" }, { status: 401 });
    }

    const quotation = await prisma.quotation.create({
      data: {
        // @ts-ignore
        userId: session?.user?.id || null,
        name: name || session?.user?.name,
        email: email || session?.user?.email,
        productId: productId || null,
        message,
      }
    });

    // Send email notification to admin
    const senderName = name || session?.user?.name;
    const senderEmail = email || session?.user?.email;
    
    if (senderName && senderEmail) {
      await sendAdminNotification(senderName, senderEmail, message);
    }

    return NextResponse.json(quotation, { status: 201 });
  } catch (error) {
    console.error("Error creating quotation:", error);
    return NextResponse.json({ error: "Error creating quotation" }, { status: 500 });
  }
}
