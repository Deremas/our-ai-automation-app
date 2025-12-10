"use client";

import React, { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant" | "system"; content: string };

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI automation assistant. Ask anything about our services, workflows, tools, or how we can help your business run smarter.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.assistant || "No response." },
        ]);
      } else {
        let errorText =
          data?.error ||
          `The AI service returned an error (status ${res.status}).`;

        // Optional: nicer message for quota errors
        if (
          typeof errorText === "string" &&
          errorText.toLowerCase().includes("quota exceeded")
        ) {
          errorText =
            "Our AI assistant has temporarily reached its usage limit. Please try again later.";
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errorText },
        ]);
      }
    } catch (err) {
      console.error("Chat frontend error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="flex flex-col h-full text-sm text-gray-900">
      {/* messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 bg-gray-50 p-3 rounded-lg">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={`
                inline-block max-w-full md:max-w-[80%] px-3 py-2 rounded-xl shadow-sm
                whitespace-pre-wrap break-words overflow-hidden
                ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }
              `}
            >
              {m.content}
            </div>
          </div>
        ))}

        {/* thinking indicator */}
        {loading && (
          <div className="text-left">
            <div className="inline-block px-3 py-2 rounded-xl bg-gray-200 text-gray-800 animate-pulse">
              Thinking…
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* input */}
      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 caret-blue-600 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Ask about automation or our services..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

// // components/Chatbot.tsx
// "use client";

// import React, { useEffect, useRef, useState } from "react";

// type Message = { role: "user" | "assistant" | "system"; content: string };

// export default function Chatbot() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content:
//         "Hi! I’m your AI automation assistant. Ask me about workflows, integrations, or how to automate your business.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

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
//         body: JSON.stringify({ messages: nextMessages }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: data.assistant },
//         ]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content:
//               data?.error ||
//               "Something went wrong with the AI response. Please try again.",
//           },
//         ]);
//       }
//     } catch (err) {
//       console.error("Chat frontend error:", err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Network error. Please check your connection and try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   }

//   return (
//     <div className="flex flex-col h-full">
//       {/* messages area */}
//       <div className="flex-1 min-h-0 space-y-3 overflow-auto mb-3 p-2 bg-gray-50 rounded">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={m.role === "user" ? "text-right" : "text-left"}
//           >
//             <div
//               className={`inline-block px-3 py-2 rounded-lg text-sm ${
//                 m.role === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {m.content}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* input area */}
//       <div className="flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={onKeyDown}
//           className="flex-1 border rounded px-3 py-2 text-sm"
//           placeholder="Describe what you want to automate..."
//           aria-label="Message input"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading || !input.trim()}
//           className="bg-black text-white px-3 py-2 rounded text-sm disabled:opacity-50"
//         >
//           {loading ? "..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }
