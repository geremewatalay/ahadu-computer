import React from 'react';
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
      <section className="bg-blue-900 py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Professional IT Services</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
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
              className="group p-10 rounded-[2.5rem] border border-gray-100 hover:border-blue-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-current/10`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-blue-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-6 uppercase tracking-tight">Need a Repair?</h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              Bring your device to our service center or schedule a consultation. Our technicians will diagnose the issue and provide a transparent quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+251911234567" 
                className="w-full sm:w-auto bg-blue-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg"
              >
                Call Us Now
              </a>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto bg-amber-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-all shadow-lg"
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
