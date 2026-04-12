"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useFormState,
  useWatch,
  type Path,
  type FieldErrors,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/locale";
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
  sectionTitles,
} from "@/lib/questionnaire";
import { agreesWithQ11 } from "@/lib/score";
import {
  defaultSurveyValues,
  type SurveyFormValues,
  surveySchema,
} from "@/lib/survey-schema";
import {
  surveyInputUnderlineClass,
  surveyTextareaUnderlineClass,
} from "@/lib/survey-field-skin";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export const SECTION_KEYS: SectionKey[] = ["A", "B", "C", "D", "E", "F", "G"];

interface Props {
  locale: Locale;
  onSubmitted: (data: SurveyFormValues) => void | Promise<void>;
  onBack?: () => void;
  className?: string;
}

export function SurveyForm({ locale, onSubmitted, onBack, className }: Props) {
  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: defaultSurveyValues(),
    mode: "onSubmit",
  });
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const isSubmitting = form.formState.isSubmitting;

  const handleValidSubmit = async (data: SurveyFormValues) => {
    setSubmissionError(null);
    try {
      await Promise.resolve(onSubmitted(data));
    } catch (e) {
      setSubmissionError(
        e instanceof Error ? e.message : copy.saveFailed[locale as Locale],
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn("space-y-16", className)}
        onSubmit={form.handleSubmit(handleValidSubmit)}
        noValidate
      >
        <SurveyFields locale={locale as Locale} />

        <div className="flex flex-col-reverse gap-4 pt-12 sm:flex-row sm:justify-end sm:gap-6">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="h-14 min-w-[160px] rounded-sm border-gray-200 text-lg font-medium text-gray-600 hover:bg-gray-50"
            >
              {copy.back[locale as Locale]}
            </Button>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-14 min-w-[240px] rounded-sm bg-[#0056b3] text-lg font-bold text-white hover:bg-blue-700"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                {copy.sending[locale as Locale]}
              </>
            ) : (
              copy.submit[locale as Locale]
            )}
          </Button>

          {submissionError ? (
            <p className="text-right text-sm text-destructive">
              {submissionError}
            </p>
          ) : null}
        </div>
      </form>
    </FormProvider>
  );
}

function SurveyFields({ locale }: { locale: Locale }) {
  const { control } = useFormContext<SurveyFormValues>();
  const t = (key: keyof typeof copy) => {
    const translation = copy[key];
    if (!translation) return `[${key}]`;
    return (translation as Record<Locale, string>)[locale];
  };

  return (
    <div className="flex flex-col gap-16">
      <SurveySection sectionKey="A" locale={locale}>
        <QuestionItem id="q1" title={t("q1")} emphasized>
          <SingleChoice name="q1" options={q1Options} locale={locale} />
        </QuestionItem>
        <QuestionItem id="q2" title={t("q2")}>
          <SingleChoice name="q2" options={q2Options} locale={locale} />
        </QuestionItem>
        <QuestionItem id="q3" title={t("q3")}>
          <SingleChoice name="q3" options={q3Options} locale={locale} />
        </QuestionItem>
        <QuestionItem id="q4" title={t("q4")}>
          <SingleChoice name="q4" options={q4Options} locale={locale} />
        </QuestionItem>
      </SurveySection>

      <SurveySection sectionKey="B" locale={locale}>
        <QuestionItem id="q5" title={t("q5")}>
          <SingleChoice name="q5" options={q5Options} locale={locale} />
        </QuestionItem>
        <QuestionItem id="q6" title={t("q6")}>
          <SingleChoice name="q6" options={q6Options} locale={locale} />
        </QuestionItem>
        <QuestionItem id="q7" title={t("q7")}>
          <SingleChoice name="q7" options={q7Options} locale={locale} />
        </QuestionItem>
      </SurveySection>

      <SurveySection sectionKey="C" locale={locale}>
        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#1a365d] sm:text-xl">
              {t("subsectionEnv")}
            </h3>
            <QuestionItem id="q8" title={t("q8")}>
              <MatrixField fieldName="q8" rows={q8Rows} locale={locale} />
            </QuestionItem>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#1a365d] sm:text-xl">
              {t("subsectionSocial")}
            </h3>
            <QuestionItem id="q9" title={t("q9")}>
              <MatrixField fieldName="q9" rows={q9Rows} locale={locale} />
            </QuestionItem>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#1a365d] sm:text-xl">
              {t("subsectionGov")}
            </h3>
            <QuestionItem id="q10" title={t("q10")}>
              <MatrixField fieldName="q10" rows={q10Rows} locale={locale} />
            </QuestionItem>
          </div>
        </div>
      </SurveySection>

      <SurveySection sectionKey="D" locale={locale}>
        <SectionDFields locale={locale} t={t} />
      </SurveySection>

      <SurveySection sectionKey="E" locale={locale}>
        <SectionEFields locale={locale} t={t} />
      </SurveySection>

      <SurveySection sectionKey="F" locale={locale}>
        <QuestionItem id="q15" title={t("q15")}>
          <SingleChoice name="q15" options={q15Options} locale={locale} />
        </QuestionItem>
        <QuestionItem id="q16" title={t("q16")}>
          <SingleChoice name="q16" options={q16Options} locale={locale} />
        </QuestionItem>
      </SurveySection>

      <SurveySection sectionKey="G" locale={locale}>
        <QuestionItem id="q17" title={t("q17")}>
          <Controller
            name="q17"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                rows={6}
                className="rounded-sm border-gray-200 focus:border-[#0056b3] focus:ring-[#0056b3]"
                placeholder="..."
              />
            )}
          />
        </QuestionItem>
      </SurveySection>
    </div>
  );
}

