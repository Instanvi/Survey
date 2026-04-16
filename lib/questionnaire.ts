import type { Locale } from "./locale";

export type Option = { id: string; labels: Record<Locale, string> };

export type MatrixRow = {
  id: string;
  maxPoints: number;
  labels: Record<Locale, string>;
};

/** Likert 1–5 → multiplier from questionnaire */
export const LIKERT_MULTIPLIER: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 0,
  2: 0.25,
  3: 0.5,
  4: 0.75,
  5: 1,
};

export const likertScaleLabels: Record<Locale, string[]> = {
  en: [
    "Not at all",
    "Slightly",
    "Moderate",
    "To a large extent",
    "Very extensively",
  ],
  fr: [
    "Pas du tout",
    "Légèrement",
    "Modérément",
    "Dans une large mesure",
    "Très largement",
  ],
};

/** Q1 — MTN subsidiary (demographic, unscored). Wording from Final Questionnaire_2026.xlsx. */
export const q1Options: Option[] = [
  { id: "mtn_benin", labels: { en: "MTN Benin", fr: "MTN Benin" } },
  { id: "mtn_botswana", labels: { en: "MTN Botswana", fr: "MTN Botswana" } },
  { id: "mtn_cameroon", labels: { en: "MTN Cameroon", fr: "MTN Afrique" } },
  { id: "mtn_congo", labels: { en: "MTN Congo", fr: "MTN Congo" } },
  {
    id: "mtn_cote_divoire",
    labels: { en: "MTN Cote D'Ivoire", fr: "MTN Cote D'Ivoire" },
  },
  { id: "mtn_eswantini", labels: { en: "MTN Eswantini", fr: "MTN Eswantini" } },
  { id: "mtn_ghana", labels: { en: "MTN Ghana", fr: "MTN Ghana" } },
  { id: "mtn_liberia", labels: { en: "MTN Liberia", fr: "MTN Liberia" } },
  { id: "mtn_nigeria", labels: { en: "MTN Nigeria", fr: "MTN Nigeria" } },
  { id: "mtn_rwanda", labels: { en: "MTN Rwanda", fr: "MTN Rwanda" } },
  {
    id: "mtn_south_africa",
    labels: { en: "MTN South Africa", fr: "MTN Afrique du Sud" },
  },
  {
    id: "mtn_south_sudan",
    labels: { en: "MTN South Sudan", fr: "MTN Soudan du Sud" },
  },
  { id: "mtn_sudan", labels: { en: "MTN Sudan", fr: "MTN Soudan" } },
  { id: "mtn_uganda", labels: { en: "MTN Uganda", fr: "MTN ouganda" } },
  { id: "mtn_zambia", labels: { en: "MTN Zambia", fr: "MTN Zambie" } },
];

export const q2Options: Option[] = [
  { id: "finance", labels: { en: "Finance", fr: "Finance" } },
  {
    id: "esg",
    labels: {
      en: "ESG / Sustainability",
      fr: "ESG / Développement durable",
    },
  },
  {
    id: "hr",
    labels: { en: "Human Resources", fr: "Ressources humaines" },
  },
  { id: "legal", labels: { en: "Legal", fr: "Juridique" } },
  { id: "compliance", labels: { en: "Compliance", fr: "Conformité" } },
  { id: "it", labels: { en: "IT", fr: "Informatique" } },
];

export const q3Options: Option[] = [
  { id: "y0_2", labels: { en: "0–2 years", fr: "0–2 ans" } },
  { id: "y3_5", labels: { en: "3–5 years", fr: "3–5 ans" } },
  { id: "y6_10", labels: { en: "6–10 years", fr: "6–10 ans" } },
  {
    id: "y10p",
    labels: { en: "More than 10 years", fr: "Plus de 10 ans" },
  },
];

export const q4Options: Option[] = [
  {
    id: "senior",
    labels: {
      en: "Senior Manager / Executive",
      fr: "Executive / Dirigeant",
    },
  },
  {
    id: "middle",
    labels: { en: "Middle Manager", fr: "Cadre" },
  },
  {
    id: "non_mgmt",
    labels: {
      en: "Non Management Staff",
      fr: "Agent / Non-Cadre",
    },
  },
];

export const q5Options: Option[] = [
  {
    id: "very_familiar",
    labels: { en: "Very familiar", fr: "Très familier" },
  },
  {
    id: "somewhat_familiar",
    labels: { en: "Somewhat familiar", fr: "Peu familier" },
  },
  {
    id: "not_familiar",
    labels: { en: "Not familiar", fr: "Pas familier" },
  },
];

