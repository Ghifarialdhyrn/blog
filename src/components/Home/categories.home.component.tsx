"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function CategoriesHome() {
  const [inView, setInView] = useState(false);

  const handleScroll = () => {
    const categoriesSection = document.querySelector(".categories-section");
    if (categoriesSection) {
      const position = categoriesSection.getBoundingClientRect().top;
      if (position < window.innerHeight * 0.8) {
        setInView(true);
      } else {
        setInView(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { image: "/destination.jpg", name: "Destination" },
    { image: "/food.jpg", name: "Food" },
    { image: "/sport.jpg", name: "Sport" },
    { image: "/family.jpg", name: "Family" },
    { image: "/lifestyle.jpg", name: "Lifestyle" },
  ];

  return (
    <section
      className={`categories-section mt-20 mb-20 px-6 lg:px-24 transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } transition-all`}
    >
      {/* Section Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Categories</h1>
          <p className="text-md text-gray-600">
            Discover destinations that suit your travel goals.
          </p>
        </div>
        <Link
          href="/categories"
          className="text-blue-500 hover:text-blue-700 font-semibold transition"
        >
          See all
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={200}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all">
              <h2 className="text-white font-bold text-lg text-center">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
