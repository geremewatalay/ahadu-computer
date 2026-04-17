import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';
import { User, Mail, Lock, Save, Camera, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, profile, updateProfile, updateUser, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

  // Update form data when profile is loaded
  React.useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || '',
        email: user?.email || ''
      }));
    }
  }, [profile, user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Synchronizing Cluster...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', text: '' });
    
    try {
      // 1. Update Profile (table)
      if (formData.name !== profile?.full_name) {
        const profileResult = await updateProfile({ full_name: formData.name });
        if (!profileResult.success) throw new Error(profileResult.error);
      }

      // 2. Update Auth User (email/password)
      const authUpdates = {};
      if (formData.email !== user?.email) authUpdates.email = formData.email;
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        authUpdates.password = formData.newPassword;
      }

      if (Object.keys(authUpdates).length > 0) {
        const authResult = await updateUser(authUpdates);
        if (!authResult.success) throw new Error(authResult.error);
      }
      
      setIsEditing(false);
      setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      setStatus({ type: 'success', text: 'Identity Protocol Updated Successfully.' });
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'System Update Failed.' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="bg-bg min-h-screen pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-[2px] bg-accent" />
          <span className="text-accent font-black text-[10px] uppercase tracking-[0.3em]">Stakeholder Identity</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar / Profile Summary */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] shadow-ethio border border-border overflow-hidden"
            >
              <div className="bg-primary p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl mx-auto mb-6 border-2 border-white/20 flex items-center justify-center p-1">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <div className="w-full h-full bg-accent/20 flex items-center justify-center rounded-2xl">
                        <User size={40} className="text-accent" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-white font-black text-xl uppercase tracking-tighter line-clamp-1">{profile?.full_name}</h2>
                  <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest mt-1">{profile?.role || 'Customer'}</p>
                </div>
              </div>
              
              <div className="p-8 space-y-2">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-bg text-primary font-black text-[10px] uppercase tracking-widest hover:bg-accent/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-accent" />
                    Account Overview
                  </div>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 rounded-2xl text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LogOut size={16} />
                    System Logout
                  </div>
                </button>
              </div>
            </motion.div>

            <div className="bg-primary p-10 rounded-[3rem] shadow-ethio text-white">
              <h3 className="text-accent font-black text-[10px] uppercase tracking-[0.2em] mb-4">Ahadu Rewards</h3>
              <p className="font-medium text-white/60 text-sm mb-6 leading-relaxed">You have accumulated <span className="text-white font-black">2,450 points</span> through technical acquisitions.</p>
              <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-white/20 transition-all">
                Redeem Benefits
              </button>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[4rem] shadow-ethio border border-border p-10 md:p-16"
            >
              <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">Core Profile</h1>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-widest hover:underline"
                  >
                    Modify Data
                  </button>
                )}
              </div>

              {status.text && (
                <div className={`mb-10 p-5 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border-2 ${
                  status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                }`}>
                  <Save size={18} />
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Public Identity</h3>
                    
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full bg-bg border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold text-primary disabled:opacity-40 transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Electronic Mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full bg-bg border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold text-primary disabled:opacity-40 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Security Protocol</h3>
                    
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">New Access Key</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="••••••••"
                        className="w-full bg-bg border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold text-primary disabled:opacity-40 transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Access Key</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="••••••••"
                        className="w-full bg-bg border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold text-primary disabled:opacity-40 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-10 flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-ethio disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {saving ? 'Processing Update...' : (
                        <>
                          <Save size={18} />
                          Commit Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-bg text-slate-400 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
                      Abort
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
