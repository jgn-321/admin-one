import React from "react";
import Image from "next/image";
import { CONTACT_DATA } from "@/data/services";

interface ContactWidgetProps {
  title?: string;
  subtitle?: string;
  href?: string;
  iconSrc?: string;
}

export const ContactWidget: React.FC<ContactWidgetProps> = ({
  title = CONTACT_DATA.title,
  subtitle = CONTACT_DATA.subtitle,
  href = CONTACT_DATA.href,
  iconSrc = CONTACT_DATA.iconSrc,
}) => {
  return (
    <div className="fixed sm:sticky bottom-5 left-5 z-30">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} ${subtitle}`}
        className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-lg border border-neutral-200/90 hover:shadow-xl hover:border-yellow-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {/* Headset Icon Container */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black flex items-center justify-center shrink-0 shadow-sm p-1.5 group-hover:scale-105 transition-transform">
          <Image
            src={iconSrc}
            alt="Customer Support"
            width={26}
            height={26}
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-xs sm:text-sm text-gray-900 tracking-wide uppercase group-hover:text-amber-600 transition-colors">
            {title}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-500 font-medium leading-tight">
            {subtitle}
          </span>
        </div>
      </a>
    </div>
  );
};
