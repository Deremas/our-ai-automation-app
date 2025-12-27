// lib/chat-storage.ts

import type { ChatLanguage } from "@/lib/languages";

export type SafeMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  metadata?: { language?: ChatLanguage };
};

const STORAGE_KEY = "luxai_chat_history_v1";

function isSafeMessage(x: any): x is SafeMessage {
  return (
    x &&
    typeof x === "object" &&
    typeof x.id === "string" &&
    (x.role === "user" || x.role === "assistant" || x.role === "system") &&
    typeof x.content === "string"
  );
}

export function loadChatHistory(): SafeMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSafeMessage);
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: SafeMessage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore quota / access errors
  }
}

export function clearChatHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
