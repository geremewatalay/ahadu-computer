import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../../components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 text-gray-200">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-black text-blue-900 mb-4 uppercase tracking-tight">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-10 text-lg max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Start exploring our amazing products!
        </p>
        <Link 
          to="/products" 
          className="bg-blue-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-xl"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 min-h-screen py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tight">Shopping Cart</h1>
          <button 
            onClick={clearCart}
            className="text-red-500 font-bold text-sm hover:underline flex items-center gap-1"
          >
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-blue-900 mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">{item.category}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-blue-900 hover:bg-white rounded transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold text-blue-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-blue-900 hover:bg-white rounded transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xl font-black text-blue-900">{formatPrice(item.price * item.quantity)}</p>
                    <p className="text-xs text-gray-400 font-bold">{formatPrice(item.price)} / unit</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-2xl font-black text-blue-900 mb-8 uppercase tracking-tight">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-blue-900 font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase text-xs tracking-widest">Free</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Tax (VAT 15%)</span>
                  <span className="text-blue-900 font-bold">{formatPrice(cartTotal * 0.15)}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                  <span className="text-lg font-black text-blue-900 uppercase">Total</span>
                  <span className="text-3xl font-black text-amber-600">{formatPrice(cartTotal * 1.15)}</span>
                </div>
              </div>

              <Button className="w-full py-5 text-lg shadow-lg shadow-blue-900/20">
                Checkout Now <ArrowRight size={20} />
              </Button>
              
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Secure Checkout Guaranteed
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Official Warranty Included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
