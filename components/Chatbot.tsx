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
} from "@/lib/chat-storage";

import { LANGUAGES, type ChatLanguage } from "@/lib/languages";

/** UI strings (same idea as your old version) */
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

/** Minimal message type for local persistence + welcome message */
type LocalMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const WELCOME: LocalMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I’m your AI automation assistant for MFG Automation. Ask anything about AI integration, automation, workflows, or system integrations.",
};

export default function Chatbot() {
  /** ----------------------------
   * State
   * ---------------------------- */
  const [lang, setLang] = useState<ChatLanguage>("en");
  const [input, setInput] = useState("");

  /** load history once */
  const [initialMessages] = useState<any[]>(() => {
    const saved = (loadChatHistory() ?? []) as any[];
    // saved could be UIMessage parts OR simple {content}
    return saved.length ? saved : [WELCOME];
  });

  /** AI SDK chat */
  const { messages, sendMessage, status, setMessages } = useChat({
    // some versions type this option differently; runtime supports it
    api: "/api/chat" as any,
    initialMessages: initialMessages as any,
  } as any);

  const loading = useMemo(
    () => status === "submitted" || status === "streaming",
    [status]
  );

  /** persist chat history */
  useEffect(() => {
    saveChatHistory(messages as any);
  }, [messages]);

  /** scrolling (like your old version) */
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

  /** ----------------------------
   * Helpers
   * ---------------------------- */

  // Supports both message styles:
  // - { content: string }
  // - { parts: [{ type: "text", text: string }, ...] }
  function renderMessageText(m: any) {
    if (m?.parts && Array.isArray(m.parts)) {
      return m.parts.map((p: any, i: number) =>
        p?.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
      );
    }
    return m?.content ?? "";
  }

  /** ----------------------------
   * Actions
   * ---------------------------- */
  const onClear = () => {
    clearChatHistory();
    setMessages([WELCOME] as any);
  };

  const onSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setInput("");

    // AI SDK expects { text } and we attach metadata.language for your /api/chat
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

  /** ----------------------------
   * UI
   * ---------------------------- */
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
      <div className="mt-3 space-y-2">
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
