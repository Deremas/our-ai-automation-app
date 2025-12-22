"use client";

import { useState } from "react";
import RAGChatBot from "./Chatbot";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat panel */}
      <div
        className={[
          "fixed z-[400]",
          // ✅ mobile: constrain BOTH sides (prevents right overflow on Duo / Fold)
          "left-[max(1rem,env(safe-area-inset-left))]",
          "right-[max(1rem,env(safe-area-inset-right))]",

          // ✅ vertical position (panel sits above the button)
          "bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.25rem)]",

          // ✅ size (never exceed viewport)
          "w-auto",
          "max-w-[40rem]",
          "h-[min(73svh,calc(100svh-9rem))]",

          // ✅ desktop behavior (right aligned fixed width)
          "md:left-auto",
          "md:right-[max(1rem,env(safe-area-inset-right))]",
          "md:w-[40rem]",

          // ✅ styling
          "bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden",
          "overscroll-contain",

          isOpen ? "block" : "hidden",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              🤖
            </span>
            <div className="leading-tight">
              <div className="font-semibold text-sm">LuxAI Assistant</div>
              <div className="text-xs text-blue-100">
                AI integration • automation • workflows
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white text-xl leading-none px-1"
            aria-label="Close chat"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Chat */}
        <div className="flex-1 min-h-0 bg-slate-50">
          <RAGChatBot />
        </div>
      </div>
      {/* Floating button */}
      {/* <button
        onClick={() => setIsOpen((p) => !p)}
        className={[
          "fixed z-40",
          // ✅ also constrain safely (prevents tiny horizontal scrollbars)
          "right-[max(1.5rem,env(safe-area-inset-right))]",
          "bottom-[max(0.5rem,env(safe-area-inset-bottom))]",

          "flex items-center gap-2 rounded-full shadow-xl",
          "bg-accent-500 hover:bg-amber-500 text-white px-2 py-2",

          // ✅ prevent it from contributing to overflow on weird browsers
          "max-w-[calc(100svw-2rem)]",
        ].join(" ")}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        type="button"
      >
        <span
          className="flex items-center justify-center text-xl"
          aria-hidden="true"
        >
          <i className="ri-chat-1-line" />
        </span>

        <span className="hidden sm:inline text-sm font-medium">
          {isOpen ? "Close" : "LuxAI"}
        </span>
      </button> */}
      
      <button
        onClick={() => setIsOpen((p) => !p)}
        className={[
          "fixed z-40",
          "right-[max(1.5rem,env(safe-area-inset-right))]",
          "bottom-[max(0.5rem,env(safe-area-inset-bottom))]",
          "flex items-center gap-2 rounded-full shadow-xl",
          "bg-accent-500 hover:bg-amber-500 text-white px-3 py-2",
          "max-w-[calc(100svw-2rem)]",
        ].join(" ")}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        type="button"
      >
        <span
          className="flex items-center justify-center text-xl"
          aria-hidden="true"
        >
          <i className={isOpen ? "ri-close-line" : "ri-chat-1-line"} />
        </span>

        {/* Always visible on all screens */}
        <span className="text-sm font-medium leading-none">LuxAI</span>
      </button>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import RAGChatBot from "./Chatbot"; // your RAGChatBot file

// export default function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed bottom-20 right-5 z-4000 w-[420px] max-w-[95vw] h-[73vh] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//           {/* Header */}
//           <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//             <div className="flex items-center gap-2">
//               <span className="text-lg" aria-hidden="true">
//                 🤖
//               </span>
//               <div className="leading-tight">
//                 <div className="font-semibold text-sm">
//                   KindFlow AI Assistant
//                 </div>
//                 <div className="text-xs text-blue-100">
//                   AI integration • automation • workflows
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-white/80 hover:text-white text-xl leading-none px-1"
//               aria-label="Close chat"
//               type="button"
//             >
//               ×
//             </button>
//           </div>

//           {/* Chat */}
//           <div className="flex-1 min-h-0 bg-slate-50">
//             <RAGChatBot />
//           </div>
//         </div>
//       )}

//       {/* Floating button */}
//       <button
//         onClick={() => setIsOpen((p) => !p)}
//         className="fixed bottom-2 right-8 z-50 flex items-center gap-2 rounded-full shadow-xl bg-[#0E427E] text-white px-4 py-2 hover:bg-[#1F6DCC]"
//         aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
//         type="button"
//       >
//         <span className="text-xl" aria-hidden="true">
//           AI
//         </span>
//         <span className="hidden sm:inline text-sm font-medium">
//           {isOpen ? "Close" : "AI Chatbot"}
//         </span>
//       </button>
//     </>
//   );
// }
