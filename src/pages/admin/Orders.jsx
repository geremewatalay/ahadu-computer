import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download, MoreVertical } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { motion } from 'motion/react';
import { orderService } from '../../services/orderService';
import Loader from '../../components/ui/Loader';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      alert('Failed to update status: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-12 h-full flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-12 bg-bg min-h-full"
    >
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-accent" />
          <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Transaction Ledger</span>
        </div>
        <h1 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">Order Flow</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-4">Monitor and process real-time acquisitions.</p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-8 rounded-[3rem] shadow-ethio border border-border mb-12 flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search Reference or Entity..." 
            className="w-full pl-16 pr-8 py-5 bg-bg border-2 border-transparent rounded-2xl text-[10px] font-black uppercase tracking-widest focus:border-primary focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="flex-1 md:flex-none px-8 py-5 bg-bg border-none rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-primary outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer">
            <option>All States</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <button className="p-5 bg-bg text-primary rounded-2xl hover:bg-primary hover:text-white transition-all border border-border">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[4rem] shadow-ethio border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                <th className="px-10 py-6">Transaction ID</th>
                <th className="px-10 py-6">Stakeholder</th>
                <th className="px-10 py-6">Timestamp</th>
                <th className="px-10 py-6">Payload</th>
                <th className="px-10 py-6">Valuation</th>
                <th className="px-10 py-6">Operational State</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => {
                  const displayId = `#ORD-${order.id.substring(0, 4).toUpperCase()}`;
                  const customerName = order.profiles?.full_name || order.customer || 'Unknown';
                  const date = new Date(order.created_at).toLocaleDateString();

                  return (
                    <tr key={order.id} className="hover:bg-bg/50 transition-colors group">
                      <td className="px-10 py-8 font-black text-[11px] text-primary group-hover:text-accent transition-colors">{displayId}</td>
                      <td className="px-10 py-8 text-primary font-bold text-xs">{customerName}</td>
                      <td className="px-10 py-8 text-slate-400 font-bold text-[10px] uppercase tracking-widest">{date}</td>
                      <td className="px-10 py-8 text-slate-400 font-black text-[10px] uppercase tracking-widest">{order.items} Units</td>
                      <td className="px-10 py-8 font-black text-primary text-sm">{formatPrice(order.total)}</td>
                      <td className="px-10 py-8">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border outline-none cursor-pointer appearance-none
                            ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                              order.status === 'Processing' ? 'bg-primary/5 text-primary border-primary/10' :
                              order.status === 'Shipped' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                              order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                              'bg-accent/10 text-primary border-accent/20'}
                          `}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="w-10 h-10 flex items-center justify-center bg-bg text-primary hover:bg-primary hover:text-white rounded-xl transition-all border border-border group/btn">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Orders;
