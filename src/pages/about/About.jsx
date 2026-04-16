import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* Hero */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-amber-600 font-black uppercase tracking-widest text-sm mb-4 block">Our Story</span>
              <h1 className="text-4xl md:text-6xl font-black text-blue-900 mb-8 leading-tight uppercase tracking-tight">
                Leading the Tech <br /> Revolution in Ethiopia
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Founded in 2010, Ahadu Computer Trading has grown from a small repair shop to Ethiopia's most trusted computer retail and service provider.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Our journey began with a simple mission: to make high-quality technology accessible to everyone in Ethiopia. Today, we serve thousands of individuals and businesses, providing them with the tools they need to succeed in a digital world.
              </p>
            </div>
            <div className="flex-1 relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white rotate-3">
                <img 
                  src="https://picsum.photos/seed/ahadu-about/800/600" 
                  alt="Ahadu Team" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-blue-900 text-white p-8 rounded-3xl shadow-2xl">
                <p className="text-4xl font-black mb-1">15+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-blue-50 p-12 rounded-[3rem] border border-blue-100">
            <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mb-8">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">Our Mission</h2>
            <p className="text-blue-900/70 text-lg leading-relaxed">
              To provide the highest quality computer hardware and professional IT services in Ethiopia, empowering our customers through technology and exceptional support.
            </p>
          </div>
          <div className="bg-amber-50 p-12 rounded-[3rem] border border-amber-100">
            <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-8">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight">Our Vision</h2>
            <p className="text-amber-900/70 text-lg leading-relaxed">
              To be the leading technology partner in East Africa, recognized for our integrity, innovation, and commitment to digital inclusion.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Our Core Values</h2>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do at Ahadu Computer Trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="text-amber-500" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Integrity</h3>
              <p className="text-blue-200/70">We believe in honest pricing, genuine products, and transparent services.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="text-amber-500" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Customer First</h3>
              <p className="text-blue-200/70">Our customers' success is our success. We go above and beyond to help.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="text-amber-500" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Expertise</h3>
              <p className="text-blue-200/70">We continuously learn and grow to provide the best technical solutions.</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
