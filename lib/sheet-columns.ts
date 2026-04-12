/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  copy,
  likertScaleLabels,
  q10Rows,
  q11Options,
  q12Options,
  q13Options,
  q14Options,
  q15Options,
  q16Options,
  q1Options,
  q2Options,
  q3Options,
  q4Options,
  q5Options,
  q6Options,
  q7Options,
  q8Rows,
  q9Rows,
} from "./questionnaire";
import type { SurveyFormValues } from "./survey-schema";
import type { Locale } from "./locale";

const BASE_HEADERS = [
  "Submitted at (ISO)",
  "Locale",
  "Full name",
  "Email",
  "Phone",
  "Total score (0–100)",
] as const;

function getOptionLabel(
  options: { id: string; labels: Record<Locale, string> }[],
  id: string | string[],
  locale: Locale,
): string {
  if (Array.isArray(id)) {
    return id.map((val) => getOptionLabel(options, val, locale)).join("; ");
  }
  const opt = options.find((o) => o.id === id);
  return opt ? opt.labels[locale] : String(id);
}

function getLikertLabel(value: any, locale: Locale): string {
  const num = Number(value);
  if (isNaN(num) || num < 1 || num > 5) return String(value ?? "");
  const labels = likertScaleLabels[locale];
  return `${num}. ${labels[num - 1]}`;
}

function answerColumnHeaders(): string[] {
  const h: string[] = [];
  const lang: Locale = "en"; // Use English for headers

  // Q1 - Q7
  for (let n = 1; n <= 7; n++) {
    const key = `q${n}` as keyof typeof copy;
    h.push(copy[key][lang]);
  }

  // Q8-Q10 Matrix
  for (const r of q8Rows) {
    h.push(`${copy.q8[lang]} [${r.labels[lang]}]`);
  }
  for (const r of q9Rows) {
    h.push(`${copy.q9[lang]} [${r.labels[lang]}]`);
  }
  for (const r of q10Rows) {
    h.push(`${copy.q10[lang]} [${r.labels[lang]}]`);
  }

  // Q11 - Q17
  h.push(
    copy.q11[lang],
    copy.q12[lang],
    copy.q13[lang],
    copy.q14[lang],
    copy.otherSpecify[lang] + " (Q14)",
    copy.q15[lang],
    copy.q16[lang],
    copy.q17[lang],
  );

  return h;
}

/** Full row-1 labels for Google Sheets. */
export function getSheetHeaders(): string[] {
  return [...BASE_HEADERS, ...answerColumnHeaders()];
}

type SubmitPayload = {
  submittedAt?: string;
  locale?: string;
  totalScore?: number | null;
  breakdown?: Record<string, string | number | undefined>;
  answers?: Partial<SurveyFormValues> | null;
  participant?: {
    fullName?: string;
    email?: string;
    phone?: string;
  } | null;
};

function safeAnswers(a: SubmitPayload["answers"]): Partial<SurveyFormValues> {
  return a && typeof a === "object" ? a : {};
}

/** One sheet row: meta + one cell per answer field with human-readable labels. */
export function buildSheetRow(payload: SubmitPayload): string[] {
  const p = payload.participant ?? {};
  const answers = safeAnswers(payload.answers);
  const locale = (payload.locale as Locale) || "en";

  const row: string[] = [
    String(payload.submittedAt ?? ""),
    String(payload.locale ?? ""),
    String(p.fullName ?? ""),
    String(p.email ?? ""),
    String(p.phone ?? ""),
    payload.totalScore == null ? "" : String(payload.totalScore),
  ];

  // Q1 - Q7
  row.push(
    getOptionLabel(q1Options, answers.q1 ?? "", locale),
    getOptionLabel(q2Options, answers.q2 ?? "", locale),
    getOptionLabel(q3Options, answers.q3 ?? "", locale),
    getOptionLabel(q4Options, answers.q4 ?? "", locale),
    getOptionLabel(q5Options, answers.q5 ?? "", locale),
    getOptionLabel(q6Options, answers.q6 ?? "", locale),
    getOptionLabel(q7Options, answers.q7 ?? "", locale),
  );

  // Q8-Q10 Matrix
  const q8 = answers.q8 ?? {};
  for (const r of q8Rows) {
    row.push(getLikertLabel(q8[r.id], locale));
  }
  const q9 = answers.q9 ?? {};
  for (const r of q9Rows) {
    row.push(getLikertLabel(q9[r.id], locale));
  }
  const q10 = answers.q10 ?? {};
  for (const r of q10Rows) {
    row.push(getLikertLabel(q10[r.id], locale));
  }

  // Q11 - Q17
  row.push(
    getOptionLabel(q11Options, answers.q11 ?? "", locale),
    getOptionLabel(q12Options, answers.q12 ?? [], locale),
    getOptionLabel(q13Options, answers.q13 ?? "", locale),
    getOptionLabel(q14Options, answers.q14 ?? [], locale),
    String(answers.q14_other ?? ""),
    getOptionLabel(q15Options, answers.q15 ?? "", locale),
    getOptionLabel(q16Options, answers.q16 ?? "", locale),
    String(answers.q17 ?? ""),
  );

  return row;
}
