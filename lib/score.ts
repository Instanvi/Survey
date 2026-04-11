import {
  LIKERT_MULTIPLIER,
  q8Rows,
  q9Rows,
  q10Rows,
} from "./questionnaire";

export type SurveyAnswers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: Record<string, string>;
  q9: Record<string, string>;
  q10: Record<string, string>;
  q11: string;
  q12: string[];
  q13: string;
  q14: string[];
  q14_other?: string;
  q15: string;
  q16: string;
  q17: string;
};

const q12Scores: Record<string, number> = {
  q12_costs: 1,
  q12_revenue: 1,
  q12_borrowing: 1,
  q12_brand: 0.5,
  q12_risk: 0.5,
};

function singleMap(
  value: string,
  map: Record<string, number>,
): number {
  return map[value] ?? 0;
}

const q5Scores: Record<string, number> = {
  very_familiar: 2,
  somewhat_familiar: 1,
  not_familiar: 0,
};

const q6Scores: Record<string, number> = {
  structured_esg: 5,
  mix_csr: 3,
  mainly_csr: 2,
  none_formal: 0,
  not_sure: 0,
};

const q7Scores: Record<string, number> = {
  formal_esg_report: 3,
  informal_only: 1,
  no_reporting: 0,
  not_sure: 0,
};

const q11Scores: Record<string, number> = {
  strongly_agree: 4,
  agree: 3,
  disagree: 0,
};

const q13Scores: Record<string, number> = {
  yes: 2,
  possibly: 1,
  no: 0,
  not_sure: 0,
};

const q15Scores: Record<string, number> = {
  fully: 2,
  moderate: 1,
  not_prepared: 0,
  not_sure: 0,
};

const q16Scores: Record<string, number> = {
  formal_team: 3,
  shared: 1,
  no_dedicated: 0,
  not_sure: 0,
};

function parseLikert(v: string): 1 | 2 | 3 | 4 | 5 | null {
  const n = Number(v);
  if (n >= 1 && n <= 5) return n as 1 | 2 | 3 | 4 | 5;
  return null;
}

function matrixSection(
  rows: { id: string; maxPoints: number }[],
  values: Record<string, string>,
): number {
  let sum = 0;
  for (const row of rows) {
    const raw = values[row.id];
    const likert = raw ? parseLikert(raw) : null;
    if (!likert) continue;
    sum += row.maxPoints * LIKERT_MULTIPLIER[likert];
  }
  return sum;
}

export function agreesWithQ11(q11: string): boolean {
  return q11 === "strongly_agree" || q11 === "agree";
}

export type ScoreBreakdown = {
  sectionB: number;
  sectionC_env: number;
  sectionC_social: number;
  sectionC_gov: number;
  sectionD: number;
  sectionF: number;
  total: number;
};

export function computeScore(a: SurveyAnswers): ScoreBreakdown {
  const sectionB =
    singleMap(a.q5, q5Scores) +
    singleMap(a.q6, q6Scores) +
    singleMap(a.q7, q7Scores);

  const sectionC_env = matrixSection(q8Rows, a.q8);
  const sectionC_social = matrixSection(q9Rows, a.q9);
  const sectionC_gov = matrixSection(q10Rows, a.q10);

  const q11Score = singleMap(a.q11, q11Scores);

  let q12Score = 0;
  if (agreesWithQ11(a.q11) && Array.isArray(a.q12)) {
    for (const id of a.q12) {
      const pts = q12Scores[id];
      if (pts !== undefined) q12Score += pts;
    }
  }

  let q13Score = 0;
  if (agreesWithQ11(a.q11) && a.q13) {
    q13Score = singleMap(a.q13, q13Scores);
  }

  const sectionD = Math.min(10, q11Score + q12Score + q13Score);

  const sectionF =
    singleMap(a.q15, q15Scores) + singleMap(a.q16, q16Scores);

  const total = Math.min(
    100,
    sectionB +
      sectionC_env +
      sectionC_social +
      sectionC_gov +
      sectionD +
      sectionF,
  );

  return {
    sectionB,
    sectionC_env,
    sectionC_social,
    sectionC_gov,
    sectionD,
    sectionF,
    total: Math.round(total * 100) / 100,
  };
}

