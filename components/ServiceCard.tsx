import React from "react";
import Image from "next/image";
import { ServiceItem } from "@/types/dashboard";

interface ServiceCardProps {
  item: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const renderIcon = () => {
    if (item.iconType === "png" && item.iconSrc) {
      return (
        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-md flex items-center justify-center p-2 shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
          <Image
            src={item.iconSrc}
            alt={item.title}
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
      );
    }

    // Custom SVG fallback for items without dedicated PNG
    switch (item.svgType) {
      case "fuel":
        return (
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-md flex items-center justify-center p-2 shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Gas Pump Icon */}
              <path d="M19 5h-1V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5h1a2 2 0 0 0 2-2V9a4 4 0 0 0-2-4zm-5 13H6v-6h8v6zm0-8H6V5h8v5zm5 3h-1V9a2 2 0 0 1 1-1.73V13z" />
            </svg>
          </div>
        );
      case "store":
        return (
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-md flex items-center justify-center p-2 shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Marketplace / Storefront Icon */}
              <path d="M21.9 8.2l-1.9-4.8c-.3-.7-1-1.2-1.8-1.2H5.8c-.8 0-1.5.5-1.8 1.2L2.1 8.2c-.4 1-.2 2.1.5 2.8.4.4.9.6 1.4.6.6 0 1.2-.3 1.6-.7l.4-.5.4.5c.4.4 1 .7 1.6.7s1.2-.3 1.6-.7l.4-.5.4.5c.4.4 1 .7 1.6.7s1.2-.3 1.6-.7l.4-.5.4.5c.4.4 1 .7 1.6.7.5 0 1-.2 1.4-.6.7-.7.9-1.8.5-2.8zM4 13v7c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-7c-.5.4-1.2.6-1.9.6-.8 0-1.6-.4-2.1-1-.5.6-1.3 1-2.1 1s-1.6-.4-2.1-1c-.5.6-1.3 1-2.1 1s-1.6-.4-2.1-1c-.5.6-1.3 1-2.1 1-.7 0-1.4-.2-1.9-.6zM13 19h-2v-4h2v4z" />
            </svg>
          </div>
        );
      case "electric":
      default:
        return (
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-md flex items-center justify-center p-2 shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Electricity & Utilities Icon */}
              <path d="M7 2v11h3v9l7-12h-4l4-8H7z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : "_self"}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-label={item.title}
      className="group flex items-center gap-3.5 p-3 sm:p-3.5 bg-white rounded-lg shadow-sm border border-neutral-200/80 hover:shadow-md hover:border-yellow-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      {/* Black Square with Yellow Icon */}
      {renderIcon()}

      {/* Service Title */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-xs sm:text-[13px] leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
          {item.title}
        </h3>
      </div>
    </a>
  );
};
