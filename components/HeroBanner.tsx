import React from "react";
import Image from "next/image";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "PUSAT LAYANAN ADMINISTRASI UNITED TRACTORS",
  subtitle = "Akses Cepat dan Mudah untuk Seluruh Kebutuhan Operasional Anda",
  imageSrc = "/ut-building.png",
  searchTerm = "",
  onSearchChange,
}) => {
  return (
    <section className="relative w-full min-h-[260px] sm:min-h-[290px] overflow-hidden">
      {/* Background Building Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt="United Tractors Head Office Building"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0" />

      {/* Hero Typography Content */}
      <div className="relative z-10 min-h-[260px] sm:min-h-[290px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide uppercase drop-shadow-md">
          {title}
        </h1>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-200 font-normal max-w-3xl drop-shadow">
          {subtitle}
        </p>
        <label className="mt-6 sm:mt-7 flex w-full max-w-2xl items-center gap-3 rounded-full bg-white px-4 sm:px-5 py-3 text-neutral-500 shadow-lg focus-within:ring-2 focus-within:ring-yellow-400">
          <svg
            aria-hidden="true"
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Cari layanan, informasi, atau bantuan..."
            aria-label="Cari layanan"
            className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-500 sm:text-base"
          />
        </label>
      </div>
    </section>
  );
};
