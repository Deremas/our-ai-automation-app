import { openai } from "@ai-sdk/openai";
import {
  streamText,
  type UIMessage,
  tool,
  InferUITools,
  UIDataTypes,
  convertToModelMessages,
  stepCountIs,
} from "ai";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";
import { buildKBContext } from "@/lib/kb-context"; // ✅ new

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LanguageCode = "en" | "fr" | "de" | "lb";

function getRequestedLanguage(messages: UIMessage[]): LanguageCode {
  const last = messages[messages.length - 1] as unknown as {
    role?: string;
    metadata?: { language?: string };
  };
  const code = (last?.metadata?.language ?? "en").toLowerCase();
  if (code === "fr" || code === "de" || code === "lb" || code === "en")
    return code;
  return "en";
}

const tools = {
  searchKnowledgeBase: tool({
    description:
      "Search the vector knowledge base (uploaded documents) for relevant information.",
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant documents"),
    }),
    execute: async ({ query }) => {
      try {
        const results = await searchDocuments(query, 3, 0.5);
        if (results.length === 0) {
          // ✅ return empty context, not a misleading sentence
          return "";
        }
        return results.map((r, i) => `[${i + 1}] ${r.content}`).join("\n\n");
      } catch (error) {
        console.error("Search error", error);
        return "";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      messages?: ChatMessage[];
    } | null;

    if (!body?.messages || !Array.isArray(body.messages)) {
      return new Response(
        "Invalid request body. Expected { messages: Message[] }",
        { status: 400 }
      );
    }

    const messages = body.messages;
    const lang = getRequestedLanguage(messages);

    const kbSystem = buildKBContext(lang);

    const result = await streamText({
      model: openai("gpt-4.1-mini"),
      messages: convertToModelMessages(messages),
      tools,
      system: kbSystem,
      // 2 steps is fine: step 1 tool call (optional) + step 2 answer
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}

// // app/api/chat/route.ts
// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import { BUSINESS_KB } from "@/app/data/knowledge";

// type Lang = "en" | "fr" | "de" | "lb";
// type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

// const MODEL_NAME = "gemini-2.0-flash";

// function detectLang(text: string): Lang {
//   const t = (text || "").toLowerCase();

//   if (/(\bech\b|\bdu\b|\bmir\b|\bhien\b|\bsi\b|\bass\b|\bsinn\b|\bnet\b|\bwei\b|\bwat\b|\bgett\b|\bvillmools\b|\bmoien\b|\baddi\b)/.test(t)) {
//     return "lb";
//   }

//   if (/(\bund\b|\boder\b|\bnicht\b|\bdanke\b|\bbitte\b|\bhallo\b|\bich\b|\bwir\b|\bsie\b|\bder\b|\bdie\b|\bdas\b|\bguten\b)/.test(t)) {
//     return "de";
//   }

//   if (/(\bbonjour\b|\bmerci\b|\bs'il\b|\bje\b|\bnous\b|\bvous\b|\ble\b|\bla\b|\bles\b|\bdes\b|\bavec\b|\bpour\b|\best\b)/.test(t)) {
//     return "fr";
//   }

//   return "en";
// }

// function langName(lang: Lang) {
//   return (
//     {
//       en: "English",
//       fr: "French",
//       de: "German",
//       lb: "Luxembourgish (Letzebuergesch)",
//     } as const
//   )[lang];
// }

// function systemPrompt(lang: Lang) {
//   const contact = BUSINESS_KB.contact || {};
//   return `
// You are the official AI assistant for ${BUSINESS_KB.company.name}. Represent the brand professionally and safely. Use only the provided knowledge - do not invent services, guarantees, pricing, or timelines.

// Ground truth knowledge:
// ${JSON.stringify(BUSINESS_KB, null, 2)}

// Contact options:
// - Contact form: ${contact.formUrl || "/contact"}
// - Email: ${contact.email || "hello@aiautomation.com"}

// Response rules:
// - Always reply in ${langName(lang)} with concise, business-focused answers.
// - Answer the user's question first.
// - Then ask at most one smart follow-up question to qualify the need (industry, tools, volumes, urgency).
// - Always end with a clear next step: invite their name/email/company and what they want to automate, or direct them to the contact form/email for more detail.
// - If asked for pricing, give a reasonable range or explain it depends on scope; ask for scope inputs.
// - If the request is off-topic, unsafe, or unrelated to our services, politely decline and steer back to how we automate businesses.
// - If deeper clarification is required, encourage using the contact form (${contact.formUrl || "/contact"}) or emailing ${contact.email || "hello@aiautomation.com"}.
// `.trim();
// }

// function buildGeminiContents(messages: ChatMessage[], lang: Lang) {
//   const contents: any[] = [
//     { role: "user", parts: [{ text: systemPrompt(lang) }] },
//   ];

//   for (const msg of messages) {
//     if (!msg?.content) continue;
//     const role = msg.role === "user" ? "user" : "model";
//     contents.push({ role, parts: [{ text: msg.content }] });
//   }
//   return contents;
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json().catch(() => null);

//     if (!body || !Array.isArray(body.messages)) {
//       return NextResponse.json(
//         { error: "Invalid request body. Expected { messages: Message[] }." },
//         { status: 400 }
//       );
//     }

//     const messages: ChatMessage[] = body.messages;

//     const lastUserText =
//       [...messages].reverse().find((m) => m.role === "user")?.content || "";

//     const lang: Lang =
//       body.lang && ["en", "fr", "de", "lb"].includes(body.lang)
//         ? body.lang
//         : detectLang(lastUserText);

//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       return NextResponse.json(
//         { error: "Missing GEMINI_API_KEY in .env.local" },
//         { status: 500 }
//       );
//     }

//     const geminiRes = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contents: buildGeminiContents(messages, lang) }),
//       }
//     );

//     const data = await geminiRes.json().catch(() => ({}));

//     if (!geminiRes.ok) {
//       const errMsg =
//         data?.error?.message ||
//         JSON.stringify(data) ||
//         `Gemini API returned status ${geminiRes.status}`;

//       const lower = String(errMsg).toLowerCase();
//       if (
//         lower.includes("quota") ||
//         lower.includes("billing") ||
//         lower.includes("rate")
//       ) {
//         return NextResponse.json(
//           {
//             error:
//               "AI service is unavailable (Gemini quota/billing). Enable billing/quota for your API key and retry.",
//           },
//           { status: 429 }
//         );
//       }

//       return NextResponse.json(
//         { error: `Gemini error: ${errMsg}` },
//         { status: geminiRes.status }
//       );
//     }

//     const assistant =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

//     return NextResponse.json({ assistant, lang });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }
