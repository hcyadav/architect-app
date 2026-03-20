import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { joiningDate, ...rest } = body;
    
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        ...rest,
        joiningDate: joiningDate ? new Date(joiningDate) : undefined
      },
    });
    
    return NextResponse.json(employee);
  } catch (error) {
    console.error("Update employee error:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    
    await prisma.employee.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    console.error("Delete employee error:", error);
    return NextResponse.json({ error: "Failed to delete employee", details: error.message }, { status: 500 });
  }
}
