import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();
    let fullDayHours = await Settings.findOne({ key: "FULL_DAY_HOURS" });
    
    if (!fullDayHours) {
      fullDayHours = await Settings.create({ key: "FULL_DAY_HOURS", value: 9 });
    }

    return NextResponse.json(fullDayHours);
  } catch (error) {
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
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      { key: "FULL_DAY_HOURS" },
      { value },
      { upsert: true, new: true }
    );
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
