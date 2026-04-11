"use client";

import { copy } from "@/lib/questionnaire";
import type { Locale } from "@/lib/locale";
import { LocaleSwitcher } from "./locale-switcher";

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function SurveyHeader({ locale, onLocaleChange }: Props) {
  return (
    <header className="w-full pb-8 sm:pb-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1 border-s-2 border-primary ps-4 sm:ps-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {copy.surveyEyebrow[locale]}
          </p>
          <h1 className="mt-2.5 text-[15px] font-medium leading-snug text-foreground sm:text-base sm:leading-relaxed">
            {copy.surveyTitle[locale]}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {copy.surveySubtitle[locale]}
          </p>
        </div>
        <div className="shrink-0 self-start sm:pt-0.5">
          <LocaleSwitcher value={locale} onChange={onLocaleChange} />
        </div>
      </div>
    </header>
  );
}
