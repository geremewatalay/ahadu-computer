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
      className="bg-bg min-h-screen py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Shopping Experience</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none">Your Bag</h1>
          </div>
          <button 
            onClick={clearCart}
            className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-70 flex items-center gap-2 transition-all p-2 bg-secondary/5 rounded-xl border border-secondary/10"
          >
            <Trash2 size={14} /> Empty Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-8 rounded-[3rem] shadow-sm border border-border flex flex-col sm:flex-row items-center gap-8 group"
                >
                  <div className="w-40 h-40 bg-bg rounded-[2rem] overflow-hidden shrink-0 p-6">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-black text-primary mb-1 uppercase tracking-tight leading-tight">{item.name}</h3>
                    <p className="text-accent text-[9px] font-black uppercase tracking-[0.2em] mb-6">{item.category}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-6">
                      <div className="flex items-center bg-bg rounded-2xl p-1.5 border border-border shadow-inner">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-primary hover:bg-white rounded-xl transition-all font-black text-xl"
                        >
                          <Minus size={16} strokeWidth={3} />
                        </button>
                        <span className="w-12 text-center font-black text-primary text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-primary hover:bg-white rounded-xl transition-all font-black text-xl"
                        >
                          <Plus size={16} strokeWidth={3} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-secondary transition-colors p-3 hover:bg-secondary/10 rounded-2xl"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>

                  <div className="text-center sm:text-right shrink-0 pt-4 sm:pt-0">
                    <p className="text-2xl font-black text-primary tracking-tighter mb-1">{formatPrice(item.price * item.quantity)}</p>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{formatPrice(item.price)} <span className="opacity-50">/ unit</span></p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-12 rounded-[4rem] shadow-ethio border border-border sticky top-24">
              <h3 className="text-3xl font-black text-primary mb-10 uppercase tracking-tighter">Summary</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-slate-400 font-black text-[10px] uppercase tracking-widest leading-none">
                  <span>Subtotal</span>
                  <span className="text-primary">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-black text-[10px] uppercase tracking-widest leading-none">
                  <span>Shipping</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="flex justify-between text-slate-400 font-black text-[10px] uppercase tracking-widest leading-none">
                  <span>VAT (15%)</span>
                  <span className="text-primary">{formatPrice(cartTotal * 0.15)}</span>
                </div>
                <div className="pt-8 border-t border-border flex justify-between items-end">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1">Total Due</span>
                  <span className="text-4xl font-black text-accent tracking-tighter">{formatPrice(cartTotal * 1.15)}</span>
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full shadow-lg group">
                Checkout Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-4 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-sm shadow-accent/50"></div>
                  Secure Payment Gateway
                </div>
                <div className="flex items-center gap-4 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-sm shadow-primary/50"></div>
                  Addis Ababa Express Shipping
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