export const q6Options: Option[] = [
  {
    id: "structured_esg",
    labels: {
      en: "A structured ESG strategy with defined KPIs",
      fr: "Une stratégie ESG structurée avec des indicateurs (KPI) définis",
    },
  },
  {
    id: "mix_csr",
    labels: {
      en: "A mix of CSR and early ESG elements",
      fr: "Un mélange de RSE et de premiers éléments ESG",
    },
  },
  {
    id: "mainly_csr",
    labels: {
      en: "Mainly CSR activities (philanthropy, charity)",
      fr: "Principalement des activités RSE (philanthropie, dons)",
    },
  },
  {
    id: "none_formal",
    labels: {
      en: "No formal CSR or ESG practices",
      fr: "Aucune pratique RSE ou ESG formelle",
    },
  },
  {
    id: "not_sure",
    labels: { en: "Not sure", fr: "Je ne sais pas" },
  },
];

export const q7Options: Option[] = [
  {
    id: "formal_esg_report",
    labels: {
      en: "Yes, a formal ESG report",
      fr: "Oui, un rapport ESG formel",
    },
  },
  {
    id: "informal_only",
    labels: {
      en: "Yes, but activities are only informally communicated",
      fr: "Oui, mais les activités ne sont communiquées qu’informellement",
    },
  },
  {
    id: "no_reporting",
    labels: { en: "No reporting", fr: "Aucun reporting" },
  },
  {
    id: "not_sure",
    labels: { en: "Not sure", fr: "Je ne sais pas" },
  },
];

export const q8Rows: MatrixRow[] = [
  {
    id: "env_energy",
    maxPoints: 10,
    labels: {
      en: "Energy efficiency initiatives (solar sites, low energy equipment)",
      fr: "Initiatives d’efficacité énergétique (sites solaires, équipements basse consommation d'énergie)",
    },
  },
  {
    id: "env_network",
    maxPoints: 10,
    labels: {
      en: "Network or data centre energy management",
      fr: "Gestion énergétique du réseau ou des centres de données",
    },
  },
  {
    id: "env_waste",
    maxPoints: 5,
    labels: {
      en: "Waste management & recycling",
      fr: "Gestion des déchets et recyclage",
    },
  },
  {
    id: "env_compliance",
    maxPoints: 2,
    labels: {
      en: "Environmental regulatory compliance",
      fr: "Conformité à la réglementation environnementale",
    },
  },
  {
    id: "env_tracking",
    maxPoints: 3,
    labels: {
      en: "Tracking environmental performance metrics (e.g., CO₂ emissions)",
      fr: "Suivi des indicateurs de performance environnementale (p. ex. émissions de Carbone)",
    },
  },
];

export const q9Rows: MatrixRow[] = [
  {
    id: "soc_health",
    maxPoints: 2,
    labels: {
      en: "Employee health, safety, and wellbeing",
      fr: "Santé, sécurité et bien-être des employés",
    },
  },
  {
    id: "soc_diversity",
    maxPoints: 2,
    labels: {
      en: "Diversity & inclusion programs",
      fr: "Programmes de diversité et d’inclusion",
    },
  },
  {
    id: "soc_community",
    maxPoints: 7,
    labels: {
      en: "Community investment / social initiatives",
      fr: "Investissement communautaire / initiatives sociales",
    },
  },
  {
    id: "soc_customer_sat",
    maxPoints: 5,
    labels: {
      en: "Customer satisfaction programs and surveys",
      fr: "Programmes et enquêtes de satisfaction client",
    },
  },
  {
    id: "soc_privacy",
    maxPoints: 7,
    labels: {
      en: "Customer data privacy and protection",
      fr: "Confidentialité et protection des données clients",
    },
  },
  {
    id: "soc_training",
    maxPoints: 2,
    labels: {
      en: "Training and staff development",
      fr: "Formation et développement du personnel",
    },
  },
];

