import { Send, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-12 pb-6 px-6">
      <div className="container mx-auto grid md:grid-cols-3 gap-12 border-b border-gray-700 pb-12">
        <div>
          <h3 className="font-bold mb-4">Contact Info</h3>
          <p className="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
            <MapPin size={18} className="shrink-0 mt-1" />
            Vilegnagna, Addis Ababa, Ethiopia
          </p>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Links</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">Comments</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Newsletter</h3>
          <div className="flex bg-white/10 rounded overflow-hidden">
            <input 
              type="email" 
              placeholder="Signup..." 
              className="bg-transparent px-4 py-2 text-sm focus:outline-none flex-grow"
            />
            <button className="bg-blue-600 px-4 flex items-center justify-center hover:bg-blue-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
        <p>© 2026 Ahadu Computer Trading. All rights reserved.</p>
        <p>አሃዱ ኮምፒውተር ትሬዲንግ</p>
      </div>
    </footer>
  );
}