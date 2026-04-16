import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-40 h-[70px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
           {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
  <img src="/src/assets/logo.svg" alt="Ahadu Logo" className="h-26 w-auto" />
  <div className="flex flex-col">
    <span className="text-primary font-extrabold text-lg leading-none tracking-tighter">
      AHADU
    </span>
    <span className="text-slate-400 font-bold text-[10px] leading-none tracking-widest uppercase">
      Computer Trading
    </span>
  </div>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-text hover:text-accent font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/cart" className="text-text hover:text-accent transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-primary font-semibold hover:text-accent text-sm transition-all"
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-text hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="text-primary font-semibold text-sm hover:text-accent"
                >
                  Sign In
                </Link>
                <Link 
                  to="/cart" 
                  className="bg-accent text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-blue-700 transition-all"
                >
                  Cart ({cartCount})
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="text-gray-600 relative">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-900"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-4 text-base font-semibold text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-3 text-blue-900 font-bold"
                      >
                        <LayoutDashboard size={20} />
                        Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}
                      className="flex items-center gap-2 px-3 py-3 text-red-600 font-bold"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-blue-900 text-white text-center py-3 rounded-lg font-bold"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