export const q10Rows: MatrixRow[] = [
  {
    id: "gov_anticorruption",
    maxPoints: 4,
    labels: {
      en: "Anti corruption and compliance frameworks",
      fr: "Dispositifs anticorruption et de conformité",
    },
  },
  {
    id: "gov_board",
    maxPoints: 3,
    labels: {
      en: "Board independence & oversight",
      fr: "Indépendance du conseil et supervision",
    },
  },
  {
    id: "gov_risk",
    maxPoints: 7,
    labels: {
      en: "Risk management processes & business growth strategies",
      fr: "Processus de gestion des risques et stratégies de croissance",
    },
  },
  {
    id: "gov_audit",
    maxPoints: 3,
    labels: {
      en: "Internal audit and reporting mechanisms",
      fr: "Mécanismes d’audit interne et de reporting",
    },
  },
  {
    id: "gov_transparency",
    maxPoints: 3,
    labels: {
      en: "Transparency in operations and ESG reporting",
      fr: "Transparence des opérations et du reporting ESG",
    },
  },
];

export const q11Options: Option[] = [
  {
    id: "strongly_agree",
    labels: { en: "Strongly agree", fr: "Tout à fait d’accord" },
  },
  { id: "agree", labels: { en: "Agree", fr: "D’accord" } },
  { id: "disagree", labels: { en: "Disagree", fr: "Pas d’accord" } },
];

export const q12Options: Option[] = [
  {
    id: "q12_costs",
    labels: {
      en: "Reduced operational costs (energy, fines, etc.)",
      fr: "Réduction des coûts opérationnels (énergie, amendes, etc.)",
    },
  },
  {
    id: "q12_revenue",
    labels: {
      en: "Increased revenue or customer loyalty",
      fr: "Hausse des revenus ou de la fidélité client",
    },
  },
  {
    id: "q12_borrowing",
    labels: {
      en: "Reduced cost of borrowing",
      fr: "Réduction du coût d’emprunt",
    },
  },
  {
    id: "q12_brand",
    labels: {
      en: "Enhanced brand reputation",
      fr: "Amélioration de la réputation de la marque",
    },
  },
  {
    id: "q12_risk",
    labels: {
      en: "Improved risk management",
      fr: "Amélioration de la gestion des risques",
    },
  },
];

export const q13Options: Option[] = [
  { id: "yes", labels: { en: "Yes", fr: "Oui" } },
  {
    id: "possibly",
    labels: {
      en: "Possibly, but with challenges",
      fr: "Possiblement, mais avec des défis",
    },
  },
  { id: "no", labels: { en: "No", fr: "Non" } },
  {
    id: "not_sure",
    labels: { en: "Not sure", fr: "Je ne sais pas" },
  },
];

export const q14Options: Option[] = [
  {
    id: "q14_knowledge",
    labels: {
      en: "Lack of knowledge or expertise",
      fr: "Manque de connaissances ou d’expertise",
    },
  },
  {
    id: "q14_governance",
    labels: {
      en: "Lack of structured ESG governance",
      fr: "Absence d’une gouvernance ESG structurée",
    },
  },
  {
    id: "q14_resources",
    labels: {
      en: "Limited financial resources",
      fr: "Ressources financières limitées",
    },
  },
  {
    id: "q14_regulatory",
    labels: {
      en: "Low regulatory pressure",
      fr: "Faible pression réglementaire",
    },
  },
  {
    id: "q14_standards",
    labels: {
      en: "Lack of industry ESG standards",
      fr: "Absence de normes ESG sectorielles",
    },
  },
  {
    id: "q14_measuring",
    labels: {
      en: "Difficulty measuring ESG impact",
      fr: "Difficulté à mesurer l’impact ESG",
    },
  },
  {
    id: "q14_priority",
    labels: {
      en: "Low management priority",
      fr: "Priorité managériale faible",
    },
  },
  {
    id: "q14_other",
    labels: { en: "Other (please specify)", fr: "Autre (veuillez préciser)" },
  },
];

export const q15Options: Option[] = [
  {
    id: "fully",
    labels: { en: "Fully prepared", fr: "Totalement prête" },
  },
  {
    id: "moderate",
    labels: { en: "Moderately prepared", fr: "Modérément prête" },
  },
  {
    id: "not_prepared",
    labels: { en: "Not prepared", fr: "Pas prête" },
  },
  {
    id: "not_sure",
    labels: { en: "Not sure", fr: "Je ne sais pas" },
  },
];

export const q16Options: Option[] = [
  {
    id: "formal_team",
    labels: {
      en: "Yes, a formal ESG team",
      fr: "Oui, une équipe ESG formelle",
    },
  },
  {
    id: "shared",
    labels: {
      en: "Yes, but responsibilities are shared",
      fr: "Oui, mais les responsabilités sont partagées",
    },
  },
  {
    id: "no_dedicated",
    labels: {
      en: "No dedicated personnel",
      fr: "Aucun personnel dédié",
    },
  },
  {
    id: "not_sure",
    labels: { en: "Not sure", fr: "Je ne sais pas" },
  },
];

