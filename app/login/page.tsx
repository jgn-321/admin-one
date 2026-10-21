"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

interface NameOption {
  name: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, login } = useAuth();

  const [name, setName] = useState("");
  const [nrp, setNrp] = useState("");
  const [nameSuggestions, setNameSuggestions] = useState<NameOption[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFetchingNames, setIsFetchingNames] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNrp, setShowNrp] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // If already logged in, redirect to home page
  useEffect(() => {
    if (!authLoading && user) {
      window.location.href = "/";
    }
  }, [user, authLoading]);

  // Fetch names list (strictly name only, no NRP)
  useEffect(() => {
    setIsFetchingNames(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.users && Array.isArray(data.users)) {
          setNameSuggestions(data.users);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data nama:", err);
      })
      .finally(() => {
        setIsFetchingNames(false);
      });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter names based on user input
  const filteredNames = nameSuggestions.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleSelectName = (selectedName: string) => {
    setName(selectedName);
    setIsDropdownOpen(false);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedNrp = nrp.trim();

    if (!trimmedName) {
      setErrorMessage("Silakan isi nama karyawan");
      return;
    }

    if (!trimmedNrp) {
      setErrorMessage("Silakan isi Nomor Registrasi Pokok (NRP)");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(trimmedName, trimmedNrp);
      if (result.success) {
        window.location.href = "/";
      } else {
        setErrorMessage(
          result.error || "Nama atau NRP tidak sesuai. Silakan periksa kembali."
        );
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan. Silakan coba kembali.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-neutral-100 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/login-background.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-yellow-500/10 via-yellow-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm"
          aria-label="Kembali ke Beranda AdminOne"
        >
          <span className="font-extrabold text-2xl tracking-wider text-white">
            ADMIN
          </span>
          <span className="font-extrabold text-2xl tracking-wider text-yellow-400">
            ONE
          </span>
        </Link>

        {/* Corporate Logos */}
        <div className="flex items-center gap-4">
          <div className="relative h-7 w-28 flex items-center justify-center">
            <Image
              src="/ut-logo.png"
              alt="United Tractors"
              width={112}
              height={28}
              className="object-contain max-h-full"
              priority
            />
          </div>
          <div className="relative h-7 w-10 flex items-center justify-center">
            <Image
              src="/gsi.png"
              alt="Global Service Indonesia"
              width={40}
              height={28}
              className="object-contain max-h-full"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Card Box */}
          <div className="bg-[#171717] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-neutral-800">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Login
                </h1>
              </div>
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-xs sm:text-sm animate-[modalSlideIn_0.2s_ease-out]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="leading-snug">{errorMessage}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Nama Karyawan (Searchable & Selectable, NO NRP or labels shown) */}
              <div ref={dropdownRef} className="relative">
                <label
                  htmlFor="employee-name"
                  className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2"
                >
                  Nama Karyawan
                </label>
                <div className="relative">
                  <input
                    id="employee-name"
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setIsDropdownOpen(true);
                      setErrorMessage("");
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder={
                      isFetchingNames
                        ? "Memuat daftar nama..."
                        : "Ketik atau pilih nama Anda..."
                    }
                    autoComplete="off"
                    required
                    className="w-full px-4 py-3 bg-[#202020] border border-neutral-700 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all pr-10"
                  />
                  {/* Dropdown Toggle Chevron */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      nameInputRef.current?.focus();
                    }}
                    aria-label="Tampilkan pilihan nama"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors p-1"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>

                {/* Dropdown Menu (Strictly clean list of names only) */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 max-h-52 overflow-y-auto bg-[#1c1c1c] border border-neutral-700 rounded-xl shadow-2xl z-30 scrollbar-thin divide-y divide-neutral-800">
                    {filteredNames.length > 0 ? (
                      filteredNames.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => handleSelectName(item.name)}
                          className="w-full px-4 py-2.5 text-left text-sm text-neutral-200 hover:bg-neutral-800 hover:text-yellow-400 transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium truncate">
                            {item.name}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-xs text-neutral-400 text-center">
                        {isFetchingNames
                          ? "Memuat data nama..."
                          : "Nama tidak ditemukan dalam daftar"}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Field 2: NRP (Nomor Registrasi Pokok) */}
              <div>
                <label
                  htmlFor="employee-nrp"
                  className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2"
                >
                  NRP
                </label>
                <div className="relative">
                  <input
                    id="employee-nrp"
                    type={showNrp ? "text" : "password"}
                    value={nrp}
                    onChange={(e) => {
                      setNrp(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Masukkan NRP Anda"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 bg-[#202020] border border-neutral-700 rounded-xl text-white font-mono text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all pr-11"
                  />
                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => setShowNrp(!showNrp)}
                    aria-label={showNrp ? "Sembunyikan NRP" : "Tampilkan NRP"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors p-1"
                  >
                    {showNrp ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-yellow-400/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Memuat....</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs text-neutral-400 border-t border-neutral-900 relative z-10">
        &copy; 2026 UT LJS. Seluruh hak cipta dilindungi.
      </footer>
    </div>
  );
}
