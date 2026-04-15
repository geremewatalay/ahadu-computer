const features = [
  { title: "Reliability", icon: "🛡️" },
  { title: "Quality Products", icon: "💎" },
  { title: "Expert Support", icon: "🧑‍💻" },
  { title: "Fast Delivery", icon: "🚚" }
]

export default function Features() {
  return (
    <section className="bg-white py-10">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

        {features.map(f => (
          <div key={f.title} className="p-3">
            <div className="text-2xl sm:text-3xl">{f.icon}</div>
            <h3 className="mt-2 text-sm sm:text-base font-semibold">
              {f.title}
            </h3>
          </div>
        ))}

      </div>

    </section>
  )
}