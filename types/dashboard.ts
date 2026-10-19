export interface ServiceItem {
  id: string;
  title: string;
  href: string;
  iconSrc?: string;
  iconType?: "png" | "svg";
  svgType?: "fuel" | "store" | "electric" | "invoice";
  description?: string;
  category?: string;
  external?: boolean;
}

export interface HeaderNavProps {
  title?: string;
  logoUT?: string;
  logoGSI?: string;
}

export interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface ContactInfo {
  title: string;
  subtitle: string;
  href: string;
  iconSrc: string;
}
