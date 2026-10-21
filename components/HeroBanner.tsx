import React from "react";
import Image from "next/image";
import { CornerDecoration } from "./CornerDecoration";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "PUSAT LAYANAN ADMINISTRASI UNITED TRACTORS",
  subtitle = "Akses Cepat dan Mudah untuk Seluruh Kebutuhan Operasional Anda",
  imageSrc = "/ut-building.png",
}) => {
  return (
    <section className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] overflow-hidden select-none">
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

      {/* Corner Decoration: Menimpa gambar background banner di bagian belakang teks */}
      <CornerDecoration />

      {/* Hero Typography Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide uppercase drop-shadow-md">
          {title}
        </h1>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-200 font-normal max-w-3xl drop-shadow">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
