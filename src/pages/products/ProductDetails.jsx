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
      className="bg-white min-h-screen pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumbs */}
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-900 font-bold mb-12 transition-colors">
          <ArrowLeft size={20} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:border-blue-900 transition-all">
                  <img src={`https://picsum.photos/seed/thumb${i+id}/200/200`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-900 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-400 font-bold text-sm">4.9 (128 Reviews)</span>
              </div>
              <p className="text-4xl font-black text-blue-900">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="prose prose-blue mb-10">
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specs */}
            <div className="bg-gray-50 rounded-3xl p-8 mb-10">
              <h3 className="text-lg font-bold text-blue-900 mb-6 uppercase tracking-tight">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{key}</span>
                    <span className="text-blue-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-blue-900 font-black text-xl hover:bg-white rounded-lg transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-blue-900 text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-blue-900 font-black text-xl hover:bg-white rounded-lg transition-all"
                >
                  +
                </button>
              </div>
              <Button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-5 text-lg"
              >
                <ShoppingCart size={24} /> Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-900">
                  <Shield size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                  <Truck size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <RotateCcw size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">7-Day Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
