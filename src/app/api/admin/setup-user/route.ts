import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, secretKey } = body;

    const expectedKey = process.env.ADMIN_SETUP_KEY || "architect_secret_99";
    
    if (secretKey !== expectedKey) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid secret key." },
        { status: 401 }
      );
    }

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and Email are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        role: role || "admin",
      },
      create: {
        email,
        name,
        role: role || "admin",
      }
    });

    return NextResponse.json({
      message: "User set up successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error("Setup User Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
