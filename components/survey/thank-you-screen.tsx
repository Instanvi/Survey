"use client";

import { copy } from "@/lib/questionnaire";
import type { Locale } from "@/lib/locale";
import { LocaleSwitcher } from "./locale-switcher";

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function ThankYouScreen({ locale, onLocaleChange }: Props) {
  return (
    <section className="mx-auto flex w-full max-w-lg flex-col items-center space-y-6 text-center">
      <div
        className="text-5xl leading-none sm:text-6xl"
        aria-hidden
      >
        🎉
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          {copy.thanksTitle[locale]}
        </h1>
      </div>

      <p className="max-w-md text-base leading-relaxed text-foreground">
        {copy.thanksBody[locale]}
      </p>
    </section>
  );
}
