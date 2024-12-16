// hero.search.tsx
import Image from "next/image";

export default function HeroSearch({ setSearchQuery }: any) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative w-full h-[300px] text-white">
      <div className="bg-[url('/hero.png')] bg-no-repeat bg-cover w-full h-[300px] absolute opacity-70"></div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center">
        <h1 className="font-extrabold text-[40px] lg:text-[50px] mb-4">
          LIST OF BLOG POSTS
        </h1>
        <p className="text-lg lg:text-xl font-medium mb-6">
          Find your articles
        </p>
        <div className="relative w-full max-w-[700px] sticky top-0 z-20">
          <input
            type="search"
            onChange={handleSearchChange}
            placeholder="Search articles..."
            className="w-full h-[50px] rounded-md border border-gray-300 pl-12 pr-4 text-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Image
            src="/searchicon.png"
            alt="search"
            width={24}
            height={24}
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
}
