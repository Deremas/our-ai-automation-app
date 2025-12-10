// app/api/chat/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const MODEL_NAME = "gemini-2.0-flash";

function buildGeminiContents(messages: ChatMessage[]) {
  const systemPrompt =
    "You are an AI automation assistant for our agency. Be concise, helpful, friendly, and focus on business automation, workflows, tools, and how our AI services help clients.";

  const contents: any[] = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
  ];

  for (const msg of messages) {
    if (!msg?.content) continue;
    const role = msg.role === "user" ? "user" : "model";

    contents.push({
      role,
      parts: [{ text: msg.content }],
    });
  }

  return contents;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request body. Expected { messages: Message[] }." },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = body.messages;

    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Has GEMINI_API_KEY?", !!apiKey); // debug helper

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Server is missing GEMINI_API_KEY. Make sure .env.local is set and dev server restarted.",
        },
        { status: 500 }
      );
    }

    const geminiBody = {
      contents: buildGeminiContents(messages),
    };

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiBody),
      }
    );

    const data = await geminiRes.json().catch(() => ({}));

    if (!geminiRes.ok) {
      console.error("Gemini API error:", data);
      const errMsg =
        data?.error?.message ||
        JSON.stringify(data) ||
        `Gemini API returned status ${geminiRes.status}`;
      return NextResponse.json(
        { error: `Gemini error: ${errMsg}` },
        { status: geminiRes.status }
      );
    }

    const assistant =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return NextResponse.json({ assistant });
  } catch (err: any) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}

// // app/api/chat/route.ts
// import { NextResponse } from "next/server";

// type ChatMessage = {
//   role: "user" | "assistant" | "system";
//   content: string;
// };

// const MODEL_NAME = "gemini-1.5-flash"; // free-tier friendly

// function buildGeminiContents(messages: ChatMessage[]) {
//   const systemPrompt =
//     "You are a helpful, concise AI assistant integrated into an AI automation agency web app. " +
//     "Answer in clear, user-friendly language, and when relevant, relate answers to automation, workflows, and productivity.";

//   const contents: any[] = [
//     {
//       role: "user",
//       parts: [{ text: systemPrompt }],
//     },
//   ];

//   for (const msg of messages) {
//     if (!msg?.content) continue;

//     if (msg.role === "system") {
//       // Gemini doesn’t have a system role, so treat as extra instruction from user
//       contents.push({
//         role: "user",
//         parts: [{ text: msg.content }],
//       });
//     } else {
//       contents.push({
//         role: msg.role === "user" ? "user" : "model",
//         parts: [{ text: msg.content }],
//       });
//     }
//   }

//   return contents;
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const messages: ChatMessage[] = body?.messages || [];

//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       return NextResponse.json(
//         { error: "Missing GEMINI_API_KEY in environment" },
//         { status: 500 }
//       );
//     }

//     const contents = buildGeminiContents(messages);

//     const geminiRes = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contents }),
//       }
//     );

//     const data = await geminiRes.json();

//     if (!geminiRes.ok) {
//       console.error("Gemini API error:", data);
//       return NextResponse.json(data, { status: geminiRes.status });
//     }

//     const assistantText =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

//     return NextResponse.json({ assistant: assistantText });
//   } catch (err: any) {
//     console.error("Chat route error:", err);
//     return NextResponse.json(
//       { error: err?.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }
