// lib/chat-storage.ts
import type { Message } from "ai";

const KEY = "mfg_chat_history_v1";

export function loadChatHistory(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: Message[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(messages));
  } catch {
    // ignore quota errors
  }
}

export function clearChatHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