/** Section titles for UI */
export const sectionTitles: Record<
  string,
  { short: Record<Locale, string>; full: Record<Locale, string> }
> = {
  A: {
    short: { en: "SECTION A", fr: "SECTION A" },
    full: {
      en: "Respondent Information",
      fr: "Informations sur le répondant",
    },
  },
  B: {
    short: { en: "SECTION B", fr: "SECTION B" },
    full: {
      en: "Awareness and Understanding of ESG",
      fr: "Sensibilisation et compréhension de l’ESG",
    },
  },
  C: {
    short: { en: "SECTION C", fr: "SECTION C" },
    full: {
      en: "Current ESG Practices and Maturity Levels",
      fr: "Pratiques ESG actuelles et niveaux de maturité",
    },
  },
  D: {
    short: { en: "SECTION D", fr: "SECTION D" },
    full: {
      en: "Perceived Value and Financial Impact of ESG",
      fr: "Valeur perçue et impact financier de l’ESG",
    },
  },
  E: {
    short: { en: "SECTION E", fr: "SECTION E" },
    full: {
      en: "Barriers to ESG Adoption",
      fr: "Obstacles à l’adoption de l’ESG",
    },
  },
  F: {
    short: { en: "SECTION F", fr: "SECTION F" },
    full: {
      en: "Internal ESG Readiness and Capability",
      fr: "Préparation et capacités internes en matière d’ESG",
    },
  },
  G: {
    short: { en: "SECTION G", fr: "SECTION G" },
    full: {
      en: "Open Ended Questions",
      fr: "Questions ouvertes",
    },
  },
};

