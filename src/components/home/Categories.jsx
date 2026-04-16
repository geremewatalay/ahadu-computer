import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Monitor, MousePointer2, Cpu, HardDrive, Wifi } from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: 'Laptops', icon: Laptop, count: 120, color: 'bg-blue-50 text-blue-600' },
    { name: 'Desktops', icon: Cpu, count: 45, color: 'bg-amber-50 text-amber-600' },
    { name: 'Monitors', icon: Monitor, count: 32, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Accessories', icon: MousePointer2, count: 210, color: 'bg-purple-50 text-purple-600' },
    { name: 'Storage', icon: HardDrive, count: 85, color: 'bg-rose-50 text-rose-600' },
    { name: 'Networking', icon: Wifi, count: 28, color: 'bg-cyan-50 text-cyan-600' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-4 uppercase tracking-tight">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need from our wide range of high-quality computer products and components.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center border border-transparent hover:border-blue-100"
            >
              <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon size={32} />
              </div>
              <h3 className="font-bold text-blue-900 mb-1">{cat.name}</h3>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{cat.count} Items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
