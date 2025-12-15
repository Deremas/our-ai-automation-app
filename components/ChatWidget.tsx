"use client";

import { useState } from "react";
import RAGChatBot from "./Chatbot"; // your RAGChatBot file

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-4000 w-[420px] max-w-[95vw] h-[73vh] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                🤖
              </span>
              <div className="leading-tight">
                <div className="font-semibold text-sm">MFG AI Assistant</div>
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
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-2 right-8 z-50 flex items-center gap-2 rounded-full shadow-xl bg-[#0E427E] text-white px-4 py-2 hover:bg-[#1F6DCC]"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        type="button"
      >
        <span className="text-xl" aria-hidden="true">
          AI
        </span>
        <span className="hidden sm:inline text-sm font-medium">
          {isOpen ? "Close" : "AI Chatbot"}
        </span>
      </button>
    </>
  );
}
