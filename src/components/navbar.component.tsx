"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-24 flex justify-between items-center h-[70px]">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="logo" width={120} height={40} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-white font-medium">
          {["DESTINATION", "FOOD", "SPORT", "FAMILY", "LIFESTYLE"].map(
            (item) => (
              <Link
                key={item}
                href="/categories"
                className="hover:text-blue-500 transition-colors"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white">
          <nav className="flex flex-col items-center gap-4 py-4">
            {["DESTINATION", "FOOD", "SPORT", "FAMILY", "LIFESTYLE"].map(
              (item) => (
                <Link
                  key={item}
                  href="/categories"
                  className="hover:text-blue-500 transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
