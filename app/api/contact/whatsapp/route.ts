import { NextRequest, NextResponse } from "next/server";

// Peta konfigurasi target kontak ke nama environment variable dan pesan default
const CONTACT_CONFIG: Record<
  string,
  { envKey: string; name: string; message: string }
> = {
  yuli: {
    envKey: "WA_PHONE_YULI",
    name: "Ibu Yuli Sarah",
    message: "Halo Ibu Yuli, saya ingin berkonsultasi mengenai Payroll / BPJS.",
  },
  adzra: {
    envKey: "WA_PHONE_ADZRA",
    name: "Ibu Zharifah Adzra",
    message:
      "Halo Ibu Adzra, saya ingin berkonsultasi mengenai BPJS Ketenagakerjaan / Koperasi YKBUT / Culture Management.",
  },
  mutia: {
    envKey: "WA_PHONE_MUTIA",
    name: "Ibu Tjut Kumala Mutia",
    message:
      "Halo Ibu Mutia, saya ingin berkonsultasi terkait Cuti/Izin/Overtime/Perjalanan Dinas.",
  },
  ilham: {
    envKey: "WA_PHONE_ILHAM",
    name: "Pak Ilham Akbar Wiguna",
    message: "Halo Pak Ilham, saya ingin berkonsultasi terkait ISO, EHS, atau GA.",
  },
  ariansyah: {
    envKey: "WA_PHONE_ARIANSYAH",
    name: "Pak Ariansyah Bayu Pratama",
    message:
      "Halo Pak Ariansyah, saya ingin berkonsultasi terkait Industrial Relation dan Legal.",
  },
  isma: {
    envKey: "WA_PHONE_ISMA",
    name: "Isma Alfian",
    message: "Halo Pak Isma, saya ingin berkonsultasi mengenai Administration.",
  },
  fredy: {
    envKey: "WA_PHONE_FREDY",
    name: "Fredy Adams",
    message: "Halo Pak Fredy, saya ingin berkonsultasi mengenai ESR.",
  },
  shandy: {
    envKey: "WA_PHONE_SHANDY",
    name: "Shandy SN",
    message: "Halo Pak Shandy, saya ingin berkonsultasi mengenai HC & PST.",
  },
  herry: {
    envKey: "WA_PHONE_HERRY",
    name: "Herry",
    message: "Halo Pak Herry, saya ingin berkonsultasi mengenai Account Payable atau Benefit Perumahan.",
  },
  ayu: {
    envKey: "WA_PHONE_AYU",
    name: "Ayu Marinda",
    message: "Halo Ibu Ayu, saya ingin berkonsultasi mengenai Cashier atau Perjalanan Dinas.",
  },
  nyanto: {
    envKey: "WA_PHONE_NYANTO",
    name: "Nyanto",
    message: "Halo Pak Nyanto, saya ingin berkonsultasi mengenai General Affair atau Catering.",
  },
  indra: {
    envKey: "WA_PHONE_INDRA",
    name: "Indra Lesmana W",
    message: "Halo Pak Indra, saya ingin berkonsultasi mengenai Account Receivable atau Support ESR.",
  },
  support: {
    envKey: "WA_PHONE_SUPPORT",
    name: "Admin One United Tractors",
    message: "Halo Admin One United Tractors, saya memerlukan bantuan operasional.",
  },
};

/**
 * Normalisasi nomor HP: ubah format '08...' menjadi '628...', bersihkan karakter non-angka.
 */
function normalizePhoneNumber(rawNumber?: string): string {
  if (!rawNumber) return "628111974100"; // Fallback default
  const cleaned = rawNumber.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1);
  }
  return cleaned;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const target = (searchParams.get("target") || "support").toLowerCase();

  const config = CONTACT_CONFIG[target] || CONTACT_CONFIG.support;
  const rawPhone = process.env[config.envKey] || process.env.WA_PHONE_SUPPORT;
  const phoneNumber = normalizePhoneNumber(rawPhone);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    config.message
  )}`;

  // Redirect langsung ke WhatsApp
  return NextResponse.redirect(whatsappUrl, { status: 307 });
}
