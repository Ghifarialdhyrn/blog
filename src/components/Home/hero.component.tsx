export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-[url('/hero.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="font-bold text-4xl lg:text-6xl mb-4">
          INSPIRATION FOR TRAVEL BY REAL PEOPLE
        </h1>
        <h3 className="text-xl lg:text-3xl mb-6">Book smart, travel simple</h3>
        <button className="px-8 py-3 bg-white text-black rounded-md text-lg lg:text-xl font-semibold hover:bg-black hover:text-white transition-all">
          Start planning your trip
        </button>
      </div>
    </section>
  );
}
