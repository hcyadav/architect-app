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

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const defaultLimit = process.env.EMPLOYEES_PAGE_LIMIT || "1";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || defaultLimit);
    const skip = (page - 1) * limit;

    let where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const [employees, totalEmployees] = await Promise.all([
      prisma.employee.findMany({
        where,
        orderBy: [
          { firstName: 'asc' },
          { lastName: 'asc' }
        ],
        skip,
        take: limit,
      }),
      prisma.employee.count({ where })
    ]);

    return NextResponse.json({
      employees,
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("Fetch employees error:", error);
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
    const { joiningDate, ...rest } = body;
    
    const employee = await prisma.employee.create({
      data: {
        ...rest,
        joiningDate: joiningDate ? new Date(joiningDate) : new Date()
      }
    });
    return NextResponse.json(employee, { status: 201 });
  } catch (error: any) {
    console.error("Create employee error:", error);
    return NextResponse.json({ error: "Failed to create employee", details: error.message }, { status: 500 });
  }
}

