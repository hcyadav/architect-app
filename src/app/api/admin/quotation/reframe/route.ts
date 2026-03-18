import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendReframedResponse } from "@/lib/nodemailer";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        // @ts-ignore
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { quotationId, reframedMessage } = await req.json();

        if (!quotationId || !reframedMessage) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const quotation = await prisma.quotation.findUnique({
            where: { id: quotationId },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });

        if (!quotation) {
            return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
        }

        // Send email to customer
        await sendReframedResponse(
            quotation.email || (quotation as any).user?.email,
            quotation.name || (quotation as any).user?.name,
            quotation.message,
            reframedMessage
        );

        // Update status
        const updatedQuotation = await prisma.quotation.update({
            where: { id: quotationId },
            data: { status: "reviewed" }
        });

        return NextResponse.json({ success: true, quotation: updatedQuotation });
    } catch (error: any) {
        console.error("Error reframing quotation:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
