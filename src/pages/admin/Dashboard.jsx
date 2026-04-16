import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  Clock
} from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { motion } from 'motion/react';

const Dashboard = () => {
  const stats = [
    { name: 'Total Revenue', value: 1250000, icon: DollarSign, trend: '+12.5%', up: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Total Orders', value: 456, icon: ShoppingBag, trend: '+8.2%', up: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Active Customers', value: 1205, icon: Users, trend: '-2.4%', up: false, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Products Sold', value: 892, icon: Package, trend: '+14.1%', up: true, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentOrders = [
    { id: '#ORD-7829', customer: 'Abebe Kebede', date: '2024-03-15', total: 85000, status: 'Delivered' },
    { id: '#ORD-7830', customer: 'Sara Tesfaye', date: '2024-03-15', total: 6500, status: 'Processing' },
    { id: '#ORD-7831', customer: 'Dawit Mengistu', date: '2024-03-14', total: 125000, status: 'Shipped' },
    { id: '#ORD-7832', customer: 'Helen Alemu', date: '2024-03-14', total: 22000, status: 'Pending' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={28} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend} {stat.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.name}</p>
            <h3 className="text-2xl font-black text-blue-900">
              {stat.name.includes('Revenue') ? formatPrice(stat.value) : stat.value.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight">Recent Orders</h3>
            <button className="text-blue-900 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 font-bold text-blue-900">{order.id}</td>
                    <td className="px-8 py-5 text-gray-600 font-medium">{order.customer}</td>
                    <td className="px-8 py-5 text-gray-500 text-sm">{order.date}</td>
                    <td className="px-8 py-5 font-bold text-blue-900">{formatPrice(order.total)}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                          order.status === 'Shipped' ? 'bg-purple-50 text-purple-600' :
                          'bg-amber-50 text-amber-600'}
                      `}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-8">Recent Activity</h3>
          <div className="space-y-8">
            {[
              { text: 'New product added: MacBook Air M3', time: '2 hours ago', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
              { text: 'Inventory low for: Logitech MX Master', time: '5 hours ago', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
              { text: 'New customer registered: Yosef Birhanu', time: 'Yesterday', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { text: 'Order #ORD-7825 was returned', time: 'Yesterday', icon: ShoppingBag, color: 'text-red-600', bg: 'bg-red-50' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-10 h-10 ${activity.bg} ${activity.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <activity.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900 leading-snug mb-1">{activity.text}</p>
                  <p className="text-xs text-gray-400 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 border-2 border-blue-900 text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all">
            View All Activity
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
