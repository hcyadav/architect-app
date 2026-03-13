import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Quotation from "@/models/Quotation";
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

        await connectToDatabase();

        const quotation = await Quotation.findById(quotationId).populate("userId", "name email");

        if (!quotation) {
            return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
        }

        // Send email to customer
        await sendReframedResponse(
            quotation.email || quotation.userId?.email,
            quotation.name || quotation.userId?.name,
            quotation.message,
            reframedMessage
        );

        // Update status
        quotation.status = "reviewed";
        await quotation.save();

        return NextResponse.json({ success: true, quotation });
    } catch (error: any) {
        console.error("Error reframing quotation:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
