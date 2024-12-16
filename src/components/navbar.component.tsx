import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-black shadow-md fixed w-full z-50">
      <div className="container mx-auto px-8 lg:px-24 flex justify-between items-center h-[70px]">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="logo" width={150} height={50} />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
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

        {/* Subscribe Button */}
        <div>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
            Subscribe
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
