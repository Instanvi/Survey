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
import { surveyInputUnderlineClass, surveyTextareaUnderlineClass } from "@/lib/survey-field-skin";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Props = {
  locale: Locale;
  onSubmitted: (data: SurveyFormValues) => void | Promise<void>;
  className?: string;
};

export function SurveyForm({ locale, onSubmitted, className }: Props) {
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
        e instanceof Error ? e.message : copy.saveFailed[locale],
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn("space-y-12", className)}
        onSubmit={form.handleSubmit(handleValidSubmit)}
        noValidate
      >
        <SurveyFields locale={locale} />
        <div
          className="flex flex-col items-stretch gap-3 sm:items-end"
          aria-live="polite"
        >
          {submissionError ? (
            <p className="max-w-md text-right text-sm text-destructive sm:self-end">
              {submissionError}
            </p>
          ) : null}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="min-w-[200px] self-end"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  className="mr-2 size-4 shrink-0 animate-spin"
                  aria-hidden
                />
                {copy.sending[locale]}
              </>
            ) : (
              copy.submit[locale]
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

function SurveyFields({ locale }: { locale: Locale }) {
  const { control } = useFormContext<SurveyFormValues>();
  const t = (key: keyof typeof copy) => copy[key][locale];

  return (
    <div className="flex flex-col gap-12">
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
        <p className="text-sm leading-relaxed text-foreground">
          {copy.matrixIntro[locale]}
        </p>

        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold leading-snug text-primary-foreground shadow-sm sm:rounded-md sm:px-5 sm:text-base">
              {copy.subsectionEnv[locale]}
            </h3>
            <QuestionItem id="q8" title={t("q8")}>
              <MatrixField fieldName="q8" rows={q8Rows} locale={locale} />
            </QuestionItem>
          </div>

          <div className="space-y-4 pt-10">
            <h3 className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold leading-snug text-primary-foreground shadow-sm sm:rounded-md sm:px-5 sm:text-base">
              {copy.subsectionSocial[locale]}
            </h3>
            <QuestionItem id="q9" title={t("q9")}>
              <MatrixField fieldName="q9" rows={q9Rows} locale={locale} />
            </QuestionItem>
          </div>

          <div className="space-y-4 pt-10">
            <h3 className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold leading-snug text-primary-foreground shadow-sm sm:rounded-md sm:px-5 sm:text-base">
              {copy.subsectionGov[locale]}
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
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                rows={5}
                aria-invalid={fieldState.error ? true : undefined}
                className={surveyTextareaUnderlineClass(!!fieldState.error)}
                placeholder="…"
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
          <Label htmlFor="q14_other">{copy.otherSpecify[locale]}</Label>
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
                    {copy.otherSpecify[locale]}
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
      className="scroll-mt-24 space-y-8 rounded-none border-0 bg-[#ffffff] py-8 sm:py-10"
    >
      <header className="rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-sm sm:rounded-md sm:px-5 sm:py-3.5">
        <p className="text-sm font-semibold tracking-tight sm:text-base">
          {meta.short[locale]}
        </p>
        <h2 className="mt-1 text-xs font-medium leading-snug opacity-95 sm:text-sm">
          {meta.full[locale]}
        </h2>
      </header>
      <div className="space-y-8">{children}</div>
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
    <div id={id} className="space-y-3 scroll-mt-24">
      <h3
        className={cn(
          "font-semibold leading-snug text-foreground",
          emphasized
            ? "text-base sm:text-lg"
            : "text-sm sm:text-base",
        )}
      >
        {title}
      </h3>
      {children}
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
                <div
                  key={opt.id}
                  className="flex items-start gap-2.5 py-1"
                >
                  <RadioGroupItem
                    value={opt.id}
                    id={inputId}
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
          </RadioGroup>
          {err ? (
            <p className="text-sm text-destructive">{copy.required[locale]}</p>
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
                  <div
                    key={opt.id}
                    className="flex items-start gap-2.5 py-1"
                  >
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
              <p className="text-sm text-destructive">{copy.required[locale]}</p>
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
  const { control } = useFormContext<SurveyFormValues>();
  const { errors } = useFormState({
    control,
    name: fieldName,
    exact: true,
  });
  const rowErrors = errors[fieldName] as
    | Record<string, { message?: string } | undefined>
    | undefined;
  const labels = likertScaleLabels[locale];

  return (
    <div className="overflow-x-auto">
      {rows.map((row, index) => (
        <div
          key={row.id}
          className={cn(
            "min-w-[min(100%,520px)] border-b border-neutral-200 pb-6",
            index > 0 && "mt-1 pt-6",
          )}
        >
          <p className="mb-2 text-sm font-semibold leading-relaxed text-foreground">
            {row.labels[locale]}
          </p>
          <MatrixRowRadios
            fieldName={fieldName}
            rowId={row.id}
            labels={labels}
          />
          {rowErrors?.[row.id] ? (
            <p className="mt-1 text-sm text-destructive">
              {copy.required[locale]}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function MatrixRowRadios({
  fieldName,
  rowId,
  labels,
}: {
  fieldName: "q8" | "q9" | "q10";
  rowId: string;
  labels: string[];
}) {
  const { control } = useFormContext<SurveyFormValues>();

  return (
    <Controller
      name={`${fieldName}.${rowId}` as Path<SurveyFormValues>}
      control={control}
      render={({ field }) => (
        <RadioGroup
          value={String(field.value ?? "")}
          onValueChange={field.onChange}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6"
        >
          {([1, 2, 3, 4, 5] as const).map((n) => {
            const v = String(n);
            const inputId = `${fieldName}-${rowId}-${v}`;
            return (
              <div key={v} className="flex items-center gap-2">
                <RadioGroupItem value={v} id={inputId} className="shrink-0" />
                <Label
                  htmlFor={inputId}
                  className="cursor-pointer text-xs font-normal leading-tight text-foreground sm:text-sm"
                >
                  <span className="sr-only">{v}. </span>
                  {labels[n - 1]}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      )}
    />
  );
}
