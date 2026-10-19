import React from "react";

interface SectionHeaderProps {
  title?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title = "Daftar Layanan",
}) => {
  return (
    <div className="relative w-full my-6 flex items-center">
      {/* Black Badge Tab */}
      <div className="z-10 bg-black text-yellow-400 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-sm shadow-sm select-none tracking-wide flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
        <span>{title}</span>
      </div>

      {/* Horizontal Divider Line */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="w-full border-t border-neutral-800" />
      </div>
    </div>
  );
};
