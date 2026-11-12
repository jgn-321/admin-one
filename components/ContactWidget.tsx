import React from "react";
import { CONTACT_DATA } from "@/data/services";

interface ContactWidgetProps {
  title?: string;
  subtitle?: string;
  href?: string;
}

export const ContactWidget: React.FC<ContactWidgetProps> = ({
  title = CONTACT_DATA.title,
  subtitle = CONTACT_DATA.subtitle,
  href = "/api/contact/whatsapp?target=support",
}) => {
  return (
    <aside className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-yellow-500 sm:h-14 sm:w-14">
          <svg
            aria-hidden="true"
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 21h6v-1H9v1Zm3-20a7 7 0 0 0-4.9 11.99c.6.59.9 1.17.9 2.01h8c0-.84.3-1.42.9-2.01A7 7 0 0 0 12 1Zm2.7 11.27A5.02 5.02 0 0 0 13 15h-2c0-1.42-.55-2.23-1.7-3.73A5 5 0 1 1 14.7 12.27ZM10 18h4v1h-4v-1Z" />
            <path d="m12 3 1 2.1 2.3.3-1.7 1.6.4 2.3L12 8.2l-2 1.1.4-2.3-1.7-1.6 2.3-.3L12 3Z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-extrabold leading-tight text-neutral-950 sm:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-neutral-600 sm:text-base">{subtitle}</p>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-neutral-950 shadow-sm transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:self-center"
      >
        Hubungi Support
        <svg
          aria-hidden="true"
          className="h-4 w-4"
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
      </a>
    </aside>
  );
};
