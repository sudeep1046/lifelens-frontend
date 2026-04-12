"use client";

import { useState } from "react";
import { orbitron } from "./fonts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Message = {
  role: "user" | "ai";
  content: any;
};

export default function ChatUI() {
  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // 🧠 Typing Animation
  const typeMessage = async (text: string, index: number) => {
    let current = "";

    for (let i = 0; i < text.length; i++) {
      current += text[i];

      setMessages((prev) => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index].content.doctor_response = current;
        }
        return [...updated];
      });

      await new Promise((res) => setTimeout(res, 10));
    }
  };

  // 📊 SAFE Chart Data
  const generateChartData = (glucose: number) => {
    if (typeof glucose !== "number") return [];

    return [
      { day: "Mon", value: glucose - 10 },
      { day: "Tue", value: glucose - 5 },
      { day: "Wed", value: glucose },
      { day: "Thu", value: glucose + 3 },
      { day: "Fri", value: glucose - 2 },
      { day: "Sat", value: glucose + 4 },
      { day: "Sun", value: glucose },
    ];
  };

  const handleSend = async () => {
    if (!input) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("question", input);

    try {
      const res = await fetch("https://lifelens-backend-7py9.onrender.com/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const aiIndex = messages.length + 1;

      const aiMessage: Message = {
        role: "ai",
        content: {
          ...data,
          doctor_response: "",
        },
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Typing animation
      typeMessage(data.doctor_response || "", aiIndex);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: { error: "Backend error" },
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_60%)]" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Header */}
      <div className="relative z-10 p-6 text-center border-b border-white/10">
        <h1 className={`${orbitron.className} text-3xl tracking-widest text-purple-400`}>
          LIFELENS AI
        </h1>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 relative z-10">

        {messages.map((msg, index) => {
          if (msg.role === "user") {
            return (
              <div
                key={index}
                className="max-w-xl ml-auto p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {msg.content}
              </div>
            );
          }

          const data = msg.content;

          if (data?.error) {
            return (
              <div key={index} className="bg-red-500/20 p-3 rounded-xl">
                {data.error}
              </div>
            );
          }

          const medical = data?.medical_data || {};

          return (
            <div
              key={index}
              className="max-w-xl bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-2xl space-y-4"
            >
              {/* Health Score */}
              <div className="text-center">
                <p className="text-gray-400 text-xs">Health Score</p>
                <h2 className="text-3xl text-green-400 font-semibold">
                  {data?.health_score || "N/A"}
                </h2>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Metric label="Glucose" value={medical.glucose ?? "N/A"} />
                <Metric label="Diabetes Risk" value={medical.diabetes_risk ?? "N/A"} />
                <Metric label="Hemoglobin" value={medical.hemoglobin ?? "N/A"} />
                <Metric label="Anemia Risk" value={medical.anemia_risk ?? "N/A"} />
              </div>

              {/* Chart (SAFE) */}
              {typeof medical.glucose === "number" && (
                <div className="h-40 mt-4">
                  <p className="text-gray-400 text-xs mb-2 text-center">
                    Glucose Trend
                  </p>

                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateChartData(medical.glucose)}>
                      <XAxis dataKey="day" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#a855f7"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* AI Response */}
              <div style={{ whiteSpace: "pre-wrap" }}>
                {data?.doctor_response || "..."}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="bg-white/10 p-3 rounded-xl w-fit">
            AI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 backdrop-blur-xl relative z-10">
        <div className="flex gap-2 max-w-3xl mx-auto">

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm"
          />

          <input
            type="text"
            placeholder="Ask your health question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 bg-white/10 rounded-lg outline-none"
          />

          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white/5 p-3 rounded-lg text-center">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
}