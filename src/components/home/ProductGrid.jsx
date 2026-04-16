import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { productService } from '../../services/productService';
import { ArrowRight } from 'lucide-react';
import Loader from '../ui/Loader';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data.slice(0, 4)); // Show only first 4 on home
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-4 uppercase tracking-tight">Featured Products</h2>
            <p className="text-gray-600">Our hand-picked selection of top-performing hardware.</p>
          </div>
          <Link 
            to="/products" 
            className="hidden md:flex items-center gap-2 text-blue-900 font-bold hover:gap-3 transition-all"
          >
            View All Products <ArrowRight size={20} />
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 md:hidden">
          <Link 
            to="/products" 
            className="flex items-center justify-center gap-2 bg-blue-50 text-blue-900 py-4 rounded-xl font-bold"
          >
            View All Products <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
