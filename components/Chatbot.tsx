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

// import React, { useEffect, useRef, useState } from "react";

// export type Lang = "en" | "fr" | "de" | "lb";
// export type Message = {
//   role: "user" | "assistant" | "system";
//   content: string;
// };

// type ChatbotProps = {
//   messages: Message[];
//   setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
// };

// const UI: Record<
//   Lang,
//   { placeholder: string; send: string; thinking: string }
// > = {
//   en: {
//     placeholder: "Ask about AI integration or automation...",
//     send: "Send",
//     thinking: "Thinking...",
//   },
//   fr: {
//     placeholder: "Demandez sur l'integration IA ou l'automatisation...",
//     send: "Envoyer",
//     thinking: "Reflexion...",
//   },
//   de: {
//     placeholder: "Fragen Sie zu KI-Integration oder Automatisierung...",
//     send: "Senden",
//     thinking: "Denke...",
//   },
//   lb: {
//     placeholder: "Frot iwer AI-Integratioun oder Automatisatioun...",
//     send: "Schecken",
//     thinking: "Ech denken...",
//   },
// };

// export default function Chatbot({ messages, setMessages }: ChatbotProps) {
//   const [lang, setLang] = useState<Lang>("en");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   async function sendMessage() {
//     if (!input.trim() || loading) return;

//     const userMsg: Message = { role: "user", content: input.trim() };
//     const nextMessages = [...messages, userMsg];

//     setMessages(nextMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: nextMessages, lang }),
//       });

//       const data = await res.json().catch(() => ({}));

//       if (res.ok) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: data.assistant || "No response." },
//         ]);
//       } else {
//         const msg =
//           data?.error ||
//           `The AI service returned an error (status ${res.status}).`;

//         setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
//       }
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Network error. Please try again." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") sendMessage();
//   }

//   return (
//     <div className="flex flex-col h-full text-sm text-gray-900">
//       <div className="flex-1 overflow-y-auto space-y-3 bg-gray-50 p-3 rounded-lg">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={m.role === "user" ? "text-right" : "text-left"}
//           >
//             <div
//               className={`
//                 inline-block max-w-full md:max-w-[80%] px-3 py-2 rounded-xl shadow-sm
//                 whitespace-pre-wrap break-words
//                 ${
//                   m.role === "user"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white border border-gray-200 text-gray-900"
//                 }
//               `}
//             >
//               {m.content}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="text-left">
//             <div className="inline-block px-3 py-2 rounded-xl bg-gray-200 text-gray-800 animate-pulse">
//               {UI[lang].thinking}
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div className="mt-3 space-y-2">
//         <div className="flex justify-end">
//           <select
//             value={lang}
//             onChange={(e) => setLang(e.target.value as Lang)}
//             className="border border-gray-300 rounded-full px-3 py-1 text-xs bg-white"
//           >
//             <option value="en">English</option>
//             <option value="fr">Francais</option>
//             <option value="de">Deutsch</option>
//             <option value="lb">Letzebuergesch</option>
//           </select>
//         </div>

//         <div className="flex gap-2">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={onKeyDown}
//             className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             placeholder={UI[lang].placeholder}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
//           >
//             {loading ? "..." : UI[lang].send}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
