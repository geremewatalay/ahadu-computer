const categories = [
  "Laptops",
  "Desktops",
  "Accessories",
  "Networking"
]

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="flex overflow-x-auto gap-3 sm:justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            className="whitespace-nowrap px-4 py-2 bg-white shadow rounded-full text-sm hover:bg-blue-50"
          >
            {cat}
          </button>
        ))}
      </div>

    </div>
  )
}