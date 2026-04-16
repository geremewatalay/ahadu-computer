import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';
import { User, Mail, Lock, Save, Camera } from 'lucide-react';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    // For now, we update the local auth state
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    login(updatedUser);
    
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 bg-primary/50 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border-4 border-white/20 overflow-hidden shadow-2xl">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-accent/50" />
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-accent p-3 rounded-2xl text-primary hover:scale-110 transition-transform shadow-xl">
                <Camera size={18} />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{user?.name}</h1>
              <p className="text-accent font-bold tracking-widest uppercase text-xs">{user?.email}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-white/10">
                  {user?.role || 'Customer'}
                </span>
                <span className="px-4 py-1.5 bg-accent/20 text-accent rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-accent/20">
                  Verified Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h2 className="text-lg font-black text-primary uppercase tracking-widest flex items-center gap-2">
                  <User size={20} className="text-accent" />
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full bg-bg border-2 border-border rounded-2xl px-5 py-4 text-sm font-bold text-primary focus:outline-none focus:border-accent disabled:opacity-60 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full bg-bg border-2 border-border rounded-2xl px-5 py-4 text-sm font-bold text-primary focus:outline-none focus:border-accent disabled:opacity-60 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-6">
                <h2 className="text-lg font-black text-primary uppercase tracking-widest flex items-center gap-2">
                  <Lock size={20} className="text-accent" />
                  Security
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="••••••••"
                      className="w-full bg-bg border-2 border-border rounded-2xl px-5 py-4 text-sm font-bold text-primary focus:outline-none focus:border-accent disabled:opacity-60 transition-all placeholder:text-slate-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="••••••••"
                      className="w-full bg-bg border-2 border-border rounded-2xl px-5 py-4 text-sm font-bold text-primary focus:outline-none focus:border-accent disabled:opacity-60 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 border-t border-border flex justify-end gap-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-ethio"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-white text-slate-500 border-2 border-border px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-accent text-primary px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
