import { Search, User, LogIn, Phone, Mail } from 'lucide-react';

export default function Navbar() {
  const navLinks = ["Home", "Products", "Services", "About Us", "Support", "Contact"];

  return (
    <header className="w-full">
      {/* Top Utility Bar */}
      <div className="bg-primary-dark text-white text-xs py-2 px-6 flex justify-between items-center border-b border-gray-700">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Phone size={14} /> Contact Info</span>
        </div>
        <div className="flex gap-4">
          <button className="hover:text-secondary">Login</button>
          <button className="hover:text-secondary">Register</button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-primary-dark text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-xl">A</div>
          <div>
            <h1 className="font-bold text-sm tracking-tight leading-none">AHADU COMPUTER TRADING</h1>
            <p className="text-[10px] text-gray-300">አሃዱ ኮምፒውተር ትሬዲንግ</p>
          </div>
        </div>

        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <a key={link} href="#" className={`text-sm font-medium hover:text-secondary transition-colors ${link === 'Home' ? 'bg-blue-600 px-3 py-1 rounded' : ''}`}>
              {link}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}