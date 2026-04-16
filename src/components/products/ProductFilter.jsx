import React from 'react';

const ProductFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = ['All', 'Laptops', 'Desktops', 'Monitors', 'Accessories', 'Storage', 'Networking'];

  return (
    <div className="bg-white p-6 rounded-xl border border-border sticky top-24">
      <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-widest">Featured Categories</h3>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-all border
              ${activeCategory === category 
                ? 'bg-primary text-white border-primary' 
                : 'text-text bg-white border-border hover:border-accent'
              }`}
          >
            <span>{category}</span>
            <span>&rarr;</span>
          </button>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-bold text-blue-900 mb-6 uppercase tracking-tight">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-900"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-900"
            />
          </div>
          <button className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
