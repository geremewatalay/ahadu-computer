import { products } from '../../data/products'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </section>
  )
}