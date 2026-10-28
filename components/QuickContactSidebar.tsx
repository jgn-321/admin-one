"use client";

import React from "react";
import { useAuth } from "./AuthProvider";

interface QuickContactPerson {
  id: string;
  name: string;
  role: string;
}

interface QuickContactSidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isAnotherSidebarOpen: boolean;
}

// 7 NRP yang diizinkan melihat sidebar khusus ini
export const SIDEBAR_ALLOWED_NRPS = [
  "91317007",
  "90121109",
  "91317009",
  "91317008",
  "91317003",
  "91317005",
  "91322325",
];

// Data kontak persis seperti pada desain yang diberikan
const QUICK_CONTACTS: QuickContactPerson[] = [
  {
    id: "yuli",
    name: "Yuli Sarah (Yuli)",
    role: "Payroll, BPJS Kesehatan & Ketenagakerjaan",
  },
  {
    id: "adzra",
    name: "Zharifah Adzra (Adzra)",
    role: "BPJS Kesehatan & Ketenagakerjaan Support, Koperasi YKBUT, Culture Management",
  },
  {
    id: "mutia",
    name: "Tjut Kumala Mutia (Mutia)",
    role: "Overtime, Cuti dan Izin, Perjalanan Dinas, Tickening, Kontrak Karyawan, Santunan Suka/Duka Cita",
  },
  {
    id: "ilham",
    name: "Ilham Akbar Wiguna (Ilham)",
    role: "ISO, EHS, GA",
  },
  {
    id: "ariansyah",
    name: "Ariansyah Bayu Pratama",
    role: "Industrial Relation dan Legal Staff",
  },
];

export const QuickContactSidebar: React.FC<QuickContactSidebarProps> = ({
  isOpen,
  onOpenChange,
  isAnotherSidebarOpen,
}) => {
  const { user } = useAuth();

  // Hanya ditampilkan jika user sedang login dan NRP-nya terdaftar di antara 7 NRP khusus
  const isAuthorized = user && SIDEBAR_ALLOWED_NRPS.includes(user.nrp);

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      {/* Floating Toggle Button (muncul saat sidebar diminimalkan) */}
      {!isOpen && !isAnotherSidebarOpen && (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="fixed right-0 top-24 z-50 bg-[#141414] text-[#EAB308] border border-neutral-700 border-r-0 rounded-l-lg px-3 py-3 shadow-2xl hover:bg-neutral-800 transition-all flex items-center gap-2 text-xs font-bold"
          title="Buka Quick Contact"
        >
          <span>GSI HO Contact</span>
        </button>
      )}

      {/* Sidebar Panel persis seperti desain referensi */}
      <aside
        className={`fixed right-0 top-0 h-full w-[270px] sm:w-[305px] z-50 bg-[#141414] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out border-l border-neutral-800/80 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header: Quick Contact warna kuning emas + tombol minimize */}
        <div className="pt-6 pb-4 px-6 flex items-center justify-between">
          <h2 className="text-[#EAB308] text-base sm:text-lg font-medium tracking-wide">
            GSI HO Contact Support
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:text-white p-1 rounded transition-colors"
            title="Sembunyikan Sidebar"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Garis Horizontal Pemisah (Garis putih tipis sesuai desain) */}
        <div className="w-full h-[1px] bg-neutral-200/90 mb-2" />

        {/* List Kontak: setiap item terhubung ke WhatsApp aman via backend API */}
        <div className="flex-1 overflow-y-auto scrollbar-thin divide-y-0">
          {QUICK_CONTACTS.map((contact) => (
            <a
              key={contact.id}
              href={`/api/contact/whatsapp?target=${contact.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block px-6 py-4 cursor-pointer transition-colors duration-150 hover:bg-[#D4D6D9] text-left focus:outline-none focus:bg-[#D4D6D9]"
              title={`Hubungi ${contact.name} via WhatsApp`}
            >
              {/* Nama Person */}
              <div className="flex items-center justify-between">
                <p className="text-[14px] sm:text-[15px] font-normal text-white group-hover:text-black leading-snug transition-colors">
                  {contact.name}
                </p>
                {/* Subtle WhatsApp Icon on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 text-xs shrink-0 ml-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.587 1.761.88 2.79.88h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.211c-.147.414-.733.766-1.025.795-.29.028-.667.143-2.315-.544-1.986-.827-3.266-2.846-3.365-2.978-.098-.133-.804-1.069-.804-2.039 0-.97.509-1.447.69-1.643.181-.196.393-.245.525-.245.131 0 .262.001.378.007.123.006.287-.046.449.344.164.394.558 1.36.608 1.459.049.098.082.213.016.344-.065.132-.098.213-.196.328-.098.115-.208.257-.297.345-.1.098-.204.205-.088.404.115.197.513.847 1.1 1.37.755.673 1.391.882 1.589.98.197.098.312.082.427-.049.115-.131.492-.573.623-.769.131-.197.262-.164.443-.098.181.065 1.15.542 1.347.64.197.098.328.147.377.229.049.082.049.475-.098.889z" />
                  </svg>
                </span>
              </div>
              {/* Jabatan / Tanggung Jawab */}
              <p className="text-[11px] sm:text-[12px] text-neutral-400 group-hover:text-[#262626] mt-1 leading-relaxed transition-colors">
                {contact.role}
              </p>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};
