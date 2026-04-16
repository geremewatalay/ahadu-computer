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
      className="p-8"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tight">Orders Management</h1>
        <p className="text-gray-500 font-medium">Track and manage all customer orders and shipments.</p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-900 outline-none"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-blue-900 outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <button className="px-4 py-3 bg-gray-50 text-blue-900 rounded-xl hover:bg-gray-100 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Items</th>
                <th className="px-8 py-4">Total</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 font-bold text-blue-900">{order.id}</td>
                  <td className="px-8 py-5 text-gray-600 font-medium">{order.customer}</td>
                  <td className="px-8 py-5 text-gray-500 text-sm">{order.date}</td>
                  <td className="px-8 py-5 text-gray-500 font-medium">{order.items} items</td>
                  <td className="px-8 py-5 font-bold text-blue-900">{formatPrice(order.total)}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                        order.status === 'Shipped' ? 'bg-purple-50 text-purple-600' :
                        order.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                        'bg-amber-50 text-amber-600'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={18} />
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
