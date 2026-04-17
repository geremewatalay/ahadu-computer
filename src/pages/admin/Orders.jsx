import React from 'react';
import { Search, Filter, Eye, Download, MoreVertical } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { motion } from 'motion/react';

const Orders = () => {
  const orders = [
    { id: '#ORD-7829', customer: 'Abebe Kebede', date: '2024-03-15', total: 85000, status: 'Delivered', items: 1 },
    { id: '#ORD-7830', customer: 'Sara Tesfaye', date: '2024-03-15', total: 6500, status: 'Processing', items: 2 },
    { id: '#ORD-7831', customer: 'Dawit Mengistu', date: '2024-03-14', total: 125000, status: 'Shipped', items: 1 },
    { id: '#ORD-7832', customer: 'Helen Alemu', date: '2024-03-14', total: 22000, status: 'Pending', items: 1 },
    { id: '#ORD-7833', customer: 'Yonas Tadesse', date: '2024-03-13', total: 45000, status: 'Delivered', items: 1 },
    { id: '#ORD-7834', customer: 'Marta Bekele', date: '2024-03-13', total: 95000, status: 'Cancelled', items: 1 },
  ];

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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-bg/50 transition-colors group">
                  <td className="px-10 py-8 font-black text-[11px] text-primary group-hover:text-accent transition-colors">{order.id}</td>
                  <td className="px-10 py-8 text-primary font-bold text-xs">{order.customer}</td>
                  <td className="px-10 py-8 text-slate-400 font-bold text-[10px] uppercase tracking-widest">{order.date}</td>
                  <td className="px-10 py-8 text-slate-400 font-black text-[10px] uppercase tracking-widest">{order.items} Units</td>
                  <td className="px-10 py-8 font-black text-primary text-sm">{formatPrice(order.total)}</td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border
                      ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        order.status === 'Processing' ? 'bg-primary/5 text-primary border-primary/10' :
                        order.status === 'Shipped' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                        order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                        'bg-accent/10 text-primary border-accent/20'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="w-10 h-10 flex items-center justify-center bg-bg text-primary hover:bg-primary hover:text-white rounded-xl transition-all border border-border group/btn">
                        <Eye size={16} />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center bg-bg text-slate-400 hover:bg-white hover:shadow-md rounded-xl transition-all border border-border group/btn">
                        <Download size={16} />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center bg-bg text-slate-400 hover:bg-white hover:shadow-md rounded-xl transition-all border border-border group/btn">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Orders;
