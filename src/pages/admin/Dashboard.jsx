import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  Clock,
  PieChart as PieIcon,
  BarChart as BarIcon
} from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';
import { motion } from 'motion/react';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import Loader from '../../components/ui/Loader';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const COLORS = ['#0f172a', '#3b82f6', '#f59e0b', '#10b981', '#6366f1'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [orders, products] = await Promise.all([
          orderService.getAllOrders(),
          productService.getAllProducts()
        ]);

        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
        const totalOrders = orders.length;
        const totalCustomers = new Set(orders.map(o => o.user_id)).size;
        const totalProducts = products.length;

        setStats([
          { name: 'Total Revenue', value: totalRevenue, icon: DollarSign, trend: '+12.5%', up: true },
          { name: 'Total Orders', value: totalOrders, icon: ShoppingBag, trend: '+8.2%', up: true },
          { name: 'Active Entities', value: totalCustomers, icon: Users, trend: '+2.4%', up: true },
          { name: 'Catalog Size', value: totalProducts, icon: Package, trend: '+14.1%', up: true },
        ]);

        setRecentOrders(orders.slice(0, 5).map(o => ({
          id: `#ORD-${o.id.substring(0, 4).toUpperCase()}`,
          customer: o.profiles?.full_name || o.customer || 'Unknown',
          date: new Date(o.created_at).toLocaleDateString(),
          total: o.total,
          status: o.status
        })));

        // Process revenue over time (last 7 days)
        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toLocaleDateString();
        }).reverse();

        const revenueByDay = last7Days.map(date => {
          const dayTotal = orders
            .filter(o => new Date(o.created_at).toLocaleDateString() === date)
            .reduce((sum, o) => sum + o.total, 0);
          return { name: date.split('/')[0] + '/' + date.split('/')[1], revenue: dayTotal };
        });
        setRevenueData(revenueByDay);

        // Process category distribution
        const catMap = products.reduce((acc, p) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {});
        setCategoryData(Object.entries(catMap).map(([name, value]) => ({ name, value })));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-12 h-screen flex items-center justify-center bg-bg">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-12 bg-bg min-h-screen space-y-12"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-accent" />
          <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Operational Analytics</span>
        </div>
        <h1 className="text-5xl font-black text-primary uppercase tracking-tighter leading-none">System Matrix</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-4">Holistic telemetry and acquisition performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2.5rem] shadow-ethio border border-border group hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-bg rounded-2xl flex items-center justify-center border border-border group-hover:bg-primary transition-colors">
                <stat.icon size={20} className="text-primary group-hover:text-white" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend} {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-2">{stat.name}</p>
            <h3 className="text-2xl font-black text-primary tracking-tighter">
              {stat.name.includes('Revenue') ? formatPrice(stat.value) : stat.value.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3.5rem] shadow-ethio border border-border">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">Revenue Stream</h3>
            <TrendingUp size={20} className="text-accent" />
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '10px', fontWeight: 800 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3.5rem] shadow-ethio border border-border">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">Category Distribution</h3>
            <PieIcon size={20} className="text-accent" />
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-[3.5rem] shadow-ethio border border-border overflow-hidden">
          <div className="p-10 border-b border-border flex justify-between items-center">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">Recent Acquisitions</h3>
            <button className="text-accent font-black text-[10px] uppercase tracking-[0.25em] hover:text-primary transition-all underline decoration-2 underline-offset-4">Full Audit Log</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">ID</th>
                  <th className="px-10 py-6">Stakeholder</th>
                  <th className="px-10 py-6">Timestamp</th>
                  <th className="px-10 py-6">Amount</th>
                  <th className="px-10 py-6">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-bg/50 transition-colors group">
                    <td className="px-10 py-6 font-black text-[11px] text-primary">{order.id}</td>
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

        {/* System Activity */}
        <div className="bg-white rounded-[3.5rem] shadow-ethio border border-border p-10 flex flex-col">
          <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-10">System Relay</h3>
          <div className="space-y-10 flex-1">
            {[
              { text: 'Inventory injected: MacBook Air M3', time: '02h ago', icon: Package, color: 'text-primary' },
              { text: 'Stock alert: MX Master 3S low', time: '05h ago', icon: Clock, color: 'text-accent' },
              { text: 'Stakeholder join: Yosef B.', time: '24h ago', icon: Users, color: 'text-emerald-600' },
              { text: 'Manual override: #ORD-7825', time: '24h ago', icon: ShoppingBag, color: 'text-red-600' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-12 h-12 bg-bg rounded-2xl flex items-center justify-center shrink-0 border border-border group-hover:bg-primary/5 transition-colors">
                  <activity.icon size={18} className={activity.color} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-primary uppercase tracking-tight leading-snug mb-1 truncate">{activity.text}</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest opacity-60">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-5 bg-primary text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-lg active:scale-95">
            View All Telemetry
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
