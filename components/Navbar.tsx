"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-lg font-semibold text-purple-400 tracking-widest">
          LIFELENS AI
        </h1>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition">Chat</Link>
          <Link href="/info" className="hover:text-white transition">Info</Link>
          <Link href="/products" className="hover:text-white transition">Products</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
        </div>
      </div>
    </div>
  );
}