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
      className="min-h-screen bg-bg pt-12 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Hardware Catalog</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-primary mb-4 uppercase tracking-tighter leading-none">
              {activeCategory === 'All' ? 'Everything' : activeCategory}
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Explore {products.length} Professional Tech Solutions
            </p>
          </div>
          <ProductSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-80 shrink-0">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-[4rem] p-24 text-center border-2 border-dashed border-border/60">
                <div className="w-24 h-24 bg-bg rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-200">
                  <Search size={48} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-primary mb-3 uppercase tracking-tighter">No items found</h3>
                <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto tracking-tight">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearchQuery(''); handleCategoryChange('All'); }}
                  className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-lg"
                >
                  Reset Filters
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
