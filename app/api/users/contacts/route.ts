import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * NRP list for sidebar "Quick Contact" users.
 * These users get the sidebar with their role information.
 */
const SIDEBAR_NRPS = [
  "91317007",
  "90121109",
  "91317009",
  "91317008",
  "91317003",
  "91317005",
  "91322325",
];

export async function GET() {
  try {
    const { data: contacts, error } = await supabaseAdmin
      .from("users")
      .select("id, name, nrp, role_id")
      .in("nrp", SIDEBAR_NRPS)
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Gagal mengambil data kontak" },
        { status: 500 }
      );
    }

    // Get role names
    const roleIds = [...new Set((contacts ?? []).map((c) => c.role_id).filter(Boolean))];
    let roleMap: Record<number, string> = {};

    if (roleIds.length > 0) {
      const { data: roles } = await supabaseAdmin
        .from("roles")
        .select("id, name")
        .in("id", roleIds);

      if (roles) {
        roleMap = Object.fromEntries(roles.map((r) => [r.id, r.name]));
      }
    }

    const enrichedContacts = (contacts ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      nrp: c.nrp,
      role: roleMap[c.role_id] ?? "",
    }));

    return NextResponse.json({ contacts: enrichedContacts });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
