import React from 'react';
import { Link } from 'react-router-dom';

import { Wrench, Shield, Zap, Headphones, Settings, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

const Services = () => {
  const services = [
    {
      title: 'Laptop & Desktop Repair',
      description: 'Expert diagnostics and repair for all major brands. From screen replacements to motherboard repairs.',
      icon: Wrench,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'System Optimization',
      description: 'Speed up your slow computer. We perform deep cleaning, malware removal, and OS optimization.',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Hardware Upgrades',
      description: 'Boost your performance with RAM upgrades, SSD installations, and graphics card updates.',
      icon: Cpu,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Data Recovery',
      description: 'Lost your important files? We use advanced tools to recover data from damaged drives.',
      icon: Shield,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Network Setup',
      description: 'Professional home and office networking solutions. WiFi optimization and security.',
      icon: Settings,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'IT Consultation',
      description: 'Need advice on the best tech for your business? Our experts provide tailored recommendations.',
      icon: Headphones,
      color: 'bg-cyan-50 text-cyan-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-primary py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Technical Excellence</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter">Professional <br /> IT Services</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium">
            Beyond retail, we provide world-class technical support and repair services to keep your technology running smoothly.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-12 rounded-[3rem] border border-border hover:border-primary/20 hover:shadow-ethio transition-all duration-500 bg-white"
            >
              <div className={`w-20 h-20 ${service.color} rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-current/10`}>
                <service.icon size={36} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 bg-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-ethio border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 uppercase tracking-tighter">Need a Repair?</h2>
            <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto font-medium">
              Bring your device to our service center or schedule a consultation. Our technicians will diagnose the issue and provide a transparent quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="tel:+251911234567" 
                className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg"
              >
                Call Us Now
              </a>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto bg-accent text-primary px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
              >
                Book a Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
