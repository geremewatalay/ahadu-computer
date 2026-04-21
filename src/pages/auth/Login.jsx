import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
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
      // 1. Login user
      const data = await login(email, password);

      if (!data?.user) {
        throw new Error('Login failed');
      }

      // 2. Get profile role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      // 3. Handle profile error safely
      if (profileError || !profile) {
        console.error(profileError);
        navigate('/', { replace: true });
        return;
      }

      // 4. Role-based redirect
      if (profile.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (err) {
      setError(err.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 py-20 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[4rem] shadow-ethio overflow-hidden border border-border">
          <div className="p-10 md:p-14">

            <div className="text-center mb-12">
              <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
                <div className="bg-primary p-2.5 rounded-2xl group-hover:rotate-6 transition-transform shadow-lg">
                  <img src="/src/assets/logo.svg" alt="Ahadu Icon" className="h-6 w-6 invert" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-primary font-black text-xl leading-none tracking-tighter">AHADU</span>
                  <span className="text-accent font-black text-[9px] uppercase tracking-[0.2em]">
                    Computer Trading
                  </span>
                </div>
              </Link>

              <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">
                Welcome Back
              </h1>

              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Login to your account
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 text-red-700 text-sm font-medium">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Login <ArrowRight size={20} />
              </Button>
            </form>

            <div className="mt-12 pt-10 border-t border-border text-center">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Don't have an account?{' '}
                <Link to="/register" className="text-accent hover:underline">
                  Register Now
                </Link>
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;