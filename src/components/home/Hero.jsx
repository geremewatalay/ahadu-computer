import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Headphones } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-bg overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-accent rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
                New Arrival • 2024 Models
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-primary leading-[1.1] mb-6">
                Elevating Technology <br />
                in Ethiopia.
              </h1>
              <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Premium computing solutions for professionals and businesses. Experience the latest in high-performance hardware with local warranty and support.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/products"
                  className="w-full sm:w-auto bg-accent text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  Shop Now
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto bg-white text-primary border border-border px-8 py-3 rounded-md font-bold text-sm hover:border-accent hover:text-accent transition-all flex items-center justify-center"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 flex gap-10 pt-8 border-t border-border"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">1,200+</span>
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Products</label>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">24/7</span>
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Support</label>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">5.0</span>
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Client Rating</label>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-border bg-white p-4">
              <img
                src="https://picsum.photos/seed/ahadu-minimal/800/600"
                alt="Ahadu Computer Trading"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
