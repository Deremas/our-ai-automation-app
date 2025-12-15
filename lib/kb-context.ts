import { BUSINESS_KB, type Lang } from "@/app/data/knowledge";

export function buildKBContext(lang: Lang): string {
  const t = (obj: Record<Lang, string>) => obj[lang] ?? obj.en;

  const services = BUSINESS_KB.services
    .map((s) => {
      const name = t(s.name);
      const outcomes = (s.outcomes?.[lang] ?? s.outcomes?.en ?? [])
        .map((x) => `- ${x}`)
        .join("\n");
      const includes = (s.includes?.[lang] ?? s.includes?.en ?? [])
        .map((x) => `- ${x}`)
        .join("\n");
      const notes = (s.notes?.[lang] ?? s.notes?.en ?? [])
        .map((x) => `- ${x}`)
        .join("\n");

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

  const industries = (
    BUSINESS_KB.industries?.list?.[lang] ??
    BUSINESS_KB.industries?.list?.en ??
    []
  )
    .map((x) => `- ${x}`)
    .join("\n");

  const process = (
    BUSINESS_KB.process?.steps?.[lang] ??
    BUSINESS_KB.process?.steps?.en ??
    []
  )
    .map((x) => `- ${x}`)
    .join("\n");

  const leadQs = (
    BUSINESS_KB.leadQuestions?.list?.[lang] ??
    BUSINESS_KB.leadQuestions?.list?.en ??
    []
  )
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
