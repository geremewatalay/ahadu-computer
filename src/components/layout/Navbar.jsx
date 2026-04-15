export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        <h1 className="text-lg sm:text-xl font-bold text-blue-600">
          AHADU COMPUTER
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 font-medium text-sm lg:text-base">
          {["Home", "Products", "Services", "About", "Support", "Contact"].map(item => (
            <a key={item} className="hover:text-blue-500 cursor-pointer">
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Button */}
        <button className="md:hidden text-sm bg-blue-600 text-white px-3 py-2 rounded">
          Menu
        </button>

        <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </div>
    </header>
  )
}