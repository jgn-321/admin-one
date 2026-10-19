import React from "react";
import Image from "next/image";

interface NavbarProps {
  appName?: string;
  logoUT?: string;
  logoGSI?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  appName = "ADMINONE",
  logoUT = "/ut-logo.png",
  logoGSI = "/gsi.png",
}) => {
  return (
    <header className="w-full bg-black text-white py-3 px-6 md:px-12 flex items-center justify-between border-b border-neutral-800 shadow-md relative z-20">
      {/* Brand Logo */}
      <a
        href="/"
        className="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm"
        aria-label="AdminOne Home"
      >
        <span className="font-extrabold text-xl md:text-2xl tracking-wider text-white">
          ADMIN
        </span>
        <span className="font-extrabold text-xl md:text-2xl tracking-wider text-yellow-400">
          ONE
        </span>
      </a>

      {/* Corporate Logos */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* United Tractors Logo */}
        <div className="relative h-7 md:h-9 w-28 md:w-36 flex items-center justify-center">
          <Image
            src={logoUT}
            alt="United Tractors - member of ASTRA"
            width={160}
            height={36}
            className="object-contain max-h-full"
            priority
          />
        </div>

        {/* GSI Logo */}
        <div className="relative h-7 md:h-9 w-12 md:w-16 flex items-center justify-center">
          <Image
            src={logoGSI}
            alt="Global Service Indonesia"
            width={60}
            height={36}
            className="object-contain max-h-full"
            priority
          />
        </div>
      </div>
    </header>
  );
};
