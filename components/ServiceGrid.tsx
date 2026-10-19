import React from "react";
import { ServiceItem } from "@/types/dashboard";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  items: ServiceItem[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ items }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {items.map((item) => (
        <ServiceCard key={item.id} item={item} />
      ))}
    </div>
  );
};
