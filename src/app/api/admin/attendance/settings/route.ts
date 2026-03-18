import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    let fullDayHours = await prisma.settings.findUnique({
      where: { key: "FULL_DAY_HOURS" }
    });
    
    if (!fullDayHours) {
      fullDayHours = await prisma.settings.create({
        data: { key: "FULL_DAY_HOURS", value: 9 }
      });
    }

    return NextResponse.json(fullDayHours);
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { value } = await req.json();
    const settings = await prisma.settings.upsert({
      where: { key: "FULL_DAY_HOURS" },
      update: { value },
      create: { key: "FULL_DAY_HOURS", value }
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
