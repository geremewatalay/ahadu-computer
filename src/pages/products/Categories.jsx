import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Monitor, MousePointer2, Cpu, HardDrive, Wifi, Smartphone, Speaker } from 'lucide-react';
import { motion } from 'motion/react';

const CategoriesPage = () => {
  const categories = [
    { name: 'Laptops', icon: Laptop, count: 120, color: 'bg-blue-50 text-blue-600', description: 'Business, Gaming, and Everyday laptops.' },
    { name: 'Desktops', icon: Cpu, count: 45, color: 'bg-amber-50 text-amber-600', description: 'Powerful workstations and home PCs.' },
    { name: 'Monitors', icon: Monitor, count: 32, color: 'bg-emerald-50 text-emerald-600', description: '4K, Gaming, and Office displays.' },
    { name: 'Accessories', icon: MousePointer2, count: 210, color: 'bg-purple-50 text-purple-600', description: 'Mice, Keyboards, and more.' },
    { name: 'Storage', icon: HardDrive, count: 85, color: 'bg-rose-50 text-rose-600', description: 'SSDs, HDDs, and External drives.' },
    { name: 'Networking', icon: Wifi, count: 28, color: 'bg-cyan-50 text-cyan-600', description: 'Routers, Switches, and Adapters.' },
    { name: 'Mobile', icon: Smartphone, count: 15, color: 'bg-indigo-50 text-indigo-600', description: 'Tablets and Mobile accessories.' },
    { name: 'Audio', icon: Speaker, count: 42, color: 'bg-orange-50 text-orange-600', description: 'Speakers, Headphones, and Mics.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 min-h-screen pt-12 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-6 uppercase tracking-tight">Product Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our extensive collection of computer hardware and technology solutions organized by category.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/products?category=${cat.name}`}
                className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center h-full border border-transparent hover:border-blue-100"
              >
                <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-current/10`}>
                  <cat.icon size={40} />
                </div>
                <h3 className="text-2xl font-black text-blue-900 mb-3">{cat.name}</h3>
                <p className="text-gray-500 mb-6 flex-1">{cat.description}</p>
                <span className="text-xs font-black text-amber-600 uppercase tracking-[0.2em] bg-amber-50 px-4 py-2 rounded-full">
                  {cat.count} Products
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoriesPage;
