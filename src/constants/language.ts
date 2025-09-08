export const LANGUAGES = {
  ENGLISH: 'en',
  GAEILGE: 'ga'
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const LANGUAGE_LABELS = {
  [LANGUAGES.ENGLISH]: 'English',
  [LANGUAGES.GAEILGE]: 'Gaeilge'
} as const;
