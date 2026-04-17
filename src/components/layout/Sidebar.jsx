import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  HelpCircle,
  Home
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
  ];

  const secondaryItems = [
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
    { name: 'Back to Site', icon: Home, path: '/' },
  ];

  return (
    <aside className="w-80 bg-white border-r border-border flex flex-col h-full relative z-30 shadow-sm">
      <div className="p-10">
        <div className="mb-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary rounded-[1.25rem] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-ethio">
              <span className="text-white font-black text-xl italic uppercase font-mono tracking-tighter">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-black text-xs uppercase tracking-[0.2em] leading-none">Ahadu Trading</span>
              <span className="text-accent font-black text-[9px] uppercase tracking-[0.3em] mt-1 leading-none border-t border-accent/20 pt-1">Admin Core</span>
            </div>
          </Link>
        </div>

        <div className="space-y-12">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 mb-4 block">Main Registry</span>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all group relative overflow-hidden
                      ${isActive 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'text-slate-500 hover:bg-bg hover:text-primary'
                      }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                      />
                    )}
                    <item.icon size={18} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-accent' : 'group-hover:text-primary'} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 mb-4 block">Auxiliary</span>
            <nav className="space-y-2">
              {secondaryItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-bg hover:text-primary transition-all group"
                >
                  <item.icon size={18} className="group-hover:text-primary" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-auto p-10">
        <div className="bg-bg p-6 rounded-[2rem] border border-border relative overflow-hidden group">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center shrink-0">
              <span className="text-primary font-black text-sm">JS</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-primary font-black text-[11px] uppercase truncate">Admin Root</span>
              <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">Ahadu System</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
