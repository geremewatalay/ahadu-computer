import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { motion } from 'motion/react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-border hover:border-primary/20 hover:shadow-ethio transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/80 backdrop-blur-sm text-primary text-[10px] font-black px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black text-primary leading-tight group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-xs text-slate-400 font-medium mb-6 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-primary">
                {formatPrice(product.price).replace(' ETB', '')}
              </span>
              <span className="text-[10px] text-accent font-black">ETB</span>
            </div>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="bg-primary text-white p-3 rounded-2xl hover:bg-accent hover:text-primary transition-all shadow-lg active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
