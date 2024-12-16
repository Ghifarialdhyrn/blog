"use client";
import { useEffect, useState } from "react";

export function BigPost() {
  const [inView, setInView] = useState(false);

  const handleScroll = () => {
    const bigPostSection = document.querySelector(".bigpost-section");
    if (bigPostSection) {
      const position = bigPostSection.getBoundingClientRect().top;
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

  return (
    <section
      className={`bigpost-section relative w-full h-[500px] bg-[url('/bigpost.png')] bg-cover bg-center flex items-center justify-center text-white transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } transition-all`}
    >
      <div className="bg-black bg-opacity-50 p-8 text-center rounded-lg">
        <h3 className="text-sm uppercase mb-4">Travel</h3>
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Richin Norton photorealistic rendering as real photos
        </h1>
        <p className="text-lg lg:text-xl mb-6">
          Progressively incentivize cooperative systems through technically
          sound functionalities. The credibly productivate seamless data.
        </p>
        <button className="px-8 py-3 bg-white text-black font-bold rounded-md hover:bg-black hover:text-white transition-all">
          Start planning your trip
        </button>
      </div>
    </section>
  );
}
