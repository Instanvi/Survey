import type { Locale } from "./locale";

export type ParticipantContact = {
  fullName: string;
  email: string;
  phone: string;
};

export type ConsentInfoPage = {
  heading: Record<Locale, string>;
  body: Record<Locale, string>;
};

/** Informational pages (before contact + agreement). */
export const consentInfoPages: ConsentInfoPage[] = [
  {
    heading: {
      en: "Study information",
      fr: "Informations sur l’étude",
    },
    body: {
      en: "The Impact of ESG Adoption on Sustainable Financial Performance in Your Organization.\n\nPrincipal investigator: Kenneth KOME Echalle\nInstitution: Robert Kennedy College — University of Cumbria\n\n1. Purpose of the study\nThis study aims to investigate how organisations in the mobile telecommunications sector can leverage ESG adoption for long-term financial performance and sustainable practices.",
      fr: "L’impact de l’adoption de l’ESG sur la performance financière durable au sein de votre organisation.\n\nChercheur principal : Kenneth KOME Echalle\nÉtablissement : Robert Kennedy College — University of Cumbria\n\n1. Objet de l’étude\nCette étude vise à examiner comment les organisations du secteur des télécommunications mobiles peuvent tirer parti de l’adoption de l’ESG pour la performance financière à long terme et des pratiques durables.",
    },
  },
  {
    heading: {
      en: "2. Procedures",
      fr: "2. Déroulement",
    },
    body: {
      en: "You will complete a questionnaire. It may ask about your organisation, your role, your experience with ESG-related topics, and your views on ESG practices. Some items use multiple-choice responses; you may also provide recommendations at the end.\n\nYou are not obliged to disclose sensitive personal data in the survey questions themselves. After this information sheet, the following screen will ask for your full name and a single contact field (email or phone number) so we can link your response to the study if needed.",
      fr: "Vous compléterez un questionnaire. Il peut porter sur votre organisation, votre rôle, votre expérience liée à l’ESG et votre opinion sur les pratiques ESG. Certaines questions sont à choix multiples ; vous pourrez aussi formuler des recommandations en fin de questionnaire.\n\nVous n’êtes pas obligé·e de divulguer des données personnelles sensibles dans les questions du questionnaire. Après cette feuille d’information, l’écran suivant demandera votre nom complet et un seul champ de contact (courriel ou numéro de téléphone) afin d’associer votre réponse à l’étude si nécessaire.",
    },
  },
  {
    heading: {
      en: "3. Risks and discomforts",
      fr: "3. Risques et gênes",
    },
    body: {
      en: "Possible risks include, for example, concern about how your employer might react if critical feedback about the organisation were identifiable. We will handle your data in line with the confidentiality section and only use contact details for study-related communication.",
      fr: "Des risques peuvent inclure, par exemple, des inquiétudes quant à la réaction de votre employeur si des commentaires critiques sur l’organisation étaient identifiables. Nous traiterons vos données conformément à la section confidentialité et n’utiliserons les coordonnées que pour les besoins de l’étude.",
    },
  },
  {
    heading: {
      en: "4. Benefits",
      fr: "4. Bénéfices",
    },
    body: {
      en: "Potential benefits include contributing to knowledge on ESG and financial performance in your sector, and reflecting on practices that may support social and financial outcomes for staff and organisations.",
      fr: "Les bénéfices potentiels incluent la contribution aux connaissances sur l’ESG et la performance financière dans votre secteur, ainsi qu’une réflexion sur des pratiques pouvant soutenir des retombées sociales et financières pour le personnel et les organisations.",
    },
  },
  {
    heading: {
      en: "5. Confidentiality & 6. Voluntary participation",
      fr: "5. Confidentialité et 6. Participation volontaire",
    },
    body: {
      en: "5. Confidentiality: Information you provide will be handled securely and used only for this research within the limits described here.\n\n6. Voluntary participation: Your participation is voluntary. You may stop at any time without penalty. By continuing to the questionnaire after providing your details, you confirm that you have read this information.",
      fr: "5. Confidentialité : les informations que vous fournirez seront traitées de manière sécurisée et utilisées uniquement pour cette recherche, dans les limites décrites ici.\n\n6. Participation volontaire : votre participation est volontaire. Vous pouvez cesser à tout moment sans pénalité. En poursuivant vers le questionnaire après avoir fourni vos coordonnées, vous confirmez avoir lu ces informations.",
    },
  },
];

export const consentUi = {
  documentTitle: {
    en: "Information & consent",
    fr: "Information et consentement",
  },
  /** After reading the full information sheet. */
  continueToDetails: {
    en: "Continue",
    fr: "Continuer",
  },
  backToInformation: {
    en: "Back to information sheet",
    fr: "Retour à la feuille d’information",
  },
  startSurvey: {
    en: "Start questionnaire",
    fr: "Commencer le questionnaire",
  },
  participantHeading: {
    en: "Your information",
    fr: "Vos informations",
  },
  participantIntro: {
    en: "Enter your full name and an email address or a phone number in the field below (one is enough). Then confirm your consent.",
    fr: "Saisissez votre nom complet et une adresse courriel ou un numéro de téléphone dans le champ ci-dessous (l’un ou l’autre suffit). Confirmez ensuite votre consentement.",
  },
  fullName: { en: "Full name", fr: "Nom complet" },
  emailOrPhone: {
    en: "Email or phone number",
    fr: "Courriel ou numéro de téléphone",
  },
  emailOrPhoneHint: {
    en: "Use an email if it contains @; otherwise we treat your entry as a phone number.",
    fr: "S’il y a un @, nous traitons la saisie comme un courriel ; sinon, comme un numéro de téléphone.",
  },
  emailOrPhoneRequired: {
    en: "Please enter an email or a phone number.",
    fr: "Veuillez saisir un courriel ou un numéro de téléphone.",
  },
  invalidEmail: {
    en: "Please enter a valid email address.",
    fr: "Veuillez saisir une adresse courriel valide.",
  },
  nameRequired: {
    en: "Please enter your name.",
    fr: "Veuillez saisir votre nom.",
  },
  consentCheckbox: {
    en: "I have read the information above and agree to participate in this study.",
    fr: "J’ai lu les informations ci-dessus et j’accepte de participer à cette étude.",
  },
  agreeRequired: {
    en: "Please tick the box to confirm your consent.",
    fr: "Veuillez cocher la case pour confirmer votre consentement.",
  },
} as const;
