import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    
    // Protect /quotation and /admin routes for admin only
    if (req.nextUrl.pathname.startsWith("/quotation") || req.nextUrl.pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Only require auth for restricted routes
        if (req.nextUrl.pathname.startsWith("/quotation") || req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = { matcher: ["/quotation/:path*", "/admin/:path*"] };
