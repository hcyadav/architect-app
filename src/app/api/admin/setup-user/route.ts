import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { name, email, role, secretKey } = body;

    // Optional: Simple security check to avoid public abuse
    // You can set ADMIN_SETUP_KEY in your .env.local
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

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user
      user.role = role || "admin";
      user.name = name;
      await user.save();
      return NextResponse.json({
        message: "User updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        role: role || "admin",
      });
      return NextResponse.json({
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  } catch (error: any) {
    console.error("Setup User Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
