import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[12rem] font-black text-blue-900 leading-none mb-8 opacity-10"
        >
          404
        </motion.div>
        <div className="relative -mt-40">
          <h1 className="text-4xl font-black text-blue-900 mb-4 uppercase tracking-tight">Page Not Found</h1>
          <p className="text-gray-500 mb-10 text-lg">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-blue-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg"
            >
              <Home size={20} /> Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
            >
              <ArrowLeft size={20} /> Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
