"use client";

import Navbar from "@/components/Navbar";

const products = [
  {
    name: "Omega 3 Fish Oil",
    description: "Supports heart health, brain function, and reduces inflammation.",
    link: "https://www.amazon.in/dp/B07XJ8C8F5",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Multivitamin Tablets",
    description: "Boost immunity and overall wellness with essential nutrients.",
    link: "https://www.amazon.in/dp/B08L5TNJHG",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Protein Powder",
    description: "Enhance muscle growth and recovery with high-quality protein.",
    link: "https://www.amazon.in/dp/B07XJ8C8F5",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Digital Weighing Scale",
    description: "Track your fitness journey with accurate body weight monitoring.",
    link: "https://www.amazon.in/dp/B08L5TNJHG",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Yoga Mat",
    description: "Perfect for workouts, yoga, and daily fitness routines.",
    link: "https://www.amazon.in/dp/B07XJ8C8F5",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Fitness Smartwatch",
    description: "Track steps, heart rate, sleep, and more in real-time.",
    link: "https://www.amazon.in/dp/B08L5TNJHG",
    image: "https://via.placeholder.com/150",
  },
];

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fffb]">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-cyan-100 opacity-80"></div>

      {/* 🔥 Glow Effects */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-green-400 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-cyan-400 opacity-20 blur-[120px] rounded-full"></div>

      {/* 🌟 Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.02)_1px,_transparent_1px)] [background-size:20px_20px]"></div>

      <Navbar />

      {/* HEADER */}
      <div className="relative text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Health Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover top health products curated for your wellness journey.
        </p>
      </div>

      {/* GRID */}
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-8 pb-20">
        {products.map((product, index) => (
          <div
            key={index}
            className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-green-200 via-white to-cyan-200 hover:scale-[1.02] transition duration-300"
          >
            <div className="h-full w-full backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-lg border border-white/40 group-hover:shadow-2xl transition duration-300">

              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              {/* CONTENT */}
              <h2 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2 text-sm">
                {product.description}
              </p>

              {/* BUTTON */}
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-cyan-600 transition"
              >
                Buy on Amazon →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}