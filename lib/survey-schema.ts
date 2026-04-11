import { z } from "zod";
import { agreesWithQ11 } from "./score";
import {
  q8Rows,
  q9Rows,
  q10Rows,
} from "./questionnaire";

const LIKERT = ["1", "2", "3", "4", "5"] as const;

function matrixSchema(rows: { id: string }[]) {
  return z.record(z.string(), z.string()).superRefine((val, ctx) => {
    for (const r of rows) {
      const v = val[r.id];
      if (!v || !(LIKERT as readonly string[]).includes(v)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "required",
          path: [r.id],
        });
      }
    }
  });
}

export const surveySchema = z
  .object({
    q1: z.string().min(1),
    q2: z.string().min(1),
    q3: z.string().min(1),
    q4: z.string().min(1),
    q5: z.string().min(1),
    q6: z.string().min(1),
    q7: z.string().min(1),
    q8: matrixSchema(q8Rows),
    q9: matrixSchema(q9Rows),
    q10: matrixSchema(q10Rows),
    q11: z.string().min(1),
    q12: z.array(z.string()),
    q13: z.string(),
    q14: z.array(z.string()),
    q14_other: z.string(),
    q15: z.string().min(1),
    q16: z.string().min(1),
    q17: z.string(),
  })
  .superRefine((data, ctx) => {
    if (agreesWithQ11(data.q11)) {
      if (!data.q13 || data.q13.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "required_if_agree",
          path: ["q13"],
        });
      }
    }
    if (data.q14.includes("q14_other")) {
      const t = (data.q14_other ?? "").trim();
      if (!t) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "other_specify",
          path: ["q14_other"],
        });
      }
    }
  });

export type SurveyFormValues = z.infer<typeof surveySchema>;

export function defaultSurveyValues(): SurveyFormValues {
  const emptyMatrix = (rows: { id: string }[]) =>
    Object.fromEntries(rows.map((r) => [r.id, ""])) as Record<string, string>;

  return {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: emptyMatrix(q8Rows),
    q9: emptyMatrix(q9Rows),
    q10: emptyMatrix(q10Rows),
    q11: "",
    q12: [],
    q13: "",
    q14: [],
    q14_other: "",
    q15: "",
    q16: "",
    q17: "",
  };
}
