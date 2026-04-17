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
      className="p-12 bg-bg min-h-full"
    >
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-accent" />
          <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Operational Overview</span>
        </div>
        <h1 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">System Matrix</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-4">Real-time engagement and telemetry data summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-10 rounded-[3rem] shadow-ethio border border-border group hover:-translate-y-2 transition-transform duration-500">
            <div className="flex justify-between items-start mb-10">
              <div className={`w-14 h-14 bg-bg rounded-2xl flex items-center justify-center border border-border group-hover:bg-primary transition-colors`}>
                <stat.icon size={24} className="text-primary group-hover:text-white" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend} {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-2 leading-none">{stat.name}</p>
            <h3 className="text-3xl font-black text-primary tracking-tighter leading-none">
              {stat.name.includes('Revenue') ? formatPrice(stat.value) : stat.value.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-[4rem] shadow-ethio border border-border overflow-hidden">
          <div className="p-10 border-b border-border flex justify-between items-center">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">Recent Acquisitions</h3>
            <button className="text-accent font-black text-[10px] uppercase tracking-[0.2em] hover:text-primary transition-colors">Expand Full Log &rarr;</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">Reference ID</th>
                  <th className="px-10 py-6">Stakeholder</th>
                  <th className="px-10 py-6">Timestamp</th>
                  <th className="px-10 py-6">Amount</th>
                  <th className="px-10 py-6">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-bg/50 transition-colors group">
                    <td className="px-10 py-6 font-black text-[11px] text-primary group-hover:text-accent transition-colors">{order.id}</td>
                    <td className="px-10 py-6 text-primary font-bold text-xs">{order.customer}</td>
                    <td className="px-10 py-6 text-slate-400 font-bold text-[10px] uppercase tracking-widest">{order.date}</td>
                    <td className="px-10 py-6 font-black text-primary text-sm">{formatPrice(order.total)}</td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border
                        ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          order.status === 'Processing' ? 'bg-primary/5 text-primary border-primary/10' :
                          order.status === 'Shipped' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                          'bg-accent/10 text-primary border-accent/20'}
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
        <div className="bg-white rounded-[4rem] shadow-ethio border border-border p-10 flex flex-col">
          <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-10">System Relay</h3>
          <div className="space-y-10 flex-1">
            {[
              { text: 'New inventory injected: MacBook Air M3', time: '02h ago', icon: Package, color: 'text-primary' },
              { text: 'Critical: Stock depleting for MX Master', time: '05h ago', icon: Clock, color: 'text-accent' },
              { text: 'Entity established: Yosef Birhanu', time: '24h ago', icon: Users, color: 'text-emerald-600' },
              { text: 'Protocol: Order #ORD-7825 reversal', time: '24h ago', icon: ShoppingBag, color: 'text-red-600' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-6 group">
                <div className={`w-12 h-12 bg-bg rounded-xl flex items-center justify-center shrink-0 border border-border group-hover:border-primary transition-colors`}>
                  <activity.icon size={20} className={activity.color} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-primary uppercase tracking-tight leading-snug mb-1 truncate">{activity.text}</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest opacity-60">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-5 bg-primary text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-lg">
            View All Telemetry
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
