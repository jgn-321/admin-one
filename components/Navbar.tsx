"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { SIDEBAR_ALLOWED_NRPS } from "./QuickContactSidebar";

type SupportSidebar = "gsi" | "ljs";

interface NavbarProps {
  appName?: string;
  logoUT?: string;
  logoGSI?: string;
  logoLJS?: string;
  openSupportSidebar: (sidebar: SupportSidebar) => void;
  activeSupportSidebar: SupportSidebar | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  appName = "ADMINONE",
  logoUT = "/ut-logo.png",
  logoGSI = "/gsi.png",
  logoLJS = "/ljs.png",
  openSupportSidebar,
  activeSupportSidebar,
}) => {
  const { user, loading, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const canAccessGsiSupport = user && SIDEBAR_ALLOWED_NRPS.includes(user.nrp);

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

          {/* LJS Logo */}
          <div className="relative h-10 md:h-12 w-14 md:w-16 flex items-center justify-center">
            <Image
              src={logoLJS}
              alt="LJS"
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
                  aria-expanded={isUserMenuOpen}
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
                  <div className="absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-neutral-700 bg-[#141414] text-white shadow-2xl animate-[modalSlideIn_0.2s_ease-out] z-50">
                    <div className="flex items-center gap-3 border-b border-neutral-700 px-4 py-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-black">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-white">
                          {user.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-yellow-400">
                          NRP: {user.nrp}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 p-2">
                      {canAccessGsiSupport && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            openSupportSidebar("gsi");
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                            activeSupportSidebar === "gsi"
                              ? "bg-yellow-500/20 font-semibold text-yellow-400"
                              : "text-neutral-200 hover:bg-neutral-800"
                          }`}
                        >
                          <svg
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0 text-neutral-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 13a8 8 0 0 1 16 0" />
                            <path d="M4 13v4a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Zm16 0v4a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
                            <path d="M17 19a5 5 0 0 1-5 3" />
                          </svg>
                          <span>GSI HO Contact Support</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          openSupportSidebar("ljs");
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                          activeSupportSidebar === "ljs"
                            ? "bg-yellow-500/20 font-semibold text-yellow-400"
                            : "text-neutral-200 hover:bg-neutral-800"
                        }`}
                      >
                        <svg
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2a5 5 0 0 0-3.54 8.54A7 7 0 0 0 5 16.5V19h14v-2.5a7 7 0 0 0-3.46-5.96A5 5 0 0 0 12 2Zm-3 15a3 3 0 0 1 6 0H9Zm-5.5-2.5a3.5 3.5 0 0 0-3.5 3.5V19h6v-2.5c0-.7.1-1.38.28-2.02A3.47 3.47 0 0 0 3.5 14.5Zm17 0a3.47 3.47 0 0 0-2.78-.02c.18.64.28 1.32.28 2.02V19h6v-1a3.5 3.5 0 0 0-3.5-3.5Z" />
                        </svg>
                        <span>Admin LJS Support</span>
                      </button>
                    </div>

                    <div className="border-t border-neutral-700 p-2">
                      <button
                        type="button"
                        onClick={async () => {
                          setIsUserMenuOpen(false);
                          await logout();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-neutral-200 transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        <svg
                          width="22"
                          height="22"
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
                        <span>Keluar</span>
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
