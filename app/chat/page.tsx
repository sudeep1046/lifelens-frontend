"use client";

import Chatbot from "@/components/Chatbot";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950 flex flex-col">

      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          <span className="text-green-400">LifeLens</span> AI Chat
        </h1>
        <p className="text-gray-400 mt-2">
          Your AI-powered health assistant
        </p>
      </div>

      {/* Chatbot */}
      <div className="flex-1 flex items-center justify-center px-4 pb-10">
        <Chatbot />
      </div>

    </div>
  );
}