import type { AppLanguage } from "./i18n";
export type ChatLanguage = AppLanguage;

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "lb", label: "Lëtzebuergesch" },
] satisfies { code: ChatLanguage; label: string }[];
