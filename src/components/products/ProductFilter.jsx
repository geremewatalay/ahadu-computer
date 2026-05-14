import React from 'react';

const ProductFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = ['All', 'Laptops', 'Desktops', 'Monitors', 'Accessories', 'Storage', 'Networking'];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-ethio sticky top-24">
      <div className="mb-10">
        <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] ml-2">Hardware Categories</h3>
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border-2
                ${activeCategory === category 
                  ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]' 
                  : 'text-primary bg-bg border-transparent hover:border-primary/10'
                }`}
            >
              <span>{category}</span>
              <span className={`transition-transform duration-300 ${activeCategory === category ? 'translate-x-1' : ''}`}>&rarr;</span>
            </button>
          ))}
        </div>
      </div>

      <div className="">
        <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] ml-2">Budget Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full bg-bg px-4 py-3 rounded-xl border-2 border-transparent focus:border-primary/10 text-xs font-bold outline-none transition-all"
              />
            </div>
            <span className="text-slate-300 font-black">—</span>
            <div className="relative flex-1">
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full bg-bg px-4 py-3 rounded-xl border-2 border-transparent focus:border-primary/10 text-xs font-bold outline-none transition-all"
              />
            </div>
          </div>
          <button className="w-full py-4 bg-accent text-primary rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-md mt-4">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