function SectionDFields({
  locale,
  t,
}: {
  locale: Locale;
  t: (key: keyof typeof copy) => string;
}) {
  const { control, setValue } = useFormContext<SurveyFormValues>();
  const q11 = useWatch({ control, name: "q11" });
  const showQ12Q13 = agreesWithQ11(q11);

  useEffect(() => {
    if (!showQ12Q13) {
      setValue("q12", []);
      setValue("q13", "");
    }
  }, [showQ12Q13, setValue]);

  return (
    <>
      <QuestionItem id="q11" title={t("q11")}>
        <SingleChoice name="q11" options={q11Options} locale={locale} />
      </QuestionItem>

      {showQ12Q13 ? (
        <>
          <QuestionItem id="q12" title={t("q12")}>
            <p className="mb-2 text-sm leading-relaxed text-foreground">
              {copy.q12Note[locale]}
            </p>
            <MultiChoice name="q12" options={q12Options} locale={locale} />
          </QuestionItem>

          <QuestionItem id="q13" title={t("q13")}>
            <SingleChoice name="q13" options={q13Options} locale={locale} />
          </QuestionItem>
        </>
      ) : null}
    </>
  );
}

function SectionEFields({
  locale,
  t,
}: {
  locale: Locale;
  t: (key: keyof typeof copy) => string;
}) {
  const { control } = useFormContext<SurveyFormValues>();
  const q14 = useWatch({ control, name: "q14", defaultValue: [] }) ?? [];

  return (
    <QuestionItem id="q14" title={t("q14")}>
      <MultiChoice name="q14" options={q14Options} locale={locale} />
      {q14.includes("q14_other") ? (
        <div className="mt-4 space-y-2">
          <Label htmlFor="q14_other">{copy.otherSpecify[locale as Locale]}</Label>
          <Controller
            name="q14_other"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="q14_other"
                  {...field}
                  aria-invalid={fieldState.error ? true : undefined}
                  className={surveyInputUnderlineClass(!!fieldState.error)}
                />
                {fieldState.error ? (
                  <p className="text-sm text-destructive">
                    {copy.otherSpecify[locale as Locale]}
                  </p>
                ) : null}
              </>
            )}
          />
        </div>
      ) : null}
    </QuestionItem>
  );
}

type SectionKey = keyof typeof sectionTitles;

function SurveySection({
  sectionKey,
  locale,
  children,
}: {
  sectionKey: SectionKey;
  locale: Locale;
  children: ReactNode;
}) {
  const meta = sectionTitles[sectionKey];
  return (
    <section
      id={`section-${sectionKey.toLowerCase()}`}
      className="scroll-mt-28 space-y-10 rounded-sm border-0 bg-white"
    >
      <header className="space-y-2">
        <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#1a365d] sm:text-2xl">
          {meta.short[locale as Locale]} — {meta.full[locale as Locale]}
        </h2>
        <div className="h-1 w-24 rounded-sm bg-[#0056b3]" />
      </header>
      <div className="space-y-12">{children}</div>
    </section>
  );
}

function QuestionItem({
  id,
  title,
  children,
  emphasized,
}: {
  id: string;
  title: string;
  children: ReactNode;
  emphasized?: boolean;
}) {
  return (
    <div id={id} className="space-y-5 scroll-mt-28">
      <h3
        className={cn(
          "font-bold leading-tight text-[#1a365d]",
          emphasized ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
        )}
      >
        {title}
      </h3>
      <div className="pl-0">{children}</div>
    </div>
  );
}

