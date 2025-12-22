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
    thinking: "Réflexion...",
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

/** ✅ Welcome text per language */
const WELCOME_TEXT: Record<ChatLanguage, string> = {
  en: "Hi! I’m your LuxAI automation assistant for Lux AI Consultancy & Automation. I can help you with AI integration, automation, workflows, system integrations, and our services. Feel free to ask anything.",
  fr: "Hi! I’m your LuxAI automation assistant for Lux AI Consultancy & Automation. I can help you with AI integration, automation, workflows, system integrations, and our services. Feel free to ask anything.",
  de: "Hallo! Ich bin Ihr KI-Automatisierungsassistent für KindFlow Automation. Fragen Sie alles zu KI-Integration, Automatisierung, Workflows oder Systemintegrationen.",
  lb: "Moien! Ech sinn Ären AI-Automatiséierungsassistent fir KindFlow Automation. Dir kënnt mir gären Froen zu AI-Integratioun, Automatiséierung, Workflows oder Systemintegratiounen stellen.",
};

/** build welcome message for a given language */
function makeWelcome(lang: ChatLanguage): SafeMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: WELCOME_TEXT[lang] ?? WELCOME_TEXT.en,
    metadata: { language: lang },
  };
}

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
    id: String(
      m?.id ?? globalThis.crypto?.randomUUID?.() ?? Date.now().toString()
    ),
    role,
    content,
    metadata: m?.metadata?.language
      ? { language: m.metadata.language }
      : undefined,
  };
}

