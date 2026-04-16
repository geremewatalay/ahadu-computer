import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, Upload, X } from 'lucide-react';
import { productService } from '../../services/productService';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import { motion, AnimatePresence } from 'motion/react';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptops',
    price: '',
    stock: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, this would handle FormData and image upload
    try {
      await productService.createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: previewImage || 'https://picsum.photos/seed/new/600/400'
      });
      setIsModalOpen(false);
      fetchProducts();
      setFormData({ name: '', category: 'Laptops', price: '', stock: '', description: '' });
      setPreviewImage(null);
    } catch (error) {
      alert('Error creating product');
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tight">Manage Products</h1>
          <p className="text-gray-500 font-medium">Add, edit, or remove products from your inventory.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="py-4">
          <Plus size={20} /> Add New Product
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-900 outline-none"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-blue-900 outline-none">
            <option>All Categories</option>
            <option>Laptops</option>
            <option>Desktops</option>
            <option>Accessories</option>
          </select>
          <button className="px-4 py-3 bg-gray-50 text-blue-900 rounded-xl hover:bg-gray-100 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Price</th>
                  <th className="px-8 py-4">Stock</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <span className="font-bold text-blue-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">{product.category}</span>
                    </td>
                    <td className="px-8 py-5 font-bold text-blue-900">{formatPrice(product.price)}</td>
                    <td className="px-8 py-5 font-medium text-gray-600">{product.stock} units</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${product.stock > 5 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}
                      `}>
                        {product.stock > 5 ? 'In Stock' : 'Low Stock'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Add New Product</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-blue-900">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Product Name" 
                      placeholder="e.g. MacBook Pro M3" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Category</label>
                      <select 
                        className="px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-900 outline-none font-medium"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Laptops</option>
                        <option>Desktops</option>
                        <option>Accessories</option>
                        <option>Monitors</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Price (ETB)" 
                      type="number" 
                      placeholder="85000" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                    <Input 
                      label="Stock Quantity" 
                      type="number" 
                      placeholder="10" 
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
                    <textarea 
                      rows="3" 
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-900 outline-none resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Product Image</label>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                        {previewImage ? (
                          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="text-gray-300" size={24} />
                        )}
                      </div>
                      <div className="flex-1">
                        <input 
                          type="file" 
                          id="image-upload" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <label 
                          htmlFor="image-upload"
                          className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          Choose File
                        </label>
                        <p className="text-xs text-gray-400 mt-2">Recommended size: 800x600px. Max 2MB.</p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full py-4 text-lg mt-4">
                    Create Product
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProducts;
