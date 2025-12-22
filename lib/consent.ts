export type Consent = {
  essential: true;
  analytics: boolean;
  v: string; // policy version/date
};

export const CONSENT_COOKIE = "lux_consent";
export const CONSENT_VERSION = "2025-12-22";

export function parseConsent(raw?: string | null): Consent | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(decodeURIComponent(raw)) as Consent;
    if (obj && obj.essential === true && typeof obj.analytics === "boolean")
      return obj;
    return null;
  } catch {
    return null;
  }
}

export function serializeConsent(c: Consent) {
  return encodeURIComponent(JSON.stringify(c));
}
