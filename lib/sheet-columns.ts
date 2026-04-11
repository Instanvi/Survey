import { q10Rows, q8Rows, q9Rows } from "./questionnaire";
import type { SurveyFormValues } from "./survey-schema";

const BASE_HEADERS = [
  "Submitted at (ISO)",
  "Locale",
  "Full name",
  "Email",
  "Phone",
  "Total score (0–100)",
  "Score breakdown (JSON)",
] as const;

function answerColumnHeaders(): string[] {
  const h: string[] = [];
  for (let n = 1; n <= 7; n++) {
    h.push(`Q${n}`);
  }
  for (const r of q8Rows) {
    h.push(`Q8_${r.id}`);
  }
  for (const r of q9Rows) {
    h.push(`Q9_${r.id}`);
  }
  for (const r of q10Rows) {
    h.push(`Q10_${r.id}`);
  }
  h.push(
    "Q11",
    "Q12 (values; separated)",
    "Q13",
    "Q14 (values; separated)",
    "Q14_other",
    "Q15",
    "Q16",
    "Q17",
  );
  return h;
}

/** Full row-1 labels for Google Sheets (keep Apps Script in sync). */
export function getSheetHeaders(): string[] {
  return [...BASE_HEADERS, ...answerColumnHeaders()];
}

type SubmitPayload = {
  submittedAt?: string;
  locale?: string;
  totalScore?: number | null;
  breakdown?: unknown;
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

/** One sheet row: meta + breakdown JSON + one cell per answer field. */
export function buildSheetRow(payload: SubmitPayload): string[] {
  const p = payload.participant ?? {};
  const answers = safeAnswers(payload.answers);
  const breakdownJson = JSON.stringify(payload.breakdown ?? {});

  const row: string[] = [
    String(payload.submittedAt ?? ""),
    String(payload.locale ?? ""),
    String(p.fullName ?? ""),
    String(p.email ?? ""),
    String(p.phone ?? ""),
    payload.totalScore == null ? "" : String(payload.totalScore),
    breakdownJson,
  ];

  row.push(
    String(answers.q1 ?? ""),
    String(answers.q2 ?? ""),
    String(answers.q3 ?? ""),
    String(answers.q4 ?? ""),
    String(answers.q5 ?? ""),
    String(answers.q6 ?? ""),
    String(answers.q7 ?? ""),
  );

  const q8 = answers.q8 ?? {};
  for (const r of q8Rows) {
    row.push(String(q8[r.id] ?? ""));
  }
  const q9 = answers.q9 ?? {};
  for (const r of q9Rows) {
    row.push(String(q9[r.id] ?? ""));
  }
  const q10 = answers.q10 ?? {};
  for (const r of q10Rows) {
    row.push(String(q10[r.id] ?? ""));
  }

  row.push(
    String(answers.q11 ?? ""),
    Array.isArray(answers.q12) ? answers.q12.join("; ") : "",
    String(answers.q13 ?? ""),
    Array.isArray(answers.q14) ? answers.q14.join("; ") : "",
    String(answers.q14_other ?? ""),
    String(answers.q15 ?? ""),
    String(answers.q16 ?? ""),
    String(answers.q17 ?? ""),
  );

  return row;
}
