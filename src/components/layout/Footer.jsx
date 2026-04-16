import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs text-slate-400 font-medium">
              © {new Date().getFullYear()} Ahadu Computer Trading. All rights reserved.
            </p>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              Authorized Partner of HP, Dell, and Lenovo
            </p>
          </div>
          
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link to="/about" className="hover:text-accent transition-colors">About</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <Link to="/support" className="hover:text-accent transition-colors">Support</Link>
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;