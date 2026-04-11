"use client";

import { Button } from "@/components/ui/button";
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
    <div
      className={cn(
        "inline-flex rounded-lg border border-neutral-300 bg-white p-0.5",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as const).map((loc) => (
        <Button
          key={loc}
          type="button"
          variant={value === loc ? "default" : "ghost"}
          size="sm"
          className="rounded-md px-3"
          onClick={() => onChange(loc)}
        >
          {localeLabels[loc]}
        </Button>
      ))}
    </div>
  );
}
