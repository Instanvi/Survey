"use client";

import { useCallback, useState } from "react";

import type { Locale } from "@/lib/locale";
import type { ParticipantContact } from "@/lib/consent-pages";
import { computeScore, type ScoreBreakdown } from "@/lib/score";
import type { SurveyFormValues } from "@/lib/survey-schema";
import { ConsentScreen } from "./consent-screen";
import { SurveyHeader } from "./survey-header";
import { SurveyForm } from "./survey-form";
import { ThankYouScreen } from "./thank-you-screen";

type Step = "consent" | "survey" | "thanks";

export function SurveyFlow() {
  const [locale, setLocale] = useState<Locale>("en");
  const [step, setStep] = useState<Step>("consent");
  const [participant, setParticipant] = useState<ParticipantContact | null>(
    null,
  );

  const submitToSheet = useCallback(
    async (
      data: SurveyFormValues,
      score: ScoreBreakdown,
      contact: ParticipantContact | null,
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
          participant: contact ?? {
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
      await submitToSheet(data, score, participant);
      setStep("thanks");
    },
    [submitToSheet, participant],
  );

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 bg-[#ffffff] px-4 py-10 sm:px-6 sm:py-14">
      {step === "survey" ? (
        <SurveyHeader locale={locale} onLocaleChange={setLocale} />
      ) : null}

      {step === "consent" ? (
        <ConsentScreen
          locale={locale}
          onLocaleChange={setLocale}
          onComplete={(p) => {
            setParticipant(p);
            setStep("survey");
          }}
        />
      ) : null}

      {step === "survey" ? (
        <SurveyForm locale={locale} onSubmitted={onSurveySubmit} />
      ) : null}

      {step === "thanks" ? (
        <ThankYouScreen locale={locale} onLocaleChange={setLocale} />
      ) : null}
    </div>
  );
}
