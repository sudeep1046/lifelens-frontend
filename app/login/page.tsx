"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/chat");
  }, []);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/login" : "/signup";

      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // LOGIN SUCCESS
      if (isLogin && data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/chat");
      }

      // SIGNUP SUCCESS
      else if (!isLogin) {
        alert("Account created! Please login.");
        setIsLogin(true);
      }

      else {
        setError(data.detail || "Something went wrong");
      }

    } catch {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-950">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-[350px]">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Create Account"}
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span
            className="text-green-400 cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}