import React from 'react';
import { Search } from 'lucide-react';

const ProductSearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-xl group">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
        <Search size={22} strokeWidth={2.5} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search hardware..."
        className="block w-full pl-16 pr-8 py-5 bg-white border-2 border-border rounded-[2rem] text-primary font-bold placeholder:text-slate-300 focus:outline-none focus:border-primary focus:shadow-ethio transition-all"
      />
    </div>
  );
};

export default ProductSearch;
