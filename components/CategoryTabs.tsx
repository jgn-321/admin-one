"use client";

import React, { useState } from "react";
import { ServiceItem } from "@/types/dashboard";
import { ServiceGrid } from "./ServiceGrid";

interface CategoryTabsProps {
  items: ServiceItem[];
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ items }) => {
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean)),
  ) as string[];
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "");
  const filteredItems = items.filter(
    (item) => item.category === activeCategory,
  );

  return (
    <div>
      <div
        className="mb-5 flex gap-2 overflow-x-auto border-b border-neutral-300"
        role="tablist"
        aria-label="Kategori layanan"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 border-b-2 px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                isActive
                  ? "border-yellow-400 text-neutral-950"
                  : "border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-900"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <ServiceGrid items={filteredItems} />
    </div>
  );
};
