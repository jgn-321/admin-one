import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    // Only return names for auto-suggestion; NEVER expose NRP or access roles to the client
    const { data: users, error } = await supabaseAdmin
      .from("users")
      .select("name")
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Gagal mengambil data pengguna" },
        { status: 500 }
      );
    }

    // Return unique clean names only
    const uniqueNames = Array.from(
      new Set((users ?? []).map((u) => u.name?.trim()).filter(Boolean))
    ).map((name) => ({ name }));

    return NextResponse.json({ users: uniqueNames });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
