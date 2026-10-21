"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Legacy modal placeholder: redirects user to dedicated /login page
 * as per security policy to prevent credential leakage.
 */
export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-6 text-center z-10">
        <h3 className="text-lg font-bold text-white mb-2">Halaman Login Terpisah</h3>
        <p className="text-sm text-neutral-400 mb-6">
          Untuk menjaga keamanan kredensial, proses login dilakukan melalui halaman resmi yang terpisah.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-neutral-800 text-neutral-300 rounded-xl text-sm font-semibold hover:bg-neutral-700"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/login");
            }}
            className="flex-1 py-2.5 px-4 bg-yellow-400 text-black rounded-xl text-sm font-bold hover:bg-yellow-300"
          >
            Buka Halaman Login
          </button>
        </div>
      </div>
    </div>
  );
};
