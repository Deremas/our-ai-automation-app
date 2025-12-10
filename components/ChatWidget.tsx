// components/ChatWidget.tsx
"use client";

import { useState } from "react";
import Chatbot, { Message } from "./Chatbot";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI automation assistant. Ask anything about our services, workflows, tools, or how we can help your business run smarter.",
    },
  ]);

  function toggleWidget() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      {/* Chat popup window on the right side */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-[360px] max-w-[90vw] h-[480px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <div className="font-semibold text-sm">AI Assistant</div>
                <div className="text-xs text-blue-100">
                  Ask about automation & workflows
                </div>
              </div>
            </div>
            <button
              onClick={toggleWidget}
              className="text-white/80 hover:text-white text-xl leading-none px-1"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 min-h-0 p-3 bg-slate-50 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin">
            <Chatbot messages={messages} setMessages={setMessages} />
          </div>
        </div>
      )}

      {/* Floating toggle button bottom-right */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-1 right-4 z-50 flex items-center gap-2 rounded-full shadow-xl bg-[#0E427E] text-white px-4 py-3 hover:bg-[#1F6DCC] transition-transform transform hover:-translate-y-0.5"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        <span className="text-xl">🤖</span>
        <span className="hidden sm:inline text-sm font-medium">
          {isOpen ? "Close" : "AI Chatbot"}
        </span>
      </button>
    </>
  );
}

// // components/ChatWidget.tsx
// "use client";

// import { useState } from "react";
// import Chatbot from "./Chatbot";

// export default function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleWidget() {
//     setIsOpen((prev) => !prev);
//   }

//   return (
//     <>
//       {/* Chat popup window */}
//       {isOpen && (
//         <div className="fixed bottom-20 right-4 z-40 w-[360px] max-w-[90vw] h-[480px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//           {/* Header */}
//           <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
//             <div>
//               <div className="font-semibold text-sm">AI Assistant</div>
//               <div className="text-xs text-blue-100">
//                 Ask about automation, workflows, or tools
//               </div>
//             </div>
//             <button
//               onClick={toggleWidget}
//               className="text-white/80 hover:text-white text-xl leading-none px-1"
//               aria-label="Close chat"
//             >
//               ×
//             </button>
//           </div>

//           {/* Chat area */}
//           <div className="flex-1 min-h-0 p-3">
//             <Chatbot />
//           </div>
//         </div>
//       )}

//       {/* Floating toggle button bottom-right */}
//       <button
//         onClick={toggleWidget}
//         className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full shadow-xl bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5"
//         aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
//       >
//         <span className="text-xl">🤖</span>
//         <span className="hidden sm:inline text-sm font-medium">
//           {isOpen ? "Close" : "AI Assistant"}
//         </span>
//       </button>
//     </>
//   );
// }
