import React from 'react';
import Hero from '../../components/home/Hero';
import Categories from '../../components/home/Categories';
import ProductGrid from '../../components/home/ProductGrid';
import Features from '../../components/home/Features';
import { motion } from 'motion/react';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Categories />
      <ProductGrid />
      <Features />
      
      {/* Newsletter / CTA Section */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 md:p-16 border border-border flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-blue-100 text-accent rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">
                Stay Updated
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 leading-tight">
                Ready to upgrade your <br /> tech experience?
              </h2>
              <p className="text-slate-500 text-sm mb-8 max-w-md">
                Join our newsletter to get exclusive deals, tech tips, and first access to new arrivals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-md border border-border bg-bg text-primary outline-none w-full sm:w-72 text-sm focus:border-accent"
                />
                <button className="bg-accent text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-blue-700 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://picsum.photos/seed/tech-minimal-cta/400/400" 
                alt="Tech" 
                className="w-72 h-72 object-cover rounded-xl shadow-sm border border-border"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
