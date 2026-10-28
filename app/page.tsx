"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { CornerDecoration } from "@/components/CornerDecoration";
import { SectionHeader } from "@/components/SectionHeader";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ContactWidget } from "@/components/ContactWidget";
import { QuickContactSidebar } from "@/components/QuickContactSidebar";
import { QuickContactSidebar as QuickContactSidebarLjs } from "@/components/QuickContactSidebarLjs";
import { SERVICE_ITEMS } from "@/data/services";

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState<"gsi" | "ljs" | null>(null);

  return (
    <div className="min-h-screen flex flex-col relative isolate bg-[#f3f4f6] text-neutral-900 overflow-x-hidden">
      <CornerDecoration />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Hero Banner with UT Headquarters */}
      <div className="relative z-10">
        <HeroBanner />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-28 relative z-10 flex flex-col justify-between">
        <div>
          {/* Section Divider Tab */}
          <SectionHeader title="Daftar Layanan" />

          <CategoryTabs items={SERVICE_ITEMS} />
        </div>

        {/* Bottom Area: Contact Support Widget */}
        <div className="mt-12 sm:mt-16 mb-4 flex justify-start">
          <ContactWidget />
        </div>
      </main>

      {/* Quick Contact Sidebar (only visible for specific NRPs) */}
      <QuickContactSidebar
        isOpen={openSidebar === "gsi"}
        onOpenChange={(isOpen) => setOpenSidebar(isOpen ? "gsi" : null)}
        isAnotherSidebarOpen={openSidebar === "ljs"}
      />

      {/* LJS Contact Sidebar */}
      <QuickContactSidebarLjs
        isOpen={openSidebar === "ljs"}
        onOpenChange={(isOpen) => setOpenSidebar(isOpen ? "ljs" : null)}
        isAnotherSidebarOpen={openSidebar === "gsi"}
      />
    </div>
  );
}
