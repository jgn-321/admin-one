"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

interface NavbarProps {
  appName?: string;
  logoUT?: string;
  logoGSI?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  appName = "ADMINONE",
  logoUT = "/ut-logo.png",
  logoGSI = "/gsi.png",
}) => {
  const { user, loading, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-black text-white py-3 px-4 sm:px-6 md:px-12 flex items-center justify-between border-b border-neutral-800 shadow-md relative z-20">
      {/* Brand Logo */}
      <Link
        href="/"
        className="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm shrink-0"
        aria-label={`${appName} Home`}
      >
        <span className="font-extrabold text-xl md:text-2xl tracking-wider text-white">
          ADMIN
        </span>
        <span className="font-extrabold text-xl md:text-2xl tracking-wider text-yellow-400">
          ONE
        </span>
      </Link>

      {/* Middle & Right Section: Corporate Logos + Auth Actions */}
      <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
        {/* Corporate Logos */}
        <div className="hidden lg:flex items-center gap-4 md:gap-6">
          {/* United Tractors Logo */}
          <div className="relative h-10 md:h-12 w-36 md:w-44 flex items-center justify-center">
            <Image
              src={logoUT}
              alt="United Tractors - member of ASTRA"
              width={180}
              height={52}
              className="object-contain w-auto h-full"
              priority
            />
          </div>

          {/* GSI Logo */}
          <div className="relative h-10 md:h-12 w-14 md:w-16 flex items-center justify-center">
            <Image
              src={logoGSI}
              alt="Global Service Indonesia"
              width={64}
              height={52}
              className="object-contain w-auto h-full"
              priority
            />
          </div>
        </div>

        {/* User Auth Section */}
        {!loading && (
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-yellow-400/60 hover:bg-neutral-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label="Menu Pengguna"
                >
                  {/* Avatar */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-extrabold text-xs sm:text-sm shadow-md">
                    {user.name.charAt(0)}
                  </div>

                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs sm:text-sm font-semibold text-white leading-tight max-w-[120px] sm:max-w-[170px] truncate">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-yellow-400 font-mono leading-tight">
                      NRP: {user.nrp}
                    </span>
                  </div>

                  {/* Chevron */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-neutral-400 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Logged in User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden animate-[modalSlideIn_0.2s_ease-out] z-50">
                    <div className="px-4 py-3 bg-neutral-800/80 border-b border-neutral-700">
                      <p className="text-sm font-bold text-white mt-0.5 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-yellow-400 font-mono mt-0.5">
                        NRP: {user.nrp}
                      </p>
                    </div>
                    
                    {/* Tombol Logout di dalam dropdown */}
                    <div className="p-1.5">
                      <button
                        type="button"
                        onClick={async () => {
                          setIsUserMenuOpen(false);
                          await logout();
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
};
