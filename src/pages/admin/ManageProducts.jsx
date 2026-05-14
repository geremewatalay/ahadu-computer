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
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptops',
    price: '',
    stock: '',
    description: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

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
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = previewImage;
      
      if (selectedFile) {
        imageUrl = await productService.uploadProductImage(selectedFile);
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: imageUrl || 'https://picsum.photos/seed/new/600/400'
      };

      if (editingId) {
        await productService.updateProduct(editingId, payload);
      } else {
        await productService.createProduct(payload);
      }

      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || ''
    });
    setPreviewImage(product.image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', category: 'Laptops', price: '', stock: '', description: '' });
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Terminate this product entity?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        alert('Delete failed: ' + error.message);
      }
    }
  };

  return (
    <div className="p-12 bg-bg min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Inventory Protocol</span>
          </div>
          <h1 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">Catalog Core</h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-4">Manage the centralized product repository.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="lg" className="shadow-xl group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" /> Initialize Entry
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-8 rounded-[3rem] shadow-ethio border border-border mb-12 flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search Registry..." 
            className="w-full pl-16 pr-8 py-5 bg-bg border-2 border-transparent rounded-2xl text-[10px] font-black uppercase tracking-widest focus:border-primary focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="flex-1 md:flex-none px-8 py-5 bg-bg border-none rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-primary outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer">
            <option>All Segments</option>
            <option>Laptops</option>
            <option>Desktops</option>
            <option>Accessories</option>
          </select>
          <button className="p-5 bg-bg text-primary rounded-2xl hover:bg-primary hover:text-white transition-all border border-border">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[4rem] shadow-ethio border border-border overflow-hidden">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">Product Entity</th>
                  <th className="px-10 py-6">Classification</th>
                  <th className="px-10 py-6">Valuation</th>
                  <th className="px-10 py-6">Resource Count</th>
                  <th className="px-10 py-6">Inventory State</th>
                  <th className="px-10 py-6 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-bg/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden bg-bg p-2 border border-border shrink-0 group-hover:border-accent transition-colors">
                          <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                        </div>
                        <span className="font-black text-xs text-primary uppercase tracking-tight">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 bg-bg px-3 py-1 rounded-full">{product.category}</span>
                    </td>
                    <td className="px-10 py-8 font-black text-primary text-sm">{formatPrice(product.price)}</td>
                    <td className="px-10 py-8 font-bold text-slate-600 text-[11px] uppercase tracking-widest">{product.stock} Units</td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border
                        ${product.stock > 5 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-accent/10 text-primary border-accent/20'}
                      `}>
                        {product.stock > 5 ? 'Optimal' : 'Depleted'}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="w-10 h-10 flex items-center justify-center bg-bg text-primary hover:bg-primary hover:text-white rounded-xl transition-all border border-border group/btn"
                        >
                          <Edit2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-bg text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-border group/btn"
                        >
                          <Trash2 size={16} className="group-hover/btn:rotate-12 transition-transform" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="p-12 md:p-16 relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <span className="text-accent font-black text-[9px] uppercase tracking-[0.25em] mb-2 block">
                      {editingId ? 'Modify Transmission' : 'New Transmission'}
                    </span>
                    <h2 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">
                      {editingId ? 'Edit Entity' : 'Initialize Entity'}
                    </h2>
                  </div>
                  <button onClick={handleCloseModal} className="w-12 h-12 flex items-center justify-center bg-bg rounded-2xl text-slate-400 hover:text-primary hover:bg-white hover:shadow-md transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input 
                      label="Designation" 
                      placeholder="e.g. MacBook Pro M3" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Classification</label>
                      <select 
                        className="w-full bg-bg border-none px-6 py-4 rounded-[1.25rem] text-primary font-bold text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer appearance-none"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input 
                      label="Valuation (ETB)" 
                      type="number" 
                      placeholder="85000" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                    <Input 
                      label="Allocation Count" 
                      type="number" 
                      placeholder="10" 
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Technical Summary</label>
                    <textarea 
                      rows="4" 
                      className="w-full bg-bg border-none px-6 py-4 rounded-[1.5rem] text-primary font-bold text-sm placeholder:text-slate-300 focus:ring-2 focus:ring-primary outline-none resize-none shadow-sm"
                      placeholder="Define product specifications..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Visual Mapping</label>
                    <div className="flex items-center gap-8 bg-bg p-6 rounded-[2.5rem] border-2 border-dashed border-border group hover:border-primary transition-colors">
                      <div className="w-24 h-24 bg-white rounded-[2rem] border border-border flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                        {previewImage ? (
                          <img src={previewImage} alt="Preview" className="w-full h-full object-contain p-2" />
                        ) : (
                          <Upload className="text-slate-200 group-hover:text-primary transition-colors" size={28} />
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
                          className="inline-block bg-primary text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-accent hover:text-primary transition-all shadow-md"
                        >
                          Select Resource
                        </label>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-3">800x600px | Max 2MB Payload</p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6 shadow-2xl">
                    {editingId ? 'Save Changes Protocol' : 'Finalize Entry Protocol'}
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
