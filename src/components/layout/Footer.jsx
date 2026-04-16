import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="bg-accent p-2 rounded-xl">
                <img src="/src/assets/logo.svg" alt="Ahadu Icon" className="h-6 w-6" />
              </div>
              <span className="text-white font-black text-2xl tracking-tighter">AHADU</span>
            </Link>
            <p className="text-blue-100/60 max-w-sm leading-relaxed font-medium">
              Ethiopia's premier destination for high-performance computing. We empower professionals and businesses with the latest technology and local expertise.
            </p>
          </div>
          
          <div>
            <h4 className="text-accent font-black text-xs uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-blue-100/60 hover:text-white transition-colors text-sm font-bold">Products</Link></li>
              <li><Link to="/services" className="text-blue-100/60 hover:text-white transition-colors text-sm font-bold">Services</Link></li>
              <li><Link to="/about" className="text-blue-100/60 hover:text-white transition-colors text-sm font-bold">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-100/60 hover:text-white transition-colors text-sm font-bold">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-accent font-black text-xs uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/support" className="text-blue-100/60 hover:text-white transition-colors text-sm font-bold">Help Center</Link></li>
              <li><a href="#" className="text-blue-100/60 hover:text-white transition-colors text-sm font-bold">Warranty Policy</a></li>
              <li><a href="#" className="text-blue-100/60 hover:text-white transition-colors text-sm font-bold">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-blue-100/40 font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Ahadu Computer Trading. Built with Pride in Ethiopia.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-blue-100/40 font-black uppercase tracking-[0.2em]">HP Partner</span>
            <span className="text-[10px] text-blue-100/40 font-black uppercase tracking-[0.2em]">Dell Authorized</span>
            <span className="text-[10px] text-blue-100/40 font-black uppercase tracking-[0.2em]">Lenovo Expert</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