function SingleChoice({
  name,
  options,
  locale,
}: {
  name: keyof SurveyFormValues;
  options: { id: string; labels: Record<Locale, string> }[];
  locale: Locale;
}) {
  const { control, formState } = useFormContext<SurveyFormValues>();
  const err = formState.errors[name as keyof SurveyFormValues] as
    | { message?: string }
    | undefined;

  return (
    <Controller
      name={name as Path<SurveyFormValues>}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <RadioGroup
            value={String(field.value ?? "")}
            onValueChange={field.onChange}
            className="flex flex-col gap-0"
          >
            {options.map((opt) => {
              const inputId = `${String(name)}-${opt.id}`;
              return (
                <div key={opt.id} className="flex items-start gap-2.5 py-1">
                  <RadioGroupItem
                    value={opt.id}
                    id={inputId}
                    className="mt-0.5 shrink-0"
                  />
                  <Label
                    htmlFor={inputId}
                    className="cursor-pointer text-sm font-normal leading-relaxed text-foreground"
                  >
                    {opt.labels[locale as Locale]}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
          {err ? (
            <p className="text-sm text-destructive">{copy.required[locale as Locale]}</p>
          ) : null}
        </div>
      )}
    />
  );
}

function MultiChoice({
  name,
  options,
  locale,
}: {
  name: "q12" | "q14";
  options: { id: string; labels: Record<Locale, string> }[];
  locale: Locale;
}) {
  const { control, formState } = useFormContext<SurveyFormValues>();
  const err = formState.errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = new Set<string>(field.value ?? []);
        return (
          <div className="space-y-2">
            <div className="flex flex-col gap-0">
              {options.map((opt) => {
                const inputId = `${name}-${opt.id}`;
                const checked = selected.has(opt.id);
                return (
                  <div key={opt.id} className="flex items-start gap-2.5 py-1">
                    <Checkbox
                      id={inputId}
                      checked={checked}
                      onCheckedChange={(next) => {
                        const n = Boolean(next);
                        const copyArr = new Set(selected);
                        if (n) copyArr.add(opt.id);
                        else copyArr.delete(opt.id);
                        field.onChange([...copyArr]);
                      }}
                      className="mt-0.5 shrink-0"
                    />
                    <Label
                      htmlFor={inputId}
                      className="cursor-pointer text-sm font-normal leading-relaxed text-foreground"
                    >
                      {opt.labels[locale]}
                    </Label>
                  </div>
                );
              })}
            </div>
            {err ? (
              <p className="text-sm text-destructive">
                {copy.required[locale]}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
}

function MatrixField({
  fieldName,
  rows,
  locale,
}: {
  fieldName: "q8" | "q9" | "q10";
  rows: { id: string; maxPoints: number; labels: Record<Locale, string> }[];
  locale: Locale;
}) {
  const { control, formState } = useFormContext<SurveyFormValues>();
  const options = [1, 2, 3, 4, 5];
  const headings = likertScaleLabels[locale];
  const rowErrors = formState.errors[fieldName];

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-sm border border-gray-100 shadow-sm">
        <table className="w-full min-w-[700px] border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-[#f8fafc] text-[11px] font-bold uppercase tracking-wider text-[#4a5568]">
              <th className="border-b border-gray-100 px-6 py-4 text-left font-bold text-[#1a365d]">
                Practice / Statement
              </th>
              {headings.map((h, i) => (
                <th
                  key={i}
                  className="border-b border-gray-100 px-2 py-4 text-center"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={cn(
                  "transition-colors",
                  rowIndex % 2 === 1 ? "bg-[#f8fafc]" : "bg-white",
                )}
              >
                <td className="w-1/3 px-6 py-5 text-left font-medium text-[#4a5568]">
                  <div className="flex flex-col gap-1">
                    <span>{row.labels[locale as Locale]}</span>
                    {rowErrors?.[row.id] ? (
                      <span className="text-xs font-normal text-destructive">
                        {copy.required[locale as Locale]}
                      </span>
                    ) : null}
                  </div>
                </td>
                {options.map((val) => (
                  <td key={val} className="px-2 py-5 text-center">
                    <Controller
                      name={`${fieldName}.${row.id}`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex justify-center">
                          <RadioGroup
                            value={String(field.value ?? "")}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center justify-center">
                              <RadioGroupItem
                                value={String(val)}
                                id={`${fieldName}-${row.id}-${val}`}
                                className="h-5 w-5 border-neutral-300 text-[#0056b3] shadow-none data-[state=checked]:border-[#0056b3] data-[state=checked]:bg-[#0056b3]"
                              />
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
