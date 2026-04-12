"use client";

import { copy } from "@/lib/questionnaire";
import type { Locale } from "@/lib/locale";
import { LocaleSwitcher } from "./locale-switcher";
import { SurveyBrandMark } from "./survey-brand-mark";

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

/** Top toolbar: logo, brand, language — matches survey reference header row. */
export function SurveyBrandBar({ locale, onLocaleChange }: Props) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4 sm:items-center sm:pb-5">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <SurveyBrandMark className="mt-1 h-9 w-8 shrink-0 sm:mt-0.5 sm:h-10 sm:w-9" />
        <div className="min-w-0">
          <p className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {copy.surveyBrandTitle[locale]}
          </p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-sm">
            {copy.surveyBrandTagline[locale]}
          </p>
        </div>
      </div>
      <div className="shrink-0 self-center sm:self-start sm:pt-0.5">
        <LocaleSwitcher value={locale} onChange={onLocaleChange} />
      </div>
    </div>
  );
}
