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
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Curated Selection</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter">Featured Hardware</h2>
          </div>
          <Link 
            to="/products" 
            className="hidden md:flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest hover:text-accent transition-all group"
          >
            View Full Catalog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
