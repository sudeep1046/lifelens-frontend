"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const cleanText = (text: string) => {
    return text.replace(/\*\*/g, "");
  };

  const handleSend = async () => {
    if (!question) return;

    setLoading(true);
    setResponse("");

    try {
      const formData = new FormData();
      formData.append("question", question);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setResponse(data.doctor_response);
    } catch (error) {
      setResponse("Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#a855f7" }}>
        LIFELENS AI
      </h1>

      {/* Chat Output */}
      <div
        style={{
          marginTop: "40px",
          background: "#111",
          padding: "20px",
          borderRadius: "10px",
          minHeight: "200px",
        }}
      >
        {loading ? (
          <p>Thinking...</p>
        ) : (
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}
          >
            {cleanText(response)}
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your health question..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "10px 20px",
            background: "#9333ea",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}