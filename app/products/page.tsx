"use client";

const products = [
  {
    name: "Omega 3 Fish Oil",
    description: "Supports heart health, brain function, and reduces inflammation.",
    link: "https://www.amazon.in/dp/B07XJ8C8F5",
    image: "/products/omega3.jpg",
  },
  {
    name: "Multivitamin Tablets",
    description: "Boost immunity and overall wellness.",
    link: "https://www.amazon.in/dp/B08L5TNJHG",
    image: "/products/multivitamin.jpg",
  },
  {
    name: "Protein Powder",
    description: "Enhance muscle growth and recovery.",
    link: "https://www.amazon.in/dp/B07XJ8C8F5",
    image: "/products/protein.jpg",
  },
  {
    name: "Digital Weighing Scale",
    description: "Track your fitness journey accurately.",
    link: "https://www.amazon.in/dp/B08L5TNJHG",
    image: "/products/scale.jpg",
  },
  {
    name: "Yoga Mat",
    description: "Perfect for workouts and yoga routines.",
    link: "https://www.amazon.in/dp/B07XJ8C8F5",
    image: "/products/yoga.jpg",
  },
  {
    name: "Fitness Smartwatch",
    description: "Track steps, heart rate, sleep, and more.",
    link: "https://www.amazon.in/dp/B08L5TNJHG",
    image: "/products/watch.jpg",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-green-100 via-white to-blue-100">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Health Products
      </h1>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 border border-gray-200 hover:scale-[1.02]"
          >
            {/* ✅ IMAGE (FIXED) */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 object-cover rounded-xl mb-4"
            />

            {/* Title */}
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              {product.name}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {product.description}
            </p>

            {/* Button */}
            <a
              href={product.link}
              target="_blank"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Buy on Amazon →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}