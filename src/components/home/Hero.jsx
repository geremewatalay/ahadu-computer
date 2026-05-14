import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Headphones } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-bg overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/4 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <span className="w-12 h-[2px] bg-accent" />
                <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">
                  Premium Tech Hub • Addis Ababa
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-primary leading-[1.05] mb-8 uppercase tracking-tighter">
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  Ethiopian Tech
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Ahadu Computer Trading brings world-class computing power to your doorstep. Genuine hardware, local expertise, and unmatched support.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link
                  to="/products"
                  className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full font-black text-sm hover:bg-primary/90 transition-all shadow-ethio flex items-center justify-center gap-3 group"
                >
                  Explore Catalog
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto bg-white text-primary border-2 border-primary/10 px-10 py-4 rounded-full font-black text-sm hover:border-primary transition-all flex items-center justify-center"
                >
                  Repair Services
                </Link>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" alt="HP" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" alt="Dell" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" alt="Lenovo" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" alt="Samsung" className="h-6" />
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full relative"
          >
            {/* Decorative Ring */}
            <div className="absolute inset-0 border-[20px] border-accent/10 rounded-full scale-110 animate-pulse" />
            
            <div className="relative rounded-[3rem] overflow-hidden shadow-ethio border-8 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800&h=800"
                alt="High-end Laptop"
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <p className="text-primary font-black text-xl mb-1">Dell XPS 15</p>
                <p className="text-accent font-bold text-sm uppercase tracking-widest">Available Now in Addis</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
