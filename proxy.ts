import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Always allow access to /login unconditionally to prevent redirect loops
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // 2. Allow static files, Next.js internal assets, images, and auth APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/users") ||
    pathname === "/favicon.ico" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  // 3. Verify JWT authentication token
  const token = request.cookies.get("auth_token")?.value;
  let isAuthenticated = false;

  if (token) {
    const payload = await verifySessionToken(token);
    if (payload) {
      isAuthenticated = true;
    }
  }

  // 4. If not authenticated, redirect to /login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    if (token) {
      // Clear invalid/expired cookie
      response.cookies.delete("auth_token");
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
