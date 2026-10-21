import React from "react";
import Image from "next/image";

interface CornerDecorationProps {
  imageSrc?: string;
  className?: string;
}

export const CornerDecoration: React.FC<CornerDecorationProps> = ({
  imageSrc = "/DesainCorner.png",
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute right-0 bottom-0 pointer-events-none z-[1] h-full w-[220px] sm:w-[300px] md:w-[380px] lg:w-[450px] flex items-end justify-end select-none opacity-90 transition-opacity ${className}`}
    >
      <Image
        src={imageSrc}
        alt=""
        width={600}
        height={500}
        priority={false}
        className="w-full h-full object-contain object-bottom-right"
      />
    </div>
  );
};
