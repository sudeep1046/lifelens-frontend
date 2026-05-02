"use client";

import { useState, useRef, useEffect } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ Smooth scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userInput },
    ]);

    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("question", userInput);

      // 🔥 WAKE UP RENDER (IMPORTANT)
      await fetch(BACKEND_URL);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000); // 20 sec

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Server not responding");
      }

      // 🔥 SAFE RESPONSE HANDLING
      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: text || "Invalid response from server",
          },
        ]);
        setLoading(false);
        return;
      }

      console.log("PARSED DATA:", data);

      const reply =
        data?.doctor_response ||
        data?.response ||
        "No response from AI";

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: reply },
      ]);

    } catch (error: any) {
      console.error("ERROR:", error);

      // 🔥 BETTER ERROR HANDLING
      let errorMessage = "⚠️ Something went wrong.";

      if (error.name === "AbortError") {
        errorMessage =
          "⏳ Server is waking up (Render cold start). Try again in 10–15 seconds.";
      } else {
        errorMessage =
          "⚠️ AI is temporarily unavailable. Please try again.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: errorMessage,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">

      <div className="bg-white rounded-2xl shadow-xl border h-[520px] flex flex-col overflow-hidden">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Ask anything about your health...
            </p>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm">
              AI is thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t flex items-center">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your health question..."
            className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}