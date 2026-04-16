import React from 'react';
import { Search } from 'lucide-react';

const ProductSearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for laptops, accessories, or brands..."
        className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-900 focus:ring-0 transition-all shadow-sm"
      />
    </div>
  );
};

export default ProductSearch;
