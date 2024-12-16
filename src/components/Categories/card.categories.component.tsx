"use client";

import Image from "next/image";

export function CardCategories({ onSelectCategory }: any) {
  const categories = [
    { image: "/all.jpg", name: "All" },
    { image: "/destination.jpg", name: "Destination" },
    { image: "/food.jpg", name: "Food" },
    { image: "/sport.jpg", name: "Sport" },
    { image: "/family.jpg", name: "Family" },
    { image: "/lifestyle.jpg", name: "Lifestyle" },
  ];

  return (
    <section className="categories-section mt-20 mb-5 px-6 lg:px-24 opacity-100 translate-y-0">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 underline underline-offset-[15px]">
          Choose The Category
        </h1>
      </div>

      {/* Categories Row */}
      <div className="flex gap-4 justify-center flex-wrap">
        {/* Individual Categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative w-52 h-52 group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={() => onSelectCategory(category.name)}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all">
              <h2 className="text-white font-bold text-xl text-center">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
