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
    <header className="w-full space-y-4 py-8 text-center sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight text-[#1a365d] sm:text-4xl">
        {copy.surveyTitle[locale]}
      </h1>
      <p className="mx-auto max-w-2xl text-base text-[#4a5568]">
        {copy.surveySubtitle[locale]}
      </p>
    </header>
  );
}
