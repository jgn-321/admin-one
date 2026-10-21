import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import { signSessionToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const nrp = typeof body.nrp === "string" ? body.nrp.trim() : "";

    if (!name || !nrp) {
      return NextResponse.json(
        { error: "Nama dan NRP wajib diisi" },
        { status: 400 }
      );
    }

    // Query user by NRP
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("id, name, nrp")
      .eq("nrp", nrp)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json(
        { error: "Nama atau NRP tidak valid. Silakan periksa kembali." },
        { status: 401 }
      );
    }

    // Compare name (case-insensitive and trimmed)
    if (user.name.trim().toLowerCase() !== name.toLowerCase()) {
      return NextResponse.json(
        { error: "Kombinasi Nama dan NRP tidak sesuai. Silakan periksa kembali." },
        { status: 401 }
      );
    }

    // Generate JWT token with user credentials payload
    const token = await signSessionToken({
      id: user.id,
      name: user.name,
      nrp: user.nrp,
    });

    // Set secure HTTP-only cookie with JWT token
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Clean up any legacy session_user cookie
    cookieStore.delete("session_user");

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, nrp: user.nrp },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat memproses login" },
      { status: 500 }
    );
  }
}
