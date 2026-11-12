"use client";

import React, { useState } from "react";
import { ServiceItem } from "@/types/dashboard";
import { ServiceGrid } from "./ServiceGrid";

interface CategoryTabsProps {
  items: ServiceItem[];
  searchTerm?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  items,
  searchTerm = "",
}) => {
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean)),
  ) as string[];
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "");
  const [showAll, setShowAll] = useState(false);
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const filteredItems = items
    .filter(
      (item) =>
        showAll || normalizedSearch || item.category === activeCategory,
    )
    .filter(
      (item) =>
        !normalizedSearch ||
        [item.title, item.description, item.category]
          .filter((value): value is string => Boolean(value))
          .some((value) =>
            value.toLocaleLowerCase().includes(normalizedSearch),
          ),
    );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-neutral-300">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <h2 className="shrink-0 rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-yellow-400 shadow-sm sm:text-base">
            Daftar Layanan
          </h2>
          <div
            className="flex min-w-0 gap-1 overflow-x-auto"
            role="tablist"
            aria-label="Kategori layanan"
          >
            {categories.map((category) => {
              const isActive = category === activeCategory && !showAll;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowAll(false);
                  }}
                  className={`shrink-0 border-b-[3px] px-3 py-3 text-sm font-semibold transition-colors sm:px-4 sm:text-base ${
                    isActive
                      ? "border-yellow-400 text-neutral-950"
                      : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          aria-pressed={showAll}
          onClick={() => setShowAll((current) => !current)}
          className={`inline-flex shrink-0 items-center gap-2 py-2 text-sm font-semibold transition-colors ${
            showAll
              ? "text-amber-700"
              : "text-neutral-700 hover:text-amber-700"
          }`}
        >
          {showAll ? "Tampilkan kategori" : "Lihat semua layanan"}
          <svg
            aria-hidden="true"
            className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {filteredItems.length > 0 ? (
        <ServiceGrid items={filteredItems} />
      ) : (
        <p className="rounded-xl border border-dashed border-neutral-300 bg-white/70 px-4 py-8 text-center text-sm text-neutral-600">
          Tidak ada layanan yang cocok dengan pencarian Anda.
        </p>
      )}
    </div>
  );
};
