import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

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

    // 1. Fetch product to get image URLs
    const product = await prisma.product.findUnique({
      where: { id },
      select: { imageUrl: true, additionalImages: true }
    });

    if (product) {
      // 2. Collect all image keys
      const imageKeys: string[] = [];
      if (product.imageUrl) {
        const key = product.imageUrl.split("/").pop();
        if (key) imageKeys.push(key);
      }
      if (product.additionalImages && Array.isArray(product.additionalImages)) {
        product.additionalImages.forEach(url => {
          const key = url.split("/").pop();
          if (key) imageKeys.push(key);
        });
      }

      // 3. Delete from UploadThing
      if (imageKeys.length > 0) {
        try {
          await utapi.deleteFiles(imageKeys);
        } catch (utError) {
          console.error("Error deleting files from UploadThing:", utError);
          // Continue even if UT delete fails
        }
      }
    }

    // 4. Delete from Database
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
