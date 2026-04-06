import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// POST: Submit a new review
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: productId } = await params;
  const body = await req.json();
  const { rating, comment } = body;

  if (!rating || !comment) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Check if user already reviewed this product
    const existing = await prisma.review.findFirst({
      where: {
        userId: (session.user as any).id,
        productId: productId,
      },
    });

    if (existing) {
      // If the existing review was rejected, allow them to re-submit (update) it
      if (existing.status === "rejected") {
        const updated = await prisma.review.update({
          where: { id: existing.id },
          data: {
            rating: Number(rating),
            comment,
            status: "pending",
            approvedAt: null,
          },
        });
        return NextResponse.json(updated);
      }
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        userId: (session.user as any).id,
        productId: productId,
        rating: Number(rating),
        comment,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    console.error("Review Submission Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Edit an existing review (while pending)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: productId } = await params;
  const body = await req.json();
  const { rating, comment } = body;

  try {
    const review = await prisma.review.findFirst({
      where: {
        userId: (session.user as any).id,
        productId: productId,
      },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: review.id },
      data: {
        rating: Number(rating) || review.rating,
        comment: comment || review.comment,
        status: "pending",
        approvedAt: null,
      },
    });

    return NextResponse.json(updatedReview);
  } catch (error: any) {
    console.error("Review Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch approved reviews and user's own review
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const { id: productId } = await params;
  const userId = (session?.user as any)?.id;

  try {
    const [approvedReviews, userReview] = await Promise.all([
      prisma.review.findMany({
        where: {
          productId: productId,
          status: "approved",
          // Include all approved reviews, including the user's own
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      userId 
        ? prisma.review.findFirst({
            where: { 
              productId, 
              userId,
              status: { not: "rejected" } // If rejected, it should be removed from the product view
            },
            include: { user: { select: { name: true, image: true } } },
          })
        : null
    ]);

    return NextResponse.json({
      approved: approvedReviews,
      userReview: userReview,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
