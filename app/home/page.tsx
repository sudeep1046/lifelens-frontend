"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<any[]>([]);

  // 🖱️ Cursor glow
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🔥 Generate particles (CLIENT ONLY → no hydration error)
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: 10 + Math.random() * 10,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0 animate-gradient bg-[linear-gradient(270deg,#000,#022c22,#000)] bg-[length:400%_400%]" />

      {/* 🖱️ Cursor Glow */}
      <div
        className="absolute w-[300px] h-[300px] bg-green-400/20 blur-[120px] rounded-full pointer-events-none"
        style={{
          left: pos.x - 150,
          top: pos.y - 150,
        }}
      />

      {/* ✨ Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          initial={{ x: p.x, y: p.y }}
          animate={{ y: -50 }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="relative z-10">

        {/* 🔥 HERO */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-32">

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-green-400"
          >
            LifeLens AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-xl mb-10 text-lg"
          >
            AI-powered health insights. Upload reports, ask questions, and understand your body like never before.
          </motion.p>

          {/* 🔥 BUTTONS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 flex-wrap justify-center"
          >
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.15, rotate: 1 }}
                className="bg-green-500 px-8 py-4 rounded-xl shadow-xl shadow-green-500/30"
              >
                Start Chat
              </motion.button>
            </Link>

            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.15 }}
                className="bg-purple-600 px-8 py-4 rounded-xl shadow-xl shadow-purple-500/30"
              >
                Products
              </motion.button>
            </Link>

            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.15 }}
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                Login
              </motion.button>
            </Link>
          </motion.div>

        </section>

        {/* 🔥 FEATURES */}
        <section id="products" className="px-10 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {["AI Chat", "Report Analysis", "Health Tracking"].map((title, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 1 }}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-green-500/30 cursor-pointer"
              >
                <Link href="/chat">
                  <h3 className="text-2xl mb-4">{title}</h3>
                  <p className="text-gray-300">
                    Experience next-gen AI health features.
                  </p>
                </Link>
              </motion.div>
            ))}

          </div>
        </section>

        {/* 🔥 HOW IT WORKS */}
        <section className="px-10 py-20 bg-black/40">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            {["Login", "Ask / Upload", "Get Insights"].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
                className="bg-white/10 p-8 rounded-2xl shadow-md hover:shadow-green-400/20"
              >
                <h3 className="text-xl mb-3">Step {i + 1}</h3>
                <p className="text-gray-300">{step}</p>
              </motion.div>
            ))}

          </div>
        </section>

        {/* 🔥 FOOTER */}
        <footer className="text-center py-6 text-gray-400 border-t border-white/10">
          © 2026 LifeLens AI — Built by Sid 🚀
        </footer>

      </div>
    </div>
  );
}