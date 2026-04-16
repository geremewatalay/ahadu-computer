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
      className="group bg-white rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[15px] font-semibold text-primary mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-lg font-bold text-accent">
            {formatPrice(product.price).replace(' ETB', '')}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">ETB</span>
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-white border border-border text-primary py-2 rounded-md text-xs font-bold hover:border-accent hover:text-accent transition-all text-center"
          >
            Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-accent text-white py-2 rounded-md text-xs font-bold hover:bg-blue-700 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
