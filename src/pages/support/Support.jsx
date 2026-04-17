import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Book, MessageCircle, Phone, FileText, Shield } from 'lucide-react';

const Support = () => {
  const faqs = [
    { q: 'What is your return policy?', a: 'We offer a 7-day return policy for hardware defects. The product must be in its original packaging.' },
    { q: 'Do you provide official warranties?', a: 'Yes, all our products come with official manufacturer warranties, typically ranging from 1 to 3 years.' },
    { q: 'Do you offer home delivery?', a: 'Yes, we provide fast delivery services across Addis Ababa and major cities in Ethiopia.' },
    { q: 'Can I pay on delivery?', a: 'We currently accept bank transfers, mobile money (Telebirr, CBE Birr), and cash at our physical store.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen pb-24"
    >
      {/* Hero */}
      <section className="bg-primary py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent font-black text-[10px] uppercase tracking-[0.2em]">Ahadu Help Center</span>
            <span className="w-8 h-[2px] bg-accent" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-none">Support Hub</h1>
          <p className="text-white/40 font-bold text-xs uppercase tracking-widest max-w-lg mx-auto leading-loose">
            Troubleshooting, manuals, and expert <br /> technical guidance at your fingertips.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-12 rounded-[4rem] shadow-ethio border border-border text-center group hover:-translate-y-3 transition-all duration-500">
            <div className="w-20 h-20 bg-primary/5 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
              <Book size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight">Manuals</h3>
            <p className="text-slate-400 font-medium text-sm mb-10 tracking-tight leading-relaxed">Deep-dive technical documentation for hardware optimization.</p>
            <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 mx-auto">
              Access Library <span className="text-lg">&rarr;</span>
            </button>
          </div>
          <div className="bg-white p-12 rounded-[4rem] shadow-ethio border border-border text-center group hover:-translate-y-3 transition-all duration-500">
            <div className="w-20 h-20 bg-accent/10 text-accent rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-sm">
              <Shield size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight">Warranty</h3>
            <p className="text-slate-400 font-medium text-sm mb-10 tracking-tight leading-relaxed">Validate your product coverage and official service history.</p>
            <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 mx-auto">
              Check Status <span className="text-lg">&rarr;</span>
            </button>
          </div>
          <div className="bg-white p-12 rounded-[4rem] shadow-ethio border border-border text-center group hover:-translate-y-3 transition-all duration-500">
            <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
              <MessageCircle size={36} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight">Concierge</h3>
            <p className="text-slate-400 font-medium text-sm mb-10 tracking-tight leading-relaxed">Live transmission with our Addis Ababa based technical team.</p>
            <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 mx-auto">
              Start Session <span className="text-lg">&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-primary/5 rounded-full mb-4">
            <span className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">Common Solutions</span>
          </div>
          <h2 className="text-5xl font-black text-primary uppercase tracking-tighter">Knowledge Base</h2>
        </div>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm group hover:border-primary/20 transition-all duration-500">
              <h4 className="text-xl font-black text-primary mb-6 flex items-start gap-5 tracking-tight uppercase">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors">
                  <HelpCircle size={22} strokeWidth={3} />
                </div>
                {faq.q}
              </h4>
              <p className="text-slate-600 font-medium leading-[1.8] ml-14 tracking-tight border-l-2 border-accent/20 pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Support;
