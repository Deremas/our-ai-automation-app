"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";

import {
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import {
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
  type SafeMessage,
} from "@/lib/chat-storage";

import { LANGUAGES, type ChatLanguage } from "@/lib/languages";

/** UI strings */
const UI: Record<
  ChatLanguage,
  { placeholder: string; thinking: string; clear: string }
> = {
  en: {
    placeholder: "Ask about AI integration or automation...",
    thinking: "Thinking...",
    clear: "Clear chat",
  },
  fr: {
    placeholder: "Demandez sur l'integration IA ou l'automatisation...",
    thinking: "Reflexion...",
    clear: "Effacer",
  },
  de: {
    placeholder: "Fragen Sie zu KI-Integration oder Automatisierung...",
    thinking: "Denke...",
    clear: "Leeren",
  },
  lb: {
    placeholder: "Frot iwer AI-Integratioun oder Automatisatioun...",
    thinking: "Ech denken...",
    clear: "Eidel maachen",
  },
};

const WELCOME: SafeMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I’m your AI automation assistant for MFG Automation. Ask anything about AI integration, automation, workflows, or system integrations.",
};

/** Extracts readable text from either `content` or `parts[]` messages */
function extractText(m: any): string {
  if (typeof m?.content === "string") return m.content;

  if (Array.isArray(m?.parts)) {
    return m.parts
      .filter((p: any) => p?.type === "text" && typeof p?.text === "string")
      .map((p: any) => p.text)
      .join("");
  }

  return "";
}

/** Convert any AI-SDK message shape into SafeMessage for persistence */
function toSafe(m: any): SafeMessage {
  const role = (m?.role ?? "assistant") as SafeMessage["role"];
  const content = extractText(m);

  return {
    id: String(m?.id ?? (globalThis.crypto?.randomUUID?.() ?? Date.now().toString())),
    role,
    content,
    metadata: m?.metadata?.language ? { language: m.metadata.language } : undefined,
  };
}

export default function Chatbot() {
  /** state */
  const [lang, setLang] = useState<ChatLanguage>("en");
  const [input, setInput] = useState("");

  /** load safe history once */
  const [initialMessages] = useState<SafeMessage[]>(() => {
    const saved = loadChatHistory();
    return saved.length ? saved : [WELCOME];
  });

  /**
   * AI SDK chat
   * - We pass SafeMessage[] as initialMessages (works; it's serializable)
   * - Some SDK versions have strict typing; runtime supports it.
   */
  const { messages, sendMessage, status, setMessages } = useChat({
    api: "/api/chat" as any,
    initialMessages: initialMessages as any,
  } as any);

  const loading = useMemo(
    () => status === "submitted" || status === "streaming",
    [status]
  );

  /** persist safe history whenever messages change */
  useEffect(() => {
    // Convert SDK messages -> safe messages before saving
    const safe = (messages as any[]).map(toSafe).filter((m) => m.content.length > 0);
    saveChatHistory(safe as any);
  }, [messages]);

  /** optionally sync language selector from last user message metadata */
  useEffect(() => {
    const last = (messages as any[])?.slice().reverse().find((m) => m?.role === "user");
    const lastLang = last?.metadata?.language;
    if (lastLang && (lastLang === "en" || lastLang === "fr" || lastLang === "de" || lastLang === "lb")) {
      setLang(lastLang);
    }
  }, [messages]);

  /** scrolling */
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const lastLenRef = useRef(0);

  useEffect(() => {
    if ((messages?.length ?? 0) !== lastLenRef.current) {
      lastLenRef.current = messages.length;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  useEffect(() => {
    if (loading) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [loading]);

  /** actions */
  const onClear = () => {
    clearChatHistory();
    setMessages([WELCOME] as any);
  };

  const onSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setInput("");

    sendMessage({
      text: trimmed,
      metadata: { language: lang },
    } as any);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  /** render helper */
  const renderMessageText = (m: any) => {
    // Prefer parts text if present
    if (m?.parts && Array.isArray(m.parts)) {
      return m.parts.map((p: any, i: number) =>
        p?.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
      );
    }
    return m?.content ?? "";
  };

  /** UI */
  return (
    <div className="flex flex-col h-full text-sm text-gray-900">
      {/* messages container */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 bg-gray-50 p-3 rounded-lg">
        <Conversation className="h-full">
          <ConversationContent>
            {(messages as any[]).map((m) => (
              <Message key={m.id} from={m.role as any}>
                <MessageContent>
                  <MessageResponse>{renderMessageText(m)}</MessageResponse>
                </MessageContent>
              </Message>
            ))}

            {loading && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-xl bg-gray-200 text-gray-800 animate-pulse">
                  {UI[lang].thinking}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </ConversationContent>

          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* controls (language + clear) */}
      <div className="mt-3 space-y-2 ml-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-gray-900"
            disabled={loading}
          >
            {UI[lang].clear}
          </button>

          <PromptInputSelect
            value={lang}
            onValueChange={(v) => setLang(v as ChatLanguage)}
            disabled={loading}
          >
            <PromptInputSelectTrigger className="h-8 w-[180px] text-xs bg-white border border-gray-300 rounded-full">
              <PromptInputSelectValue placeholder="English" />
            </PromptInputSelectTrigger>

            <PromptInputSelectContent className="bg-white border border-gray-200 shadow-lg">
              {LANGUAGES.map((l) => (
                <PromptInputSelectItem key={l.code} value={l.code}>
                  {l.label}
                </PromptInputSelectItem>
              ))}
            </PromptInputSelectContent>
          </PromptInputSelect>
        </div>

        {/* input row */}
        <div className="mt-2 border-t border-gray-200 bg-white px-3 py-2">
          <div className="flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
              placeholder={UI[lang].placeholder}
              rows={1}
              className="
                flex-1
                resize-none
                rounded-lg
                border border-gray-300
                px-3 py-2
                text-sm
                text-gray-900
                outline-none
                focus:ring-2 focus:ring-blue-500
                max-h-[96px]
                overflow-y-auto
              "
              style={{ lineHeight: "1.4" }}
            />

            <PromptInputSubmit
              status={status as any}
              disabled={loading || !input.trim()}
              className="shrink-0 self-center"
              onClick={(e: any) => {
                e.preventDefault();
                onSend();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
