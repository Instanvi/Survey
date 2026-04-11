"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { surveyInputUnderlineClass } from "@/lib/survey-field-skin";
import {
  consentInfoPages,
  consentUi,
  type ParticipantContact,
} from "@/lib/consent-pages";
import type { Locale } from "@/lib/locale";
import { LocaleSwitcher } from "./locale-switcher";

export type { ParticipantContact } from "@/lib/consent-pages";

type Props = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onComplete: (participant: ParticipantContact) => void;
};

const emailOk = (s: string) => {
  const t = s.trim();
  if (!t) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
};

/** One field: value with @ → email; otherwise → phone. */
function splitEmailOrPhone(raw: string): { email: string; phone: string } {
  const t = raw.trim();
  if (!t) return { email: "", phone: "" };
  if (t.includes("@")) return { email: t, phone: "" };
  return { email: "", phone: t };
}

type Phase = "consent" | "contact";

export function ConsentScreen({
  locale,
  onLocaleChange,
  onComplete,
}: Props) {
  const t = useCallback(
    (rec: Record<Locale, string>) => rec[locale],
    [locale],
  );

  const [phase, setPhase] = useState<Phase>("consent");

  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    contact?: string;
    agree?: string;
  }>({});

  const goToContact = () => {
    setFieldErrors({});
    setPhase("contact");
  };

  const goBackToConsent = () => {
    setFieldErrors({});
    setPhase("consent");
  };

  const tryFinish = () => {
    const err: typeof fieldErrors = {};
    const name = fullName.trim();
    const { email: em, phone: ph } = splitEmailOrPhone(emailOrPhone);

    if (!name) err.name = t(consentUi.nameRequired);
    if (!em && !ph) err.contact = t(consentUi.emailOrPhoneRequired);
    else if (em && !emailOk(em)) err.contact = t(consentUi.invalidEmail);
    if (!agreed) err.agree = t(consentUi.agreeRequired);

    if (Object.keys(err).length > 0) {
      setFieldErrors(err);
      return;
    }

    onComplete({ fullName: name, email: em, phone: ph });
  };

  return (
    <section className="space-y-8 bg-[#ffffff]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {phase === "consent"
            ? t(consentUi.documentTitle)
            : t(consentUi.participantHeading)}
        </h1>
        <LocaleSwitcher value={locale} onChange={onLocaleChange} />
      </div>

      {phase === "consent" ? (
        <>
          <article className="space-y-10 bg-[#ffffff] py-6">
            {consentInfoPages.map((page, index) => (
              <div
                key={index}
                className={
                  index > 0 ? "space-y-4 pt-8" : "space-y-4"
                }
              >
                <h2 className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm sm:rounded-md sm:px-5 sm:text-base">
                  {t(page.heading)}
                </h2>
                <div className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                  {t(page.body)}
                </div>
              </div>
            ))}
          </article>

          <div className="bg-[#ffffff] pt-2">
            <Button type="button" onClick={goToContact} className="w-full sm:w-auto">
              {t(consentUi.continueToDetails)}
            </Button>
          </div>
        </>
      ) : (
        <>
          <article className="space-y-6 bg-[#ffffff] py-6">
            <p className="text-sm leading-relaxed text-foreground">
              {t(consentUi.participantIntro)}
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="participant-name" className="font-medium">
                  {t(consentUi.fullName)}
                </Label>
                <Input
                  id="participant-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  aria-invalid={fieldErrors.name ? true : undefined}
                  className={surveyInputUnderlineClass(!!fieldErrors.name)}
                />
                {fieldErrors.name ? (
                  <p className="text-sm text-destructive">{fieldErrors.name}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="participant-email-or-phone" className="font-medium">
                  {t(consentUi.emailOrPhone)}
                </Label>
                <Input
                  id="participant-email-or-phone"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  aria-invalid={fieldErrors.contact ? true : undefined}
                  className={surveyInputUnderlineClass(!!fieldErrors.contact)}
                />
                <p className="text-xs leading-relaxed text-foreground/70">
                  {t(consentUi.emailOrPhoneHint)}
                </p>
                {fieldErrors.contact ? (
                  <p className="text-sm text-destructive">{fieldErrors.contact}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2 pt-6">
              <div className="flex items-start gap-3 py-1">
                <Checkbox
                  id="consent-agree"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(Boolean(v))}
                  className="mt-1"
                />
                <Label
                  htmlFor="consent-agree"
                  className="cursor-pointer text-sm font-normal leading-relaxed text-foreground"
                >
                  {t(consentUi.consentCheckbox)}
                </Label>
              </div>
              {fieldErrors.agree ? (
                <p className="text-sm text-destructive">{fieldErrors.agree}</p>
              ) : null}
            </div>
          </article>

          <div className="flex flex-col gap-3 bg-[#ffffff] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goBackToConsent}
              className="w-full sm:w-auto"
            >
              {t(consentUi.backToInformation)}
            </Button>
            <Button type="button" onClick={tryFinish} className="w-full sm:w-auto">
              {t(consentUi.startSurvey)}
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
