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
    <section className="py-20 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-4 uppercase tracking-widest">Featured Categories</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">
            Find exactly what you need from our wide range of high-quality computer products and components.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group bg-white p-8 rounded-[2rem] border border-border hover:border-primary/20 hover:shadow-ethio transition-all duration-500 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-bg text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <cat.icon size={28} />
              </div>
              <h3 className="font-black text-primary text-sm mb-2 uppercase tracking-tight">{cat.name}</h3>
              <div className="px-3 py-1 bg-accent/10 rounded-full">
                <p className="text-[9px] text-accent font-black uppercase tracking-widest">{cat.count} Items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
