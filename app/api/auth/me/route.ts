import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("auth_token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ user: null });
    }

    const payload = await verifySessionToken(tokenCookie.value);
    if (!payload) {
      // Invalid or expired JWT token
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: payload.id,
        name: payload.name,
        nrp: payload.nrp,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
