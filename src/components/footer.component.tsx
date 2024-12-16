import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-8 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We provide inspiration for travel enthusiasts, helping you
              discover new destinations and experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Destination", "Food", "Sport", "Lifestyle"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={`/`}
                      className="hover:text-blue-500 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: ghifarialdhy@mail.com</p>
            <p className="text-gray-400">Phone: +62 (812) 345-6789</p>
            <div className="flex gap-4 mt-4">
              {["facebook", "twitter", "instagram"].map((social) => (
                <Link key={social} href={`/${social}`}>
                  <span
                    className={`material-icons ${
                      social === "instagram"
                        ? "text-pink-500"
                        : social === "twitter"
                        ? "text-blue-400"
                        : "text-blue-500"
                    } hover:text-opacity-75`}
                  >
                    {social}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Travel Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
