import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

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
    
    // Ensure data types are correct for Prisma
    if (body.discountPercentage) {
      body.discountPercentage = parseFloat(body.discountPercentage);
    } else if (body.discountPercentage === "" || body.discountPercentage === null) {
      body.discountPercentage = null;
    }

    const product = await prisma.product.update({
      where: { id },
      data: body,
    });

    // Revalidate paths cache
    revalidatePath("/products");
    revalidatePath("/premium");
    revalidatePath("/corporate");
    revalidatePath("/residential");
    revalidatePath("/");
    // @ts-ignore
    revalidateTag("products");
    // @ts-ignore
    revalidateTag("subcategories");
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
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

    await prisma.product.delete({
      where: { id },
    });

    // Revalidate paths cache
    revalidatePath("/products");
    revalidatePath("/premium");
    revalidatePath("/corporate");
    revalidatePath("/residential");
    revalidatePath("/");
    // @ts-ignore
    revalidateTag("products");
    // @ts-ignore
    revalidateTag("subcategories");
    
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
