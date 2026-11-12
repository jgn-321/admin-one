"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { CornerDecoration } from "@/components/CornerDecoration";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ContactWidget } from "@/components/ContactWidget";
import { QuickContactSidebar } from "@/components/QuickContactSidebar";
import { QuickContactSidebar as QuickContactSidebarLjs } from "@/components/QuickContactSidebarLjs";
import { SERVICE_ITEMS } from "@/data/services";

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState<"gsi" | "ljs" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col relative isolate bg-[#f3f4f6] text-neutral-900 overflow-x-hidden">
      <CornerDecoration />

      {/* Top Navigation Bar */}
      <Navbar
        openSupportSidebar={(sidebar) => setOpenSidebar(sidebar)}
        activeSupportSidebar={openSidebar}
      />

      {/* Hero Banner with UT Headquarters */}
      <div className="relative z-10">
        <HeroBanner searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 relative z-10 flex flex-col">
        <div className="flex-1">
          <CategoryTabs items={SERVICE_ITEMS} searchTerm={searchTerm} />
        </div>

        <div className="mt-8 sm:mt-10 mb-2">
          <ContactWidget />
        </div>
      </main>

      {/* Quick Contact Sidebar (only visible for specific NRPs) */}
      <QuickContactSidebar
        isOpen={openSidebar === "gsi"}
        onOpenChange={(isOpen) => setOpenSidebar(isOpen ? "gsi" : null)}
      />

      {/* LJS Contact Sidebar */}
      <QuickContactSidebarLjs
        isOpen={openSidebar === "ljs"}
        onOpenChange={(isOpen) => setOpenSidebar(isOpen ? "ljs" : null)}
      />
    </div>
  );
}
