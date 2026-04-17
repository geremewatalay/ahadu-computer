import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { motion } from 'motion/react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    try {
      const user = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      register(user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Decorative background elements */}
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
                  <img src="/src/assets/icon.svg" alt="Ahadu Icon" className="h-6 w-6 invert" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-primary font-black text-xl leading-none tracking-tighter">AHADU</span>
                  <span className="text-accent font-black text-[9px] leading-none tracking-[0.2em] uppercase">Computer Trading</span>
                </div>
              </Link>
              <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">Create Account</h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">Join the Ahadu community <br /> in Addis Ababa</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 text-red-700 text-sm font-medium">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                name="name"
                icon={User}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                icon={Mail}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button 
                type="submit" 
                variant="primary"
                size="lg"
                className="w-full mt-6" 
                loading={loading}
              >
                Register <ArrowRight size={20} />
              </Button>
            </form>

            <div className="mt-12 pt-10 border-t border-border text-center">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:underline">
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
