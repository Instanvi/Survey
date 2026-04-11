"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { copy } from "@/lib/questionnaire";
import type { Locale } from "@/lib/locale";
import type { ScoreBreakdown } from "@/lib/score";
import { LocaleSwitcher } from "./locale-switcher";

const breakdownLabels: Record<
  keyof Omit<ScoreBreakdown, "total">,
  Record<Locale, string>
> = {
  sectionB: {
    en: "Section B — Awareness & ESG understanding (max 10)",
    fr: "Section B — Sensibilisation et compréhension ESG (max 10)",
  },
  sectionC_env: {
    en: "Section C — Environmental practices (max 30)",
    fr: "Section C — Pratiques environnementales (max 30)",
  },
  sectionC_social: {
    en: "Section C — Social practices (max 25)",
    fr: "Section C — Pratiques sociales (max 25)",
  },
  sectionC_gov: {
    en: "Section C — Governance practices (max 20)",
    fr: "Section C — Pratiques de gouvernance (max 20)",
  },
  sectionD: {
    en: "Section D — Financial impact & value (max 10)",
    fr: "Section D — Impact financier et valeur (max 10)",
  },
  sectionF: {
    en: "Section F — Readiness & capability (max 5)",
    fr: "Section F — Préparation et capacités (max 5)",
  },
};

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  breakdown: ScoreBreakdown;
  sheetOk: boolean | null;
  sheetSkipped: boolean;
  sheetMessage?: string;
  onFinish: () => void;
};

export function ResultsScreen({
  locale,
  onLocaleChange,
  breakdown,
  sheetOk,
  sheetSkipped,
  sheetMessage,
  onFinish,
}: Props) {
  const pct = Math.min(100, Math.max(0, breakdown.total));

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col items-center space-y-8 text-center">
      <div
        className="text-5xl leading-none sm:text-6xl"
        aria-hidden
      >
        📊
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          {copy.resultsTitle[locale]}
        </h1>
        <LocaleSwitcher value={locale} onChange={onLocaleChange} />
      </div>

      <div className="space-y-1">
        <p className="text-sm text-foreground">{copy.totalScore[locale]}</p>
        <p className="text-4xl font-bold tabular-nums text-foreground sm:text-5xl">
          {breakdown.total}
          <span className="text-2xl font-semibold text-foreground/80 sm:text-3xl">
            {" "}
            / 100
          </span>
        </p>
      </div>

      <div className="w-full max-w-md space-y-2">
        <Progress value={pct} className="h-3" />
        <p className="text-xs text-foreground">{copy.outOf100[locale]}</p>
      </div>

      <div className="w-full">
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          {copy.breakdown[locale]}
        </h2>
        <ul className="mx-auto max-w-md space-y-2 text-sm">
          {(Object.keys(breakdownLabels) as (keyof typeof breakdownLabels)[]).map(
            (key) => (
              <li
                key={key}
                className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:text-left"
              >
                <span className="text-sm text-foreground">
                  {breakdownLabels[key][locale]}
                </span>
                <span className="font-mono text-sm font-semibold tabular-nums sm:text-right">
                  {round2((breakdown as Record<string, number>)[key])}
                </span>
              </li>
            ),
          )}
        </ul>
      </div>

      {sheetSkipped ? (
        <p className="max-w-md rounded-md bg-primary/5 px-3 py-2 text-sm text-foreground/90">
          {sheetMessage ??
            (locale === "fr"
              ? "L’enregistrement Google Sheets n’est pas configuré (variable d’environnement). Votre score s’affiche ci-dessus."
              : "Google Sheets is not configured (environment variable). Your score is shown above.")}
        </p>
      ) : null}
      {!sheetSkipped && sheetOk === false ? (
        <p className="max-w-md rounded-md bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {sheetMessage ??
            (locale === "fr"
              ? "Les réponses n’ont pas pu être enregistrées dans la feuille. Votre score est affiché ci-dessus."
              : "Responses could not be saved to the sheet. Your score is shown above.")}
        </p>
      ) : null}
      {!sheetSkipped && sheetOk === true ? (
        <p className="max-w-md text-sm text-foreground">
          {locale === "fr"
            ? "Vos réponses ont été transmises vers Google Sheets."
            : "Your responses have been sent to Google Sheets."}
        </p>
      ) : null}

      <Button type="button" size="lg" className="min-w-[200px]" onClick={onFinish}>
        {copy.finish[locale]}
      </Button>
    </section>
  );
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
