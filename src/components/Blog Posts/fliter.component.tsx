// filter.tsx
import Link from "next/link";
import { useState } from "react";

export function Filter({ setSortBy }: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilter = (filterType: string) => {
    setSortBy(filterType); // Pass filter type to parent component
    setIsDropdownOpen(false); // Close dropdown after selecting filter
  };

  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-lg mt-8 relative max-w-[1450px] w-full mx-auto sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800 mr-4">Articles</h1>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-indigo-600 text-white px-10 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          Filter
        </button>
        {isDropdownOpen && (
          <div className="absolute text-[13px] right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-[1450px]">
            <button
              onClick={() => handleFilter("name")}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 transition"
            >
              Sort by Name
            </button>
            <button
              onClick={() => handleFilter("date")}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 transition"
            >
              Sort by Date
            </button>
            <Link href={"/categories"}>
              <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 transition">
                By Category
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
