"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* 🌈 ANIMATED BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-blue-100 animate-gradient" />

      {/* GLOW BLOBS */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-green-400 opacity-20 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-400 opacity-20 blur-[140px] rounded-full animate-pulse" />

      <div className="relative z-10 px-6 py-10">

        {/* HEADER */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            Welcome back, Sid 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Your AI-powered health command center
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* AI CARD */}
          <div className="group bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition duration-300 hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              🤖 AI Assistant
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Get instant medical insights powered by AI
            </p>

            <Link href="/chat">
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition transform group-hover:scale-[1.02]">
                Open Chat
              </button>
            </Link>
          </div>

          {/* INSIGHTS */}
          <div className="group bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition duration-300 hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              🧠 Health Insights
            </h2>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>💧 Hydration: Good</p>
              <p>😴 Sleep: 7.5 hrs</p>
              <p>🔥 Activity: Moderate</p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="group bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition duration-300 hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              💊 Products
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Curated supplements & tools for your health
            </p>

            <Link href="/products">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition transform group-hover:scale-[1.02]">
                View Products
              </button>
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-8">

          {/* PROGRESS */}
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              📊 Your Progress
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>🚶 Steps: <span className="font-semibold">12,500</span></p>
              <p>🔥 Calories: <span className="font-semibold">1,800 kcal</span></p>
              <p>💧 Water: <span className="font-semibold">2.4L</span></p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ⚡ Quick Actions
            </h2>

            <div className="flex flex-col gap-3">

              <Link href="/chat">
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition hover:scale-[1.02]">
                  Ask AI
                </button>
              </Link>

              <Link href="/info">
                <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                  Health Tips
                </button>
              </Link>

              <Link href="/products">
                <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                  Shop Products
                </button>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}