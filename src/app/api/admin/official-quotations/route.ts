import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import OfficialQuotation from "@/models/OfficialQuotation";
import { sendCustomerQuotation } from "@/lib/nodemailer";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    
    // Check if session exists and is admin
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSizeParam = searchParams.get("pageSize") || process.env.NEXT_PUBLIC_PAGE_SIZE || "10";
    const pageSize = isNaN(parseInt(pageSizeParam)) ? 10 : parseInt(pageSizeParam);

    await connectToDatabase();
    
    const total = await OfficialQuotation.countDocuments();
    const quotations = await OfficialQuotation.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return NextResponse.json({
      items: quotations,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (error: any) {
    console.error("Fetch quotations error", error);
    return NextResponse.json({ 
      error: "Error fetching quotations", 
      details: error.message,
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    
    // Check if session exists and is admin
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { clientName, clientEmail, items, totalAmount, notes } = body;

    if (!clientName || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const quotationData: any = {
      clientName,
      items,
      totalAmount,
      notes,
    };
    if (clientEmail) {
      quotationData.clientEmail = clientEmail;
    }

    await connectToDatabase();
    const quotation = await OfficialQuotation.create(quotationData);

    // Send email to customer if email is provided
    if (clientEmail) {
      await sendCustomerQuotation(clientEmail, clientName, items, totalAmount, notes);
    }

    return NextResponse.json(quotation, { status: 201 });
  } catch (error: any) {
    console.error("Create quotation error", error);
    return NextResponse.json({ 
      error: "Error creating quotation",
      details: error.message,
    }, { status: 500 });
  }
}
