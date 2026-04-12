"use client";

import { useCallback, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Info,
  Lock,
  Target,
  User,
  Zap,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  consentInfoPages,
  consentUi,
} from "@/lib/consent-pages";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";


type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onComplete: () => void;
};

const SECTION_ICONS = [
  Target,
  BookOpen,
  Info,
  Zap,
  Lock,
  CheckCircle,
];

export function ConsentScreen({
  locale,
  onLocaleChange,
  onComplete,
}: Props) {
  const t = useCallback(
    (rec: Record<Locale, string>) => rec[locale],
    [locale],
  );

  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState<string | null>(null);

  const tryFinish = () => {
    if (!agreed) {
      setAgreeError(t(consentUi.agreeRequired));
      return;
    }
    setAgreeError(null);
    onComplete();
  };

  return (
    <section className="mx-auto max-w-4xl space-y-12 bg-white px-4 py-12 text-left sm:px-8">
      {/* Subheader Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-[#4a5568]">
        <div className="flex items-center gap-1.5 font-medium">
          <User className="h-4 w-4 text-primary" />
          <span>{t(consentUi.researcher)}</span>
        </div>
        <span className="hidden text-gray-300 sm:inline">|</span>
        <span>{t(consentUi.institution)}</span>
      </div>


      {/* Info Sections */}
      <div className="space-y-10 border-t border-gray-100 pt-10 text-left">
        {consentInfoPages.map((page, index) => {
          const Icon = SECTION_ICONS[index] || Target;
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-[#1a365d]">
                  - {t(page.heading)}
                </h2>
              </div>
              <p className="pl-7 text-sm leading-relaxed text-[#4a5568]">
                {t(page.body)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-6 pt-6">
        <div className={cn(
          "rounded-sm border p-6 transition-all",
          agreed ? "border-[#0056b3] bg-[#eff6ff]" : "border-gray-200 bg-white"
        )}>
          <div className="flex items-start gap-4">
            <Checkbox
              id="consent-agree"
              checked={agreed}
              onCheckedChange={(v) => {
                setAgreed(Boolean(v));
                if (v) setAgreeError(null);
              }}
              className="mt-1 h-6 w-6 border-gray-300 data-[state=checked]:bg-[#0056b3]"
            />
            <Label
              htmlFor="consent-agree"
              className="cursor-pointer text-sm font-semibold leading-relaxed text-[#1a365d]"
            >
              {t(consentUi.consentCheckbox)}
            </Label>
          </div>
          {agreeError ? (
            <p className="ml-10 mt-2 text-sm text-destructive">{agreeError}</p>
          ) : null}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="button"
            onClick={tryFinish}
            size="lg"
            className="group h-14 min-w-[240px] rounded-sm bg-[#0056b3] px-8 text-base font-bold text-white hover:bg-blue-600"
          >
            {t(consentUi.startSurvey)}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

