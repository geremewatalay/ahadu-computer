export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div>
          <h2 className="text-white font-bold mb-3">Ahadu Computer</h2>
          <p className="text-sm">
            Premium computer trading platform in Ethiopia.
          </p>
        </div>

        <div>
          <h3 className="text-white mb-2">Links</h3>
          <ul className="space-y-1 text-sm">
            <li>Products</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white mb-2">Newsletter</h3>
          <input className="w-full p-2 rounded text-black text-sm" />
          <button className="mt-2 bg-blue-600 px-4 py-2 rounded w-full text-sm">
            Subscribe
          </button>
        </div>

      </div>

      <div className="text-center p-4 border-t border-gray-700 text-xs">
        © 2026 Ahadu Computer Trading
      </div>

    </footer>
  )
}