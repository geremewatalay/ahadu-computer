import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const user = await authService.login(email, password);
      login(user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-10 md:p-12">
            <div className="text-center mb-10">
              <Link to="/" className="inline-flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-blue-900 font-black text-lg leading-none tracking-tight">AHADU</span>
                  <span className="text-amber-600 font-bold text-[10px] leading-none tracking-[0.2em] uppercase">Computer Trading</span>
                </div>
              </Link>
              <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tight mb-2">Welcome Back</h1>
              <p className="text-gray-500 font-medium">Login to your account to continue</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 text-red-700 text-sm font-medium">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@ahadu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors">
                    Forgot Password?
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 text-lg" 
                loading={loading}
              >
                Login <ArrowRight size={20} />
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 font-medium">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-900 font-black hover:text-amber-600 transition-colors">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
          
          <div className="bg-blue-900 p-6 text-center">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">
              Demo Admin: admin@ahadu.com / admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
