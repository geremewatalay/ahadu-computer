import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="text-center max-w-2xl relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[15rem] md:text-[20rem] font-black text-primary leading-none mb-8 opacity-5 tracking-tighter select-none"
        >
          404
        </motion.div>
        <div className="relative -mt-32 md:-mt-48 z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Transmission Lost</span>
            <span className="w-8 h-[2px] bg-accent" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 uppercase tracking-tighter leading-[1.1]">Out of Bounds</h1>
          <p className="text-slate-400 font-bold mb-12 text-xs uppercase tracking-widest leading-loose max-w-sm mx-auto">
            The hardware address you requested <br /> does not exist in our regional database.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/" 
              className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent hover:text-primary transition-all shadow-ethio group"
            >
              <Home size={18} className="group-hover:-translate-y-1 transition-transform" /> Return to Base
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="bg-white text-primary border-2 border-border px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-primary transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Step Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
