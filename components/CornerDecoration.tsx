import React from "react";
import Image from "next/image";

interface CornerDecorationProps {
  imageSrc?: string;
}

export const CornerDecoration: React.FC<CornerDecorationProps> = ({
  imageSrc = "/DesainCorner.png",
}) => {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 right-0 pointer-events-none z-0 w-[240px] sm:w-[340px] md:w-[420px] lg:w-[480px] h-auto select-none opacity-90 transition-opacity"
    >
      <Image
        src={imageSrc}
        alt=""
        width={600}
        height={500}
        priority={false}
        className="w-full h-auto object-contain object-bottom-right"
      />
    </div>
  );
};
