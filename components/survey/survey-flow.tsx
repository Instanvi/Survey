"use client";

import { useCallback, useState } from "react";

import type { Locale } from "@/lib/locale";
import { computeScore, type ScoreBreakdown } from "@/lib/score";
import type { SurveyFormValues } from "@/lib/survey-schema";
import { copy } from "@/lib/questionnaire";
import { ConsentScreen } from "./consent-screen";
import { SurveyForm } from "./survey-form";
import { ThankYouScreen } from "./thank-you-screen";
import { cn } from "@/lib/utils";
import { SurveyHeader } from "./survey-header";
import { LocaleSwitcher } from "./locale-switcher";



type Step = "consent" | "survey" | "thanks";

export function SurveyFlow() {
  const [locale, setLocale] = useState<Locale>("en");
  const [step, setStep] = useState<Step>("consent");

  const t = useCallback(
    (rec: Record<string, string>) => rec[locale] || "",
    [locale],
  );


  const submitToSheet = useCallback(
    async (
      data: SurveyFormValues,
      score: ScoreBreakdown,
    ) => {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          locale,
          totalScore: score.total,
          breakdown: score,
          answers: data,
          participant: {
            fullName: "",
            email: "",
            phone: "",
          },
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        skipped?: boolean;
        message?: string;
      };
      if (!res.ok) {
        throw new Error(
          typeof json.error === "string"
            ? json.error
            : `Save failed (${res.status})`,
        );
      }
      if (json.ok === false) {
        throw new Error(
          typeof json.error === "string" ? json.error : "Save failed",
        );
      }
    },
    [locale],
  );

  const onSurveySubmit = useCallback(
    async (data: SurveyFormValues) => {
      const score = computeScore(data);
      await submitToSheet(data, score);
      setStep("thanks");
    },
    [submitToSheet],
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Universal Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-[#1a365d]">
              {t(copy.stickyHeaderTitle)}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0056b3]">
              {t(copy.surveyBrandTagline)}
            </p>
          </div>
          <LocaleSwitcher value={locale} onChange={setLocale} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {step === "consent" ? (
          <div className="py-8 sm:py-12">
            <ConsentScreen
              locale={locale}
              onLocaleChange={setLocale}
              onComplete={() => setStep("survey")}
            />
          </div>
        ) : null}

        {step === "survey" ? (
          <div className="space-y-8 py-8 sm:py-12">
            <SurveyHeader locale={locale} onLocaleChange={setLocale} />
            <SurveyForm
              locale={locale}
              onSubmitted={onSurveySubmit}
              onBack={() => setStep("consent")}
            />
          </div>
        ) : null}

        {step === "thanks" ? (
          <div className="px-4 py-20 text-center sm:px-6">
            <ThankYouScreen locale={locale} onLocaleChange={setLocale} />
          </div>
        ) : null}
      </main>
    </div>
  );



}
