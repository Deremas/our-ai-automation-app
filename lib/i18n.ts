export type AppLanguage = "en" | "fr" | "de" | "lb";

export const APP_LANGUAGES: { code: AppLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "lb", label: "Lëtzebuergesch" },
];

export const DEFAULT_LANG: AppLanguage = "en";

export const LANG_STORAGE_KEY = "kindflow_lang_v1";

// Generic localized types
export type LocalizedString = Record<AppLanguage, string>;
export type LocalizedList = Record<AppLanguage, string[]>;
