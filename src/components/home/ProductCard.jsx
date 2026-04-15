import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">

      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-contain"
      />

      <h3 className="mt-2 font-semibold">{product.name}</h3>

      <p className="text-blue-600 font-bold">
        {formatPrice(product.price)}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
      >
        Add to Cart
      </button>

    </div>
  )
}