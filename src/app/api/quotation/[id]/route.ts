import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const { status, adminNotes, quotedPrice } = await req.json();

    const quotation = await prisma.quotation.update({
      where: { id },
      // @ts-ignore
      data: {
        status,
        adminNotes,
        quotedPrice: quotedPrice ? parseFloat(quotedPrice) : undefined,
      },
    });

    return NextResponse.json(quotation, { status: 200 });
  } catch (error) {
    console.error("Error updating quotation:", error);
    return NextResponse.json(
      { error: "Error updating quotation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    await prisma.quotation.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Quotation deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting quotation:", error);
    return NextResponse.json(
      { error: "Error deleting quotation" },
      { status: 500 }
    );
  }
}
