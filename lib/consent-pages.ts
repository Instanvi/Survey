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

export const consentInfoPages: (ConsentInfoPage & { icon?: string })[] = [
  {
    heading: {
      en: "Purpose of the Study",
      fr: "Objet de l’étude",
    },
    body: {
      en: "This study aims to investigate on how Cameroonian Mobile Telecoms can leverage structured ESG adoption to secure long-term financial performance in a growing market.",
      fr: "Cette étude vise à examiner comment les télécommunications mobiles camerounaises peuvent tirer parti de l’adoption structurée de l’ESG pour garantir une performance financière à long terme sur un marché en pleine croissance.",
    },
  },
  {
    heading: {
      en: "Procedures",
      fr: "Déroulement",
    },
    body: {
      en: "If you agree to participate, you are required to complete a questionnaire that follows. This questionnaire will require you to provide the name of your organization, your level in the organization's hierarchy, your role, and the years of experience you have in ESG related topics. Then you will be required to provide your opinion on how ESG is being practiced by your organization by answering YES/NO question, and providing a few recommendations at the end. You are not required to disclose your personal information in at any time in the survey.",
      fr: "Si vous acceptez de participer, vous devrez remplir le questionnaire qui suit. Ce questionnaire vous demandera de fournir le nom de votre organisation, votre niveau dans la hiérarchie de l’organisation, votre rôle et les années d’expérience que vous avez sur les sujets liés à l’ESG. Vous devrez ensuite donner votre avis sur la manière dont l’ESG est pratiqué par votre organisation en répondant à des questions par OUI/NON et en formulant quelques recommandations à la fin. Vous n’êtes en aucun cas tenu·e de divulguer vos informations personnelles au cours de l’enquête.",
    },
  },
  {
    heading: {
      en: "Risks and Discomforts",
      fr: "Risques et gênes",
    },
    body: {
      en: "You might face retaliation risks from your employer if you provide negative feedback on ESG practices and this comes to their notice.",
      fr: "Vous pourriez être confronté·e à des risques de représailles de la part de votre employeur si vous fournissez des commentaires négatifs sur les pratiques ESG et que cela parvient à sa connaissance.",
    },
  },
  {
    heading: {
      en: "Benefits",
      fr: "Bénéfices",
    },
    body: {
      en: "You may benefit from this study if your organization implements actions that bring positive social and financial benefits for employees although this cannot be guaranteed. You should also be proud to contribute to the creation of new knowledge on ESG adoption in Cameroon.",
      fr: "Vous pourriez bénéficier de cette étude si votre organisation met en œuvre des actions qui apportent des retombées sociales et financières positives pour les employé·es, bien que cela ne puisse être garanti. Vous devriez également être fier·ère de contribuer à la création de nouvelles connaissances sur l’adoption de l’ESG au Cameroun.",
    },
  },
  {
    heading: {
      en: "Confidentiality",
      fr: "Confidentialité",
    },
    body: {
      en: "Your information will be protected and stored securely.",
      fr: "Vos informations seront protégées et stockées en toute sécurité.",
    },
  },
  {
    heading: {
      en: "Voluntary Participation",
      fr: "Participation volontaire",
    },
    body: {
      en: "Participation is voluntary, and you may withdraw at any time without penalty. You are free to fully disclose, partially disclose or not disclose at all any information you deem to sensitive to be made available to outsiders, without any penalties.",
      fr: "La participation est volontaire et vous pouvez vous retirer à tout moment sans pénalité. Vous êtes libre de divulguer entièrement, partiellement ou de ne pas divulguer du tout toute information que vous jugez trop sensible pour être mise à la disposition de tiers, sans aucune pénalité.",
    },
  },
];


export const consentUi = {
  mainTitle: {
    en: "The Impact of ESG adoption on Sustainable Financial Performance in your Organization",
    fr: "L’impact de l’adoption de l’ESG sur la performance financière durable au sein de votre organisation",
  },

  researcher: {
    en: "Kenneth KOME Echalle",
    fr: "Kenneth KOME Echalle",
  },
  institution: {
    en: "Robert Kennedy College - University of Cumbria",
    fr: "Robert Kennedy College - University of Cumbria",
  },
  startSurvey: {
    en: "Proceed to Survey",
    fr: "Passer à l’enquête",
  },
  consentCheckbox: {
    en: "I have read the ABOVE information and AGREE to participate in this study under the stated conditions.",
    fr: "J’ai lu les informations CI-DESSUS et j’ACCEPTE de participer à cette étude selon les conditions énoncées.",
  },

  agreeRequired: {
    en: "Please tick the box to confirm your consent.",
    fr: "Veuillez cocher la case pour confirmer votre consentement.",
  },

} as const;
