import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw, Star, Check } from 'lucide-react';
import { productService } from '../../services/productService';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { motion } from 'motion/react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Product Not Found</h2>
      <Link to="/products" className="text-blue-900 underline font-bold">Back to Products</Link>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumbs */}
        <Link to="/products" className="inline-flex items-center gap-3 text-slate-400 hover:text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-12 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Product Image */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-square bg-white rounded-[4rem] overflow-hidden border border-border shadow-ethio relative group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-12 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 right-8">
                <span className="bg-primary/5 backdrop-blur-md text-primary text-[10px] font-black px-4 py-2 rounded-full border border-primary/10 uppercase tracking-widest shadow-sm">
                  Official Partner
                </span>
              </div>
            </motion.div>
            <div className="grid grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-white rounded-[1.5rem] overflow-hidden border border-border cursor-pointer hover:border-primary hover:shadow-lg transition-all p-3 group">
                  <img 
                    src={`https://picsum.photos/seed/thumb${i+id}/200/200`} 
                    alt="" 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-accent" />
                <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-[1.05] uppercase tracking-tighter">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest leading-none">4.9 (128 Reviews)</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-primary tracking-tighter">
                  {formatPrice(product.price).replace(' ETB', '')}
                </span>
                <span className="text-accent font-black text-sm uppercase tracking-widest">ETB</span>
              </div>
            </div>

            <div className="mb-12">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-[3rem] p-10 mb-12 border border-border shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.2em] ml-1">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col group">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mb-1 group-hover:text-accent transition-colors">{key}</span>
                    <span className="text-primary font-black uppercase tracking-tight text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center bg-white border-2 border-border rounded-[1.5rem] px-5 py-3 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-primary font-black text-xl hover:bg-bg rounded-xl transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-primary text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-primary font-black text-xl hover:bg-bg rounded-xl transition-all"
                >
                  +
                </button>
              </div>
              <Button 
                onClick={() => addToCart(product, quantity)}
                variant="primary"
                size="lg"
                className="flex-1 shadow-ethio"
              >
                <ShoppingCart size={22} className="stroke-[3px]" /> Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Shield size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1 Year <br /> Warranty</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                  <Truck size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Addis <br /> Delivery</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <RotateCcw size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">7-Day <br /> Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