export const copy = {
  consentTitle: {
    en: "Consent",
    fr: "Consentement",
  },
  consentBody: {
    en: "Your responses will be used for research and reporting on ESG maturity. By continuing, you confirm that you agree to participate voluntarily and that your answers may be aggregated and analysed.",
    fr: "Vos réponses seront utilisées pour la recherche et le reporting sur la maturité ESG. En continuant, vous confirmez participer volontairement et que vos réponses peuvent être agrégées et analysées.",
  },
  consentCheckbox: {
    en: "I have read and agree to participate in this survey.",
    fr: "J’ai lu et j’accepte de participer à cette enquête.",
  },
  continue: { en: "Continue", fr: "Continuer" },
  submit: { en: "Submit responses", fr: "Envoyer les réponses" },
  q1: {
    en: "1. Which MTN Subsidiary do you work for or did you last work for?",
    fr: "1. Veuillez indiquer la filiale MTN pour laquelle vous travaillez ou avez travaillé en dernier lieu.",
  },
  q2: {
    en: "2. Which department do you work in?",
    fr: "2. Dans quel département travaillez-vous ?",
  },
  q3: {
    en: "3. How many years have you worked in the telecom sector?",
    fr: "3. Depuis combien d’années travaillez-vous dans le secteur des télécoms ?",
  },
  q4: {
    en: "4. What is your role in the company?",
    fr: "4. Quel est votre niveau de responsabilité dans l’entreprise ?",
  },
  home: { en: "Home", fr: "Accueil" },
  language: { en: "Language", fr: "Langue" },
  surveyEyebrow: {
    en: "Research survey",
    fr: "Enquête de recherche",
  },
  surveyTitle: {
    en: "ESG Telecom Survey",
    fr: "Enquête ESG Telecom",
  },
  surveyBrandTitle: {
    en: "Instanvi",
    fr: "Instanvi",
  },
  surveyBrandTagline: {
    en: "Telecom | Africa",
    fr: "Telecom | Afrique",
  },
  surveySubtitle: {
    en: "Evaluating Environmental, Social, and Governance practices in the African telecommunications sector.",
    fr: "Évaluation des pratiques environnementales, sociales et de gouvernance dans le secteur des télécommunications en Afrique.",
  },

  matrixIntro: {
    en: "Scale: 1 = Not at all | 5 = Very extensively",
    fr: "Échelle : 1 = Pas du tout | 5 = Très largement",
  },
  resultsTitle: { en: "Your results", fr: "Vos résultats" },
  totalScore: { en: "Total score", fr: "Score total" },
  outOf100: { en: "out of 100", fr: "sur 100" },
  breakdown: { en: "Score breakdown", fr: "Détail du score" },
  sending: { en: "Saving…", fr: "Enregistrement…" },
  saveFailed: {
    en: "We could not save your responses. Please check your connection and try again.",
    fr: "Impossible d’enregistrer vos réponses. Vérifiez votre connexion et réessayez.",
  },
  thanksTitle: { en: "Thank you", fr: "Merci" },
  back: { en: "Back", fr: "Retour" },
  thanksBody: {
    en: "Your responses have been recorded. You may close this page.",
    fr: "Vos réponses ont été enregistrées. Vous pouvez fermer cette page.",
  },
  backToResults: { en: "Back", fr: "Retour" },
  finish: { en: "Finish", fr: "Terminer" },
  required: { en: "Required", fr: "Obligatoire" },
  otherSpecify: { en: "Please specify", fr: "Précisez" },
  q5: {
    en: "5. How familiar are you with the concept of ESG (Environmental, Social, Governance)?",
    fr: "5. À quel point connaissez-vous le concept RSE/ESG (Environnement, Social, Gouvernance) ?",
  },
  q6: {
    en: "6. Which option best describes your company’s current sustainability practices?",
    fr: "6. Quelle option décrit le mieux les pratiques actuelles de durabilité de votre entreprise ?",
  },
  q7: {
    en: "7. Does your company publish any ESG, sustainability, or CSR reports?",
    fr: "7. Votre entreprise publie-t-elle des rapports ESG, de durabilité ou RSE ?",
  },
  q8: {
    en: "8. To what extent does your company implement the following environmental practices?",
    fr: "8. A quel pouint votre entreprise met-elle en œuvre les pratiques environnementales suivantes ?",
  },
  q9: {
    en: "9. To what extent does your company implement the following social practices?",
    fr: "9. A quel point votre entreprise met-elle en œuvre les pratiques sociales suivantes ?",
  },
  q10: {
    en: "10. To what extent does your company implement the following governance practices?",
    fr: "10. A quel point votre entreprise met-elle en œuvre les pratiques de gouvernance suivantes ?",
  },
  subsectionEnv: {
    en: "Environmental Practices",
    fr: "Pratiques environnementales",
  },
  subsectionSocial: {
    en: "Social Practices",
    fr: "Pratiques sociales",
  },
  subsectionGov: {
    en: "Governance Practices",
    fr: "Pratiques de gouvernance",
  },
  stickyHeaderTitle: {
    en: "ESG Survey",
    fr: "Enquête ESG",
  },

  q11: {
    en: "11. To what extent do you agree with: “ESG adoption can improve my company’s long term profitability”?",
    fr: "11. A quel point êtes-vous d’accord avec l’énoncé : « L’adoption de l’ESG peut améliorer la rentabilité à long terme de mon entreprise » ?",
  },
  q12: {
    en: "12. Which financial benefits do you believe ESG adoption can generate?",
    fr: "12. Quels avantages financiers pensez-vous que l’ESG peut générer ?",
  },
  q12Note: {
    en: "Only available to those who either strongly agree or agree on Q11.",
    fr: "Disponible uniquement pour les personnes ayant répondu « Tout à fait d’accord » ou « D’accord » à la question Q11.",
  },
  q13Note: {
    en: "Only available to those who either strongly agree or agree on Q11.",
    fr: "Disponible uniquement pour les personnes ayant répondu « Tout à fait d’accord » ou « D’accord » à la question Q11.",
  },
  q13: {
    en: "13. Do you believe ESG performance can be measured and linked to financial performance in your company?",
    fr: "13. Pensez-vous que la performance ESG/RSE peut être mesurée et reliée à la performance financière dans votre entreprise ?",
  },
  q14: {
    en: "14. What challenges prevent your company from adopting ESG more strategically?",
    fr: "14. Quels défis empêchent votre entreprise d’adopter l’ESG de manière plus stratégique ?",
  },
  q15: {
    en: "15. How prepared is your company to adopt a structured ESG framework in the next 3 years?",
    fr: "15. Dans quelle mesure votre entreprise est-elle prête à adopter un cadre ESG structuré au cours des 3 prochaines années ?",
  },
  q16: {
    en: "16. Does your company have any staff dedicated to ESG or sustainability?",
    fr: "16. Votre entreprise dispose-t-elle d’un personnel dédié à l’ESG ou au développement durable ?",
  },
  q17: {
    en: "17. Do you have any recommendations for improving ESG adoption in your Company?",
    fr: "17. Avez-vous des recommandations pour améliorer l’adoption de l’ESG dans votre entreprise ?",
  },
} as const;
