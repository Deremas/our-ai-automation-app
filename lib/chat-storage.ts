// lib/chat-storage.ts

const KEY = "mfg_chat_history_v2";

export type SafeMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  // optional: keep language if you want later
  metadata?: { language?: "en" | "fr" | "de" | "lb" };
};

function extractText(m: any): string {
  // supports both { content } and { parts: [{type:"text", text}] }
  if (typeof m?.content === "string") return m.content;

  if (Array.isArray(m?.parts)) {
    return m.parts
      .filter((p: any) => p?.type === "text" && typeof p?.text === "string")
      .map((p: any) => p.text)
      .join("");
  }

  return "";
}

function toSafeMessage(m: any): SafeMessage {
  return {
    id: String(
      m?.id ?? globalThis.crypto?.randomUUID?.() ?? Date.now().toString()
    ),
    role: (m?.role ?? "assistant") as SafeMessage["role"],
    content: extractText(m),
    metadata: m?.metadata?.language
      ? { language: m.metadata.language }
      : undefined,
  };
}

export function loadChatHistory(): SafeMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // validate + normalize
    return parsed
      .filter((m) => m && typeof m === "object")
      .map((m) => ({
        id: String(
          m.id ?? globalThis.crypto?.randomUUID?.() ?? Date.now().toString()
        ),
        role: (m.role ?? "assistant") as SafeMessage["role"],
        content: typeof m.content === "string" ? m.content : "",
        metadata: m?.metadata?.language
          ? { language: m.metadata.language }
          : undefined,
      }))
      .filter((m) => m.content.length > 0);
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: any[]) {
  if (typeof window === "undefined") return;
  try {
    const safe = (messages ?? []).map(toSafeMessage);
    localStorage.setItem(KEY, JSON.stringify(safe));
  } catch {
    // ignore quota errors
  }
}

export function clearChatHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
    // also clear old key if it exists
    localStorage.removeItem("mfg_chat_history_v1");
  } catch {}
}