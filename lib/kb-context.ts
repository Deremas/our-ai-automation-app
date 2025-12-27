import {
  BUSINESS_KB,
  type Lang,
  type KBLocalizedString,
  type KBService,
} from "@/app/data/knowledge";

export function buildKBContext(lang: Lang): string {
  const t = (obj: KBLocalizedString) => obj[lang] ?? obj.en;

  const pickList = (obj: Record<Lang, string[]> | undefined) =>
    obj?.[lang] ?? obj?.en ?? [];

  const services = (BUSINESS_KB.services as readonly KBService[])
    .map((s) => {
      const name = t(s.name);

      const outcomes = pickList(s.outcomes)
        .map((x) => `- ${x}`)
        .join("\n");
      const includes = pickList(s.includes)
        .map((x) => `- ${x}`)
        .join("\n");
      const notes = pickList(s.notes)
        .map((x) => `- ${x}`)
        .join("\n"); // ✅ safe (notes optional)

      return [
        `SERVICE: ${name}`,
        outcomes ? `OUTCOMES:\n${outcomes}` : "",
        includes ? `INCLUDES:\n${includes}` : "",
        notes ? `NOTES:\n${notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const industries = pickList(BUSINESS_KB.industries?.list)
    .map((x) => `- ${x}`)
    .join("\n");

  const process = pickList(BUSINESS_KB.process?.steps)
    .map((x) => `- ${x}`)
    .join("\n");

  const leadQs = pickList(BUSINESS_KB.leadQuestions?.list)
    .map((x) => `- ${x}`)
    .join("\n");

  return `
You are the official AI assistant for ${BUSINESS_KB.company.name}.

COMPANY
- ${t(BUSINESS_KB.company.oneLiner)}
- ${t(BUSINESS_KB.company.positioning)}

SERVICES (source of truth)
${services}

INDUSTRIES
${industries}

PROCESS
${process}

LEAD QUESTIONS
${leadQs}

CONTACT
- Email: ${BUSINESS_KB.contact.email}
- Contact form: ${BUSINESS_KB.contact.formUrl}
- Note: ${t(BUSINESS_KB.contact.note)}
- CTA: ${t(BUSINESS_KB.contact.cta)}

RULES
- If the user asks about MFG Automation services, ALWAYS answer using this context.
- Use the tool "searchKnowledgeBase" to fetch extra details from uploaded documents when needed.
- If the tool finds nothing, do NOT say "not found" if the answer exists in this context.
- Be concise, helpful, and friendly. Use the user's language.
`.trim();
}