"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { Message as AIMessage } from "ai";

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
import { Loader } from "@/components/ai-elements/loader";

import {
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
} from "@/lib/chat-storage";

import { LANGUAGES, type ChatLanguage } from "@/lib/languages";

/** UI strings exactly like your old version */
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

const WELCOME: AIMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I’m your AI automation assistant for MFG Automation. Ask anything about AI integration, automation, workflows, or system integrations.",
};

export default function RAGChatBot() {
  /** ----------------------------
   * State (like your old component)
   * ---------------------------- */
  const [lang, setLang] = useState<ChatLanguage>("en");
  const [input, setInput] = useState("");

  const [initialMessages] = useState<AIMessage[]>(() => {
    const saved = loadChatHistory();
    return saved.length ? saved : [WELCOME];
  });

  const { messages, sendMessage, status, setMessages } = useChat({
    api: "/api/chat",
    initialMessages,
  });

  const loading = useMemo(
    () => status === "submitted" || status === "streaming",
    [status]
  );

  /** ----------------------------
   * Persist history (unchanged)
   * ---------------------------- */
  useEffect(() => {
    saveChatHistory(messages as unknown as AIMessage[]);
  }, [messages]);

  /** ----------------------------
   * Scroll (like your old version)
   * ---------------------------- */
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const lastLenRef = useRef(0);

  useEffect(() => {
    // scroll when message count changes OR when loading starts/stops
    if (messages.length !== lastLenRef.current) {
      lastLenRef.current = messages.length;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  useEffect(() => {
    if (loading) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [loading]);

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
    sendMessage({
      text: trimmed,
      metadata: { language: lang }, // keep your metadata for RAG/lang routing
    });
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  /** Helper: render text for both {content} and {parts[]} messages */
  const renderMessageText = (m: any) => {
    if ("parts" in m && Array.isArray(m.parts)) {
      return m.parts.map((p: any, i: number) =>
        p.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
      );
    }
    return m.content;
  };

  /** ----------------------------
   * UI (structured like old version)
   * ---------------------------- */
  return (
    <div className="flex flex-col h-full text-sm text-gray-900">
      {/* messages container */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 bg-gray-50 p-3 rounded-lg">
        {/* Use your existing message components (keeps streaming formatting consistent) */}
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((m) => (
              <Message key={m.id} from={m.role as any}>
                <MessageContent>
                  <MessageResponse>
                    {renderMessageText(m as any)}
                  </MessageResponse>
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

            {/* If you prefer the original Loader, uncomment and remove the pulse block above */}
            {/* {loading && <Loader />} */}

            <div ref={messagesEndRef} />
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* controls (language + clear) */}
      <div className="mt-3 ml-2  space-y-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-gray-500 bg-blue-50 rounded hover:text-gray-900"
            disabled={loading}
          >
            {UI[lang].clear}
          </button>

          {/* keep your PromptInputSelect, but matches old layout */}
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

        {/* input row (like old: input + send button) */}
        {/* prompt */}
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
              style={{
                lineHeight: "1.4",
              }}
            />

            <PromptInputSubmit
              status={status}
              disabled={loading || !input.trim()}
              className="shrink-0 self-center"
              onClick={(e) => {
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
