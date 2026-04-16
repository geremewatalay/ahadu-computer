import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/products/ProductCard';
import ProductFilter from '../../components/products/ProductFilter';
import ProductSearch from '../../components/products/ProductSearch';
import { productService } from '../../services/productService';
import Loader from '../../components/ui/Loader';
import { motion, AnimatePresence } from 'motion/react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (activeCategory === 'All') {
          data = await productService.getAllProducts();
        } else {
          data = await productService.getProductsByCategory(activeCategory);
        }
        
        if (searchQuery) {
          const lowerQuery = searchQuery.toLowerCase();
          data = data.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) || 
            p.description.toLowerCase().includes(lowerQuery)
          );
        }
        
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchParams(category === 'All' ? {} : { category });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-12 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black text-blue-900 mb-2 uppercase tracking-tight">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h1>
            <p className="text-gray-500 font-medium">
              Showing {products.length} high-quality items
            </p>
          </div>
          <ProductSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-72 shrink-0">
            <ProductFilter 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <Loader size="lg" />
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-8">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearchQuery(''); handleCategoryChange('All'); }}
                  className="text-blue-900 font-bold underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
