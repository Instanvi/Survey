"use client";

import { Languages, ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { localeLabels } from "@/lib/locale";
import { cn } from "@/lib/utils";

type Props = {
  value: Locale;
  onChange: (locale: Locale) => void;
  className?: string;
};

export function LocaleSwitcher({ value, onChange, className }: Props) {
  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <div className="pointer-events-none absolute left-3 flex items-center">
        <Languages className="h-4 w-4 text-[#4a5568]" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Locale)}
        className="h-10 w-full appearance-none rounded-sm border border-gray-200 bg-white pl-10 pr-10 text-sm font-medium text-[#1a365d] transition-all hover:border-[#0056b3] focus:border-[#0056b3] focus:outline-none focus:ring-1 focus:ring-[#0056b3]"
      >
        <option value="en">{localeLabels.en}</option>
        <option value="fr">{localeLabels.fr}</option>
      </select>
      <div className="pointer-events-none absolute right-3 flex items-center">
        <ChevronDown className="h-4 w-4 text-[#4a5568]" />
      </div>
    </div>
  );
}
