import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client_v7";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    console.log("Test route body:", body);
    
    // Attempting to create with customFields to see if it even compiles/runs
    // We won't actually save if we don't want to mess up DB, but we want to see if PRISMA allows it.
    const test = await (prisma.officialQuotation as any).create({
        data: {
            clientName: "Test Client",
            items: [],
            customFields: [{ label: "Test", value: "Value" }],
            totalAmount: 0
        }
    });
    
    return NextResponse.json({ success: true, data: test });
  } catch (error: any) {
    console.error("Test route error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
