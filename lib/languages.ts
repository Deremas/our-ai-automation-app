export type ChatLanguage = "en" | "fr" | "de" | "lb";

export const LANGUAGES: {
  code: ChatLanguage;
  label: string;
}[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "lb", label: "Lëtzebuergesch" },
];
