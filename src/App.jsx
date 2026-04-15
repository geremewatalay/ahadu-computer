import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/home/Hero'
import Categories from './components/home/Categories'
import ProductGrid from './components/home/ProductGrid'
import Features from './components/home/Features'
import { useCart } from './hooks/useCart'

function App() {
  const { cart } = useCart()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* DEBUG CART (temporary) */}
      <div className="bg-yellow-100 text-sm p-2 text-center">
        Cart Items: {cart.length}
      </div>

      <main className="flex-1">
        <Hero />
        <Categories />
        <ProductGrid />
        <Features />
      </main>

      <Footer />
    </div>
  )
}

export default App