import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const allowedOrigins = [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_BASE_URL,
  ].filter(Boolean);

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!origin && !referer) {
      return new NextResponse("not found", { status: 403 });
    }

    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse("Access Denied - Invalid Origin", {
        status: 403,
      });
    }

    // Check referer if origin is not present
    if (!origin && referer) {
      const refererUrl = new URL(referer);
      const isAllowed = allowedOrigins.some((allowed) => {
        if (!allowed) return false;
        const allowedUrl = new URL(allowed);
        return refererUrl.origin === allowedUrl.origin;
      });

      if (!isAllowed) {
        return new NextResponse("Access Denied - Invalid Referer", {
          status: 403,
        });
      }
    }

    // Set CORS headers for allowed requests
    const response = NextResponse.next();
    response.headers.set(
      "Access-Control-Allow-Origin",
      origin || (referer ? new URL(referer).origin : allowedOrigins[0]) || "*"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
