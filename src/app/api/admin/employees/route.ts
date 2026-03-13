import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const defaultLimit = process.env.EMPLOYEES_PAGE_LIMIT || "1";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || defaultLimit);
    const skip = (page - 1) * limit;

    await connectToDatabase();
    
    let query: any = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } }
      ];
    }
    
    if (status) {
      query.status = status;
    }

    const [employees, totalEmployees] = await Promise.all([
      Employee.find(query)
        .sort({ firstName: 1, lastName: 1 })
        .skip(skip)
        .limit(limit),
      Employee.countDocuments(query)
    ]);

    return NextResponse.json({
      employees,
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    await connectToDatabase();
    const employee = await Employee.create(body);
    return NextResponse.json(employee, { status: 201 });
  } catch (error: any) {
    console.error("Create employee error:", error);
    return NextResponse.json({ error: "Failed to create employee", details: error.message }, { status: 500 });
  }
}

