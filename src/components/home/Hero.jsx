export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-10 sm:py-16 lg:py-24">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Buy Premium Computers & Accessories
          </h1>

          <p className="mt-4 text-sm sm:text-base text-blue-100">
            Laptops, Desktops, Printers & Networking Equipment in Ethiopia
          </p>

          <button className="mt-6 bg-orange-500 px-5 py-3 rounded-lg font-semibold w-full sm:w-auto">
            Shop Now
          </button>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/hero.png"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl shadow-xl"
          />
        </div>

      </div>
    </section>
  )
}