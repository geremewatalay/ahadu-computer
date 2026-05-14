import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen pb-24"
    >
      {/* Header */}
      <section className="bg-bg py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Contact Ahadu</span>
            <span className="w-8 h-[2px] bg-accent" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-primary mb-8 uppercase tracking-tighter leading-none">Connect with Us</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest max-w-lg mx-auto leading-loose">
            Expert technical support and professional <br /> sales consultations in the heart of Addis Ababa.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-primary text-white p-12 rounded-[4rem] shadow-ethio relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />
              <h3 className="text-2xl font-black mb-12 uppercase tracking-tight">Direct Access</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-accent/30 transition-colors">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1.5 leading-none">Call Support</p>
                    <p className="text-lg font-black tracking-tight leading-none mb-2">+251 911 234 567</p>
                    <p className="text-lg font-black tracking-tight leading-none text-accent">+251 116 678 901</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-accent/30 transition-colors">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1.5 leading-none">Email Inquiry</p>
                    <p className="text-lg font-black tracking-tight leading-none mb-2">info@ahadu.com</p>
                    <p className="text-lg font-black tracking-tight leading-none text-accent">sales@ahadu.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-accent/30 transition-colors">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1.5 leading-none">Main Office</p>
                    <p className="text-lg font-black tracking-tight leading-snug">Bole Road, Mega Building, <br /> 3rd Floor, Addis Ababa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] border border-border shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.2em] ml-1">Trade Hours</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center group">
                  <span className="text-primary font-black text-xs uppercase tracking-widest">Mon — Fri</span>
                  <div className="h-[1px] flex-1 mx-4 bg-border/40" />
                  <span className="text-primary font-black text-xs tracking-tight">08:30 — 18:30</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-primary font-black text-xs uppercase tracking-widest">Saturday</span>
                  <div className="h-[1px] flex-1 mx-4 bg-border/40" />
                  <span className="text-primary font-black text-xs tracking-tight">09:00 — 17:00</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-primary font-black text-xs uppercase tracking-widest">Sunday</span>
                  <div className="h-[1px] flex-1 mx-4 bg-border/40" />
                  <span className="text-accent font-black text-xs uppercase tracking-widest">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-border shadow-ethio overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-4xl font-black text-primary mb-12 uppercase tracking-tighter leading-none relative z-10">Send a Brief</h2>
              <form className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Identity" placeholder="Full Name" />
                  <Input label="Coordinates" type="email" placeholder="Email Address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Direct Line" placeholder="Phone Number" />
                  <Input label="Purpose" placeholder="Subject of Inquiry" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Message Content</label>
                  <textarea 
                    rows="6" 
                    placeholder="Describe your technical needs..."
                    className="w-full bg-bg border-2 border-transparent px-8 py-6 rounded-[2rem] text-primary font-bold placeholder:text-slate-300 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none shadow-sm"
                  ></textarea>
                </div>
                <Button variant="primary" size="lg" className="w-full mt-6 shadow-xl group">
                  Send Transmission <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[500px] bg-white rounded-[5rem] overflow-hidden relative border-4 border-white shadow-ethio group">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-primary mb-6 shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <MapPin size={48} className="animate-bounce" />
            </div>
            <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Bole, Addis Ababa</h3>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Mega Building, 3rd Floor</p>
          </div>
          <img 
            src="https://picsum.photos/seed/addis-map/1200/800?grayscale" 
            alt="Map" 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 group-hover:opacity-20 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[20px] border-white pointer-events-none z-20 rounded-[5rem]" />
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