export default function Chatbot() {
  /** state */
  const [lang, setLang] = useState<ChatLanguage>("en");
  const [input, setInput] = useState("");

  /** ✅ keep focus like GPT */
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  /** ✅ track when header menu is open (via body attribute) */
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const read = () =>
      setMenuOpen(document.body.hasAttribute("data-menu-open"));

    // initial
    read();

    // observe changes
    const obs = new MutationObserver(read);
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-menu-open"],
    });

    return () => obs.disconnect();
  }, []);

  /** load safe history once */
  const [initialMessages] = useState<SafeMessage[]>(() => {
    const saved = loadChatHistory();
    return saved.length ? saved : [makeWelcome("en")];
  });

  /**
   * AI SDK chat
   */
  const { messages, sendMessage, status, setMessages } = useChat({
    api: "/api/chat" as any,
    initialMessages: initialMessages as any,
  } as any);

  const loading = useMemo(
    () => status === "submitted" || status === "streaming",
    [status]
  );

  /**
   * ✅ Ensure welcome message is always present in runtime messages.
   */
  useEffect(() => {
    const hasWelcome =
      Array.isArray(messages) &&
      (messages as any[]).some((m) => String(m?.id) === "welcome");

    if (!hasWelcome) {
      setMessages(([makeWelcome(lang)] as any[]).concat(messages as any[]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ✅ When language changes, update the existing welcome message text */
  useEffect(() => {
    setMessages((prev: any[]) => {
      if (!Array.isArray(prev) || prev.length === 0) return prev;

      const next = prev.map((m) => {
        if (String(m?.id) !== "welcome") return m;

        return {
          ...m,
          role: "assistant",
          content: WELCOME_TEXT[lang] ?? WELCOME_TEXT.en,
          metadata: { ...(m?.metadata ?? {}), language: lang },
          parts: undefined,
        };
      });

      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  /** keep last safe messages in a ref so we can save on unmount */
  const latestSafeRef = useRef<SafeMessage[]>(initialMessages);

  /** persist safe history whenever messages change */
  useEffect(() => {
    const safe = (messages as any[])
      .map(toSafe)
      .filter((m) => m.content.length > 0);

    const hasWelcome = safe.some((m) => m.id === "welcome");
    const safeWithWelcome = hasWelcome ? safe : [makeWelcome(lang), ...safe];

    latestSafeRef.current = safeWithWelcome;
    saveChatHistory(safeWithWelcome);
  }, [messages, lang]);

  /** ✅ save once more on unmount */
  useEffect(() => {
    return () => {
      saveChatHistory(latestSafeRef.current);
    };
  }, []);

  /** optionally sync language selector from last user message metadata */
  useEffect(() => {
    const last = (messages as any[])
      ?.slice()
      .reverse()
      .find((m) => m?.role === "user");
    const lastLang = last?.metadata?.language;
    if (lastLang && ["en", "fr", "de", "lb"].includes(lastLang)) {
      setLang(lastLang);
    }
  }, [messages]);

  // ✅ scroll INSIDE the chat panel, not the page
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const lastLenRef = useRef(0);

  function isKeyboardLikelyOpen() {
    const vv = window.visualViewport;
    if (!vv) return false;
    const ratio = vv.height / window.innerHeight;
    return ratio < 0.78;
  }

  function scrollToBottom(mode: ScrollBehavior) {
    const el = scrollAreaRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: mode,
    });
  }

  useEffect(() => {
    const len = messages?.length ?? 0;
    if (len !== lastLenRef.current) {
      lastLenRef.current = len;
      scrollToBottom(isKeyboardLikelyOpen() ? "auto" : "smooth");
    }
  }, [messages?.length]);

  useEffect(() => {
    if (!loading) return;
    scrollToBottom(isKeyboardLikelyOpen() ? "auto" : "smooth");
  }, [loading]);

  /** actions */
  const onClear = () => {
    clearChatHistory();
    setMessages([makeWelcome(lang)] as any);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onSend = () => {
    const trimmed = input.trim();

    // ✅ if menu is open, do nothing (menu should have priority)
    if (menuOpen) return;

    if (!trimmed || loading) {
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    setInput("");

    sendMessage({
      text: trimmed,
      metadata: { language: lang },
    } as any);

    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (loading) return;
      if (menuOpen) return;
      e.preventDefault();
      onSend();
    }
  };

  /** render helper */
  const renderMessageText = (m: any) => {
    if (m?.parts && Array.isArray(m.parts)) {
      return m.parts.map((p: any, i: number) =>
        p?.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
      );
    }
    return m?.content ?? "";
  };

  /**
   * ✅ KEY REFINEMENT:
   * When the header menu overlay is open, disable interactions with chat
   * so the menu always "wins" on tap/click (no fighting with z-index).
   */
  return (
    <div
      className={[
        "flex flex-col h-full text-sm text-gray-900 dark:text-slate-100",
        menuOpen ? "pointer-events-none select-none" : "",
      ].join(" ")}
      aria-hidden={menuOpen ? "true" : "false"}
    >
      <div
        ref={scrollAreaRef}
        className="flex-1 min-h-0 overflow-y-auto space-y-3 bg-gray-50 dark:bg-slate-900 p-3 rounded-lg"
      >
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
                <div className="inline-block px-3 py-2 rounded-xl bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-slate-100 animate-pulse">
                  {UI[lang].thinking}
                </div>
              </div>
            )}
          </ConversationContent>

          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* controls (language + clear) */}
      <div className="mt-3 space-y-2 ml-2">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
            disabled={loading || menuOpen}
          >
            {UI[lang].clear}
          </button>

          <PromptInputSelect
            value={lang}
            onValueChange={(v) => setLang(v as ChatLanguage)}
            disabled={loading || menuOpen}
          >
            <PromptInputSelectTrigger
              className="
                h-9 w-[10rem] px-3 mr-1
                rounded-lg
                border border-gray-200 dark:border-slate-700
                bg-white dark:bg-slate-800
                text-sm text-gray-700 dark:text-gray-200
                shadow-none
                hover:bg-[#1967D2] hover:text-white dark:hover:bg-slate-700/40
                hover:border-gray-300 dark:hover:border-slate-600
                focus:outline-none focus:ring-2 focus:ring-[#1967D2]/25
                data-[state=open]:ring-2 data-[state=open]:ring-[#1967D2]/25
                transition-colors
              "
            >
              <PromptInputSelectValue placeholder="English" />
            </PromptInputSelectTrigger>

            <PromptInputSelectContent
              className="
                z-[210000] mt-1 min-w-[170px]
                rounded-lg
                border border-gray-200 dark:border-slate-700
                bg-white dark:bg-slate-800
                text-sm
                shadow-lg
                p-2
                overflow-hidden
              "
            >
              <div className="grid gap-1">
                {LANGUAGES.map((l) => (
                  <PromptInputSelectItem
                    key={l.code}
                    value={l.code}
                    className="
                      relative
                      flex items-center
                      rounded-md
                      px-3 py-2
                      text-sm
                      select-none
                      cursor-pointer
                      outline-none
                      transition-colors
                      text-gray-700 dark:text-gray-200
                      data-[state=checked]:bg-gray-100
                      data-[state=checked]:text-gray-900
                      data-[state=checked]:font-medium
                      dark:data-[state=checked]:bg-slate-700/50
                      dark:data-[state=checked]:text-gray-100
                      data-[highlighted]:bg-[#1967D2]
                      data-[highlighted]:text-white
                      data-[state=checked]:data-[highlighted]:bg-[#1967D2]
                      data-[state=checked]:data-[highlighted]:text-white
                    "
                  >
                    {l.label}
                  </PromptInputSelectItem>
                ))}
              </div>
            </PromptInputSelectContent>
          </PromptInputSelect>
        </div>

        {/* input row */}
        <div className="mt-2 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2">
          <div className="flex items-center gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={onKeyDown}
              onFocus={() => {
                requestAnimationFrame(() => scrollToBottom("auto"));
              }}
              disabled={false}
              placeholder={UI[lang].placeholder}
              rows={1}
              className="
                flex-1
                resize-none
                rounded-lg
                border border-gray-300 dark:border-slate-700
                bg-white dark:bg-slate-950
                px-3 py-2
                text-sm
                text-gray-900 dark:text-slate-100
                outline-none
                focus:ring-2 focus:ring-blue-500
                max-h-[96px]
                overflow-y-auto
              "
              style={{ lineHeight: "1.4" }}
            />

            <PromptInputSubmit
              status={status as any}
              disabled={loading || menuOpen || !input.trim()}
              className="shrink-0 self-center"
              onMouseDown={(e: any) => {
                e.preventDefault();
              }}
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

// "use client";

// import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
// import { useChat } from "@ai-sdk/react";

// import {
//   PromptInputSelect,
//   PromptInputSelectContent,
//   PromptInputSelectItem,
//   PromptInputSelectTrigger,
//   PromptInputSelectValue,
//   PromptInputSubmit,
// } from "@/components/ai-elements/prompt-input";

// import {
//   Message,
//   MessageContent,
//   MessageResponse,
// } from "@/components/ai-elements/message";
// import {
//   Conversation,
//   ConversationContent,
//   ConversationScrollButton,
// } from "@/components/ai-elements/conversation";

// import {
//   loadChatHistory,
//   saveChatHistory,
//   clearChatHistory,
//   type SafeMessage,
// } from "@/lib/chat-storage";

// import { LANGUAGES, type ChatLanguage } from "@/lib/languages";

// /** UI strings */
// const UI: Record<
//   ChatLanguage,
//   { placeholder: string; thinking: string; clear: string }
// > = {
//   en: {
//     placeholder: "Ask about AI integration or automation...",
//     thinking: "Thinking...",
//     clear: "Clear chat",
//   },
//   fr: {
//     placeholder: "Demandez sur l'integration IA ou l'automatisation...",
//     thinking: "Réflexion...",
//     clear: "Effacer",
//   },
//   de: {
//     placeholder: "Fragen Sie zu KI-Integration oder Automatisierung...",
//     thinking: "Denke...",
//     clear: "Leeren",
//   },
//   lb: {
//     placeholder: "Frot iwer AI-Integratioun oder Automatisatioun...",
//     thinking: "Ech denken...",
//     clear: "Eidel maachen",
//   },
// };

// /** ✅ Welcome text per language */
// const WELCOME_TEXT: Record<ChatLanguage, string> = {
//   en: "Hi! I’m your LuxAI automation assistant for Lux AI Consultancy & Automation. I can help you with AI integration, automation, workflows, system integrations, and our services. Feel free to ask anything.",
//   fr: "Hi! I’m your LuxAI automation assistant for Lux AI Consultancy & Automation. I can help you with AI integration, automation, workflows, system integrations, and our services. Feel free to ask anything.",
//   de: "Hallo! Ich bin Ihr KI-Automatisierungsassistent für KindFlow Automation. Fragen Sie alles zu KI-Integration, Automatisierung, Workflows oder Systemintegrationen.",
//   lb: "Moien! Ech sinn Ären AI-Automatiséierungsassistent fir KindFlow Automation. Dir kënnt mir gären Froen zu AI-Integratioun, Automatiséierung, Workflows oder Systemintegratiounen stellen.",
// };

// /** build welcome message for a given language */
// function makeWelcome(lang: ChatLanguage): SafeMessage {
//   return {
//     id: "welcome",
//     role: "assistant",
//     content: WELCOME_TEXT[lang] ?? WELCOME_TEXT.en,
//     metadata: { language: lang },
//   };
// }

// /** Extracts readable text from either `content` or `parts[]` messages */
// function extractText(m: any): string {
//   if (typeof m?.content === "string") return m.content;

//   if (Array.isArray(m?.parts)) {
//     return m.parts
//       .filter((p: any) => p?.type === "text" && typeof p?.text === "string")
//       .map((p: any) => p.text)
//       .join("");
//   }

//   return "";
// }

// /** Convert any AI-SDK message shape into SafeMessage for persistence */
// function toSafe(m: any): SafeMessage {
//   const role = (m?.role ?? "assistant") as SafeMessage["role"];
//   const content = extractText(m);

//   return {
//     id: String(
//       m?.id ?? globalThis.crypto?.randomUUID?.() ?? Date.now().toString()
//     ),
//     role,
//     content,
//     metadata: m?.metadata?.language
//       ? { language: m.metadata.language }
//       : undefined,
//   };
// }

// export default function Chatbot() {
//   /** state */
//   const [lang, setLang] = useState<ChatLanguage>("en");
//   const [input, setInput] = useState("");

//   /** ✅ keep focus like GPT */
//   const inputRef = useRef<HTMLTextAreaElement | null>(null);

//   /** load safe history once */
//   const [initialMessages] = useState<SafeMessage[]>(() => {
//     const saved = loadChatHistory();
//     // if nothing saved, start with welcome in default language
//     return saved.length ? saved : [makeWelcome("en")];
//   });

//   /**
//    * AI SDK chat
//    */
//   const { messages, sendMessage, status, setMessages } = useChat({
//     api: "/api/chat" as any,
//     initialMessages: initialMessages as any,
//   } as any);

//   const loading = useMemo(
//     () => status === "submitted" || status === "streaming",
//     [status]
//   );

//   /**
//    * ✅ Ensure welcome message is always present in runtime messages.
//    */
//   useEffect(() => {
//     const hasWelcome =
//       Array.isArray(messages) &&
//       (messages as any[]).some((m) => String(m?.id) === "welcome");

//     if (!hasWelcome) {
//       setMessages(([makeWelcome(lang)] as any[]).concat(messages as any[]));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /** ✅ When language changes, update the existing welcome message text */
//   useEffect(() => {
//     setMessages((prev: any[]) => {
//       if (!Array.isArray(prev) || prev.length === 0) return prev;

//       const next = prev.map((m) => {
//         if (String(m?.id) !== "welcome") return m;

//         // keep shape but update text + metadata
//         return {
//           ...m,
//           role: "assistant",
//           content: WELCOME_TEXT[lang] ?? WELCOME_TEXT.en,
//           metadata: { ...(m?.metadata ?? {}), language: lang },
//           parts: undefined, // ensure text shows consistently if parts existed
//         };
//       });

//       return next;
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [lang]);

//   /** keep last safe messages in a ref so we can save on unmount */
//   const latestSafeRef = useRef<SafeMessage[]>(initialMessages);

//   /** persist safe history whenever messages change */
//   useEffect(() => {
//     const safe = (messages as any[])
//       .map(toSafe)
//       .filter((m) => m.content.length > 0);

//     // ✅ always include welcome at top if missing
//     const hasWelcome = safe.some((m) => m.id === "welcome");
//     const safeWithWelcome = hasWelcome ? safe : [makeWelcome(lang), ...safe];

//     latestSafeRef.current = safeWithWelcome;
//     saveChatHistory(safeWithWelcome);
//   }, [messages, lang]);

//   /** ✅ save once more on unmount (closing widget unmounts component) */
//   useEffect(() => {
//     return () => {
//       saveChatHistory(latestSafeRef.current);
//     };
//   }, []);

//   /** optionally sync language selector from last user message metadata */
//   useEffect(() => {
//     const last = (messages as any[])
//       ?.slice()
//       .reverse()
//       .find((m) => m?.role === "user");
//     const lastLang = last?.metadata?.language;
//     if (lastLang && ["en", "fr", "de", "lb"].includes(lastLang)) {
//       setLang(lastLang);
//     }
//   }, [messages]);

//   // /** scrolling */
//   // const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const lastLenRef = useRef(0);

//   // useEffect(() => {
//   //   if ((messages?.length ?? 0) !== lastLenRef.current) {
//   //     lastLenRef.current = messages.length;
//   //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   //   }
//   // }, [messages?.length]);

//   // useEffect(() => {
//   //   if (loading) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   // }, [loading]);

//   // ✅ scroll INSIDE the chat panel, not the page
//   const scrollAreaRef = useRef<HTMLDivElement | null>(null);

//   function isKeyboardLikelyOpen() {
//     // visualViewport is the only reliable signal on mobile
//     const vv = window.visualViewport;
//     if (!vv) return false;

//     // when keyboard opens, visual viewport height shrinks a lot
//     const ratio = vv.height / window.innerHeight;
//     return ratio < 0.78;
//   }

//   function scrollToBottom(mode: ScrollBehavior) {
//     const el = scrollAreaRef.current;
//     if (!el) return;

//     el.scrollTo({
//       top: el.scrollHeight,
//       behavior: mode,
//     });
//   }

//   useEffect(() => {
//     const len = messages?.length ?? 0;
//     if (len !== lastLenRef.current) {
//       lastLenRef.current = len;

//       // ✅ if keyboard open => NO smooth (prevents the jump)
//       scrollToBottom(isKeyboardLikelyOpen() ? "auto" : "smooth");
//     }
//   }, [messages?.length]);

//   useEffect(() => {
//     if (!loading) return;

//     // while streaming, keep it pinned but NEVER smooth on mobile keyboard
//     scrollToBottom(isKeyboardLikelyOpen() ? "auto" : "smooth");
//   }, [loading]);

//   /** actions */
//   const onClear = () => {
//     clearChatHistory();
//     setMessages([makeWelcome(lang)] as any);
//     // keep focus
//     requestAnimationFrame(() => inputRef.current?.focus());
//   };

//   const onSend = () => {
//     const trimmed = input.trim();

//     // ✅ GPT-like: allow typing while loading, but do NOT allow sending
//     if (!trimmed || loading) {
//       // keep focus even if blocked
//       requestAnimationFrame(() => inputRef.current?.focus());
//       return;
//     }

//     setInput("");

//     sendMessage({
//       text: trimmed,
//       metadata: { language: lang },
//     } as any);

//     // ✅ immediately focus again so user can keep typing while streaming
//     requestAnimationFrame(() => inputRef.current?.focus());
//   };

//   const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       // ✅ While loading: DO NOT block typing. Let Enter add a newline.
//       if (loading) return;

//       e.preventDefault();
//       onSend();
//     }
//   };

//   /** render helper */
//   const renderMessageText = (m: any) => {
//     if (m?.parts && Array.isArray(m.parts)) {
//       return m.parts.map((p: any, i: number) =>
//         p?.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
//       );
//     }
//     return m?.content ?? "";
//   };

//   /** UI */
//   return (
//     <div className="flex flex-col h-full text-sm text-gray-900 dark:text-slate-100">
//       {/* messages container */}
//       {/* <div className="flex-1 min-h-0 overflow-y-auto space-y-3 bg-gray-50 dark:bg-slate-900 p-3 rounded-lg"> */}
//       <div
//         ref={scrollAreaRef}
//         className="flex-1 min-h-0 overflow-y-auto space-y-3 bg-gray-50 dark:bg-slate-900 p-3 rounded-lg"
//       >
//         <Conversation className="h-full">
//           <ConversationContent>
//             {(messages as any[]).map((m) => (
//               <Message key={m.id} from={m.role as any}>
//                 <MessageContent>
//                   <MessageResponse>{renderMessageText(m)}</MessageResponse>
//                 </MessageContent>
//               </Message>
//             ))}

//             {loading && (
//               <div className="text-left">
//                 <div className="inline-block px-3 py-2 rounded-xl bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-slate-100 animate-pulse">
//                   {UI[lang].thinking}
//                 </div>
//               </div>
//             )}

//             {/* <div ref={messagesEndRef} /> */}
//           </ConversationContent>

//           <ConversationScrollButton />
//         </Conversation>
//       </div>

//       {/* controls (language + clear) */}
//       <div className="mt-3 space-y-2 ml-2">
//         <div className="flex items-center justify-between gap-3">
//           <button
//             type="button"
//             onClick={onClear}
//             className="text-xs text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
//             disabled={loading}
//           >
//             {UI[lang].clear}
//           </button>

//           <PromptInputSelect
//             value={lang}
//             onValueChange={(v) => setLang(v as ChatLanguage)}
//             disabled={loading}
//           >
//             <PromptInputSelectTrigger
//               className="
//       h-9 w-[10rem] px-3 mr-1
//       rounded-lg
//       border border-gray-200 dark:border-slate-700
//       bg-white dark:bg-slate-800
//       text-sm text-gray-700 dark:text-gray-200
//       shadow-none

//       hover:bg-[#1967D2] hover:text-white dark:hover:bg-slate-700/40
//       hover:border-gray-300 dark:hover:border-slate-600

//       focus:outline-none focus:ring-2 focus:ring-[#1967D2]/25
//       data-[state=open]:ring-2 data-[state=open]:ring-[#1967D2]/25
//       transition-colors
//     "
//             >
//               <PromptInputSelectValue placeholder="English" />
//             </PromptInputSelectTrigger>

//             {/* Dropdown panel */}
//             <PromptInputSelectContent
//               className="
//       z-[999] mt-1 min-w-[170px]
//       rounded-lg
//       border border-gray-200 dark:border-slate-700
//       bg-white dark:bg-slate-800
//       text-sm
//       shadow-lg
//       p-2
//       overflow-hidden
//     "
//             >
//               <div className="grid gap-1">
//                 {LANGUAGES.map((l) => (
//                   <PromptInputSelectItem
//                     key={l.code}
//                     value={l.code}
//                     className="
//             relative
//             flex items-center
//             rounded-md
//             px-3 py-2
//             text-sm
//             select-none
//             cursor-pointer
//             outline-none
//             transition-colors

//             text-gray-700 dark:text-gray-200

//             /* ✅ selected row: subtle (NOT blue), like native select */
//             data-[state=checked]:bg-gray-100
//             data-[state=checked]:text-gray-900
//             data-[state=checked]:font-medium
//             dark:data-[state=checked]:bg-slate-700/50
//             dark:data-[state=checked]:text-gray-100

//             /* ✅ hover / keyboard highlight: ONLY this becomes blue */
//             data-[highlighted]:bg-[#1967D2]
//             data-[highlighted]:text-white

//             /* ✅ if selected row is highlighted, it will be blue (because highlighted) */
//             data-[state=checked]:data-[highlighted]:bg-[#1967D2]
//             data-[state=checked]:data-[highlighted]:text-white
//           "
//                   >
//                     {l.label}
//                   </PromptInputSelectItem>
//                 ))}
//               </div>
//             </PromptInputSelectContent>
//           </PromptInputSelect>
//         </div>

//         {/* input row */}
//         <div className="mt-2 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2">
//           <div className="flex items-center gap-2">
//             <textarea
//               ref={inputRef}
//               value={input}
//               onChange={(e) => setInput(e.currentTarget.value)}
//               onKeyDown={onKeyDown}
//               onFocus={() => {
//                 requestAnimationFrame(() => scrollToBottom("auto"));
//               }}
//               // ✅ allow typing always
//               disabled={false}
//               placeholder={UI[lang].placeholder}
//               rows={1}
//               className="
//                 flex-1
//                 resize-none
//                 rounded-lg
//                 border border-gray-300 dark:border-slate-700
//                 bg-white dark:bg-slate-950
//                 px-3 py-2
//                 text-sm
//                 text-gray-900 dark:text-slate-100
//                 outline-none
//                 focus:ring-2 focus:ring-blue-500
//                 max-h-[96px]
//                 overflow-y-auto
//               "
//               style={{ lineHeight: "1.4" }}
//             />

//             <PromptInputSubmit
//               status={status as any}
//               // ✅ still block submit while loading
//               disabled={loading || !input.trim()}
//               className="shrink-0 self-center"
//               onMouseDown={(e: any) => {
//                 // ✅ prevent focus loss (important in some UI libs)
//                 e.preventDefault();
//               }}
//               onClick={(e: any) => {
//                 e.preventDefault();
//                 onSend();
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
// import { useChat } from "@ai-sdk/react";

// import {
//   PromptInputSelect,
//   PromptInputSelectContent,
//   PromptInputSelectItem,
//   PromptInputSelectTrigger,
//   PromptInputSelectValue,
//   PromptInputSubmit,
// } from "@/components/ai-elements/prompt-input";

// import {
//   Message,
//   MessageContent,
//   MessageResponse,
// } from "@/components/ai-elements/message";
// import {
//   Conversation,
//   ConversationContent,
//   ConversationScrollButton,
// } from "@/components/ai-elements/conversation";

// import {
//   loadChatHistory,
//   saveChatHistory,
//   clearChatHistory,
//   type SafeMessage,
// } from "@/lib/chat-storage";

// import { LANGUAGES, type ChatLanguage } from "@/lib/languages";

// /** UI strings */
// const UI: Record<
//   ChatLanguage,
//   { placeholder: string; thinking: string; clear: string }
// > = {
//   en: {
//     placeholder: "Ask about AI integration or automation...",
//     thinking: "Thinking...",
//     clear: "Clear chat",
//   },
//   fr: {
//     placeholder: "Demandez sur l'integration IA ou l'automatisation...",
//     thinking: "Reflexion...",
//     clear: "Effacer",
//   },
//   de: {
//     placeholder: "Fragen Sie zu KI-Integration oder Automatisierung...",
//     thinking: "Denke...",
//     clear: "Leeren",
//   },
//   lb: {
//     placeholder: "Frot iwer AI-Integratioun oder Automatisatioun...",
//     thinking: "Ech denken...",
//     clear: "Eidel maachen",
//   },
// };

// const WELCOME: SafeMessage = {
//   id: "welcome",
//   role: "assistant",
//   content:
//     "Hi! I’m your AI automation assistant for KindFlow Automation. Ask anything about AI integration, automation, workflows, or system integrations.",
// };

// /** Extracts readable text from either `content` or `parts[]` messages */
// function extractText(m: any): string {
//   if (typeof m?.content === "string") return m.content;

//   if (Array.isArray(m?.parts)) {
//     return m.parts
//       .filter((p: any) => p?.type === "text" && typeof p?.text === "string")
//       .map((p: any) => p.text)
//       .join("");
//   }

//   return "";
// }

// /** Convert any AI-SDK message shape into SafeMessage for persistence */
// function toSafe(m: any): SafeMessage {
//   const role = (m?.role ?? "assistant") as SafeMessage["role"];
//   const content = extractText(m);

//   return {
//     id: String(m?.id ?? (globalThis.crypto?.randomUUID?.() ?? Date.now().toString())),
//     role,
//     content,
//     metadata: m?.metadata?.language ? { language: m.metadata.language } : undefined,
//   };
// }

// export default function Chatbot() {
//   /** state */
//   const [lang, setLang] = useState<ChatLanguage>("en");
//   const [input, setInput] = useState("");

//   /** load safe history once */
//   const [initialMessages] = useState<SafeMessage[]>(() => {
//     const saved = loadChatHistory();
//     return saved.length ? saved : [WELCOME];
//   });

//   /**
//    * AI SDK chat
//    * - We pass SafeMessage[] as initialMessages (works; it's serializable)
//    * - Some SDK versions have strict typing; runtime supports it.
//    */
//   const { messages, sendMessage, status, setMessages } = useChat({
//     api: "/api/chat" as any,
//     initialMessages: initialMessages as any,
//   } as any);

//   const loading = useMemo(
//     () => status === "submitted" || status === "streaming",
//     [status]
//   );

//   /** persist safe history whenever messages change */
//   useEffect(() => {
//     // Convert SDK messages -> safe messages before saving
//     const safe = (messages as any[]).map(toSafe).filter((m) => m.content.length > 0);
//     saveChatHistory(safe as any);
//   }, [messages]);

//   /** optionally sync language selector from last user message metadata */
//   useEffect(() => {
//     const last = (messages as any[])?.slice().reverse().find((m) => m?.role === "user");
//     const lastLang = last?.metadata?.language;
//     if (lastLang && (lastLang === "en" || lastLang === "fr" || lastLang === "de" || lastLang === "lb")) {
//       setLang(lastLang);
//     }
//   }, [messages]);

//   /** scrolling */
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const lastLenRef = useRef(0);

//   useEffect(() => {
//     if ((messages?.length ?? 0) !== lastLenRef.current) {
//       lastLenRef.current = messages.length;
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages?.length]);

//   useEffect(() => {
//     if (loading) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [loading]);

//   /** actions */
//   const onClear = () => {
//     clearChatHistory();
//     setMessages([WELCOME] as any);
//   };

//   const onSend = () => {
//     const trimmed = input.trim();
//     if (!trimmed || loading) return;

//     setInput("");

//     sendMessage({
//       text: trimmed,
//       metadata: { language: lang },
//     } as any);
//   };

//   const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   };

//   /** render helper */
//   const renderMessageText = (m: any) => {
//     // Prefer parts text if present
//     if (m?.parts && Array.isArray(m.parts)) {
//       return m.parts.map((p: any, i: number) =>
//         p?.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
//       );
//     }
//     return m?.content ?? "";
//   };

//   /** UI */
//   return (
//     <div className="flex flex-col h-full text-sm text-gray-900">
//       {/* messages container */}
//       <div className="flex-1 min-h-0 overflow-y-auto space-y-3 bg-gray-50 p-3 rounded-lg">
//         <Conversation className="h-full">
//           <ConversationContent>
//             {(messages as any[]).map((m) => (
//               <Message key={m.id} from={m.role as any}>
//                 <MessageContent>
//                   <MessageResponse>{renderMessageText(m)}</MessageResponse>
//                 </MessageContent>
//               </Message>
//             ))}

//             {loading && (
//               <div className="text-left">
//                 <div className="inline-block px-3 py-2 rounded-xl bg-gray-200 text-gray-800 animate-pulse">
//                   {UI[lang].thinking}
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </ConversationContent>

//           <ConversationScrollButton />
//         </Conversation>
//       </div>

//       {/* controls (language + clear) */}
//       <div className="mt-3 space-y-2 ml-2">
//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={onClear}
//             className="text-xs text-gray-500 hover:text-gray-900"
//             disabled={loading}
//           >
//             {UI[lang].clear}
//           </button>

//           <PromptInputSelect
//             value={lang}
//             onValueChange={(v) => setLang(v as ChatLanguage)}
//             disabled={loading}
//           >
//             <PromptInputSelectTrigger className="h-8 w-[180px] text-xs bg-white border border-gray-300 rounded-full">
//               <PromptInputSelectValue placeholder="English" />
//             </PromptInputSelectTrigger>

//             <PromptInputSelectContent className="bg-white border border-gray-200 shadow-lg">
//               {LANGUAGES.map((l) => (
//                 <PromptInputSelectItem key={l.code} value={l.code}>
//                   {l.label}
//                 </PromptInputSelectItem>
//               ))}
//             </PromptInputSelectContent>
//           </PromptInputSelect>
//         </div>

//         {/* input row */}
//         <div className="mt-2 border-t border-gray-200 bg-white px-3 py-2">
//           <div className="flex items-center gap-2">
//             <textarea
//               value={input}
//               onChange={(e) => setInput(e.currentTarget.value)}
//               onKeyDown={onKeyDown}
//               disabled={loading}
//               placeholder={UI[lang].placeholder}
//               rows={1}
//               className="
//                 flex-1
//                 resize-none
//                 rounded-lg
//                 border border-gray-300
//                 px-3 py-2
//                 text-sm
//                 text-gray-900
//                 outline-none
//                 focus:ring-2 focus:ring-blue-500
//                 max-h-[96px]
//                 overflow-y-auto
//               "
//               style={{ lineHeight: "1.4" }}
//             />

//             <PromptInputSubmit
//               status={status as any}
//               disabled={loading || !input.trim()}
//               className="shrink-0 self-center"
//               onClick={(e: any) => {
//                 e.preventDefault();
//                 onSend();
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
