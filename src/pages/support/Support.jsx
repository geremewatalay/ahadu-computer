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
      className="bg-white min-h-screen pb-24"
    >
      {/* Hero */}
      <section className="bg-blue-900 py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Support Center</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            How can we help you today? Find answers, guides, and contact our support team.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <Book size={32} />
            </div>
            <h3 className="text-2xl font-black text-blue-900 mb-4">User Guides</h3>
            <p className="text-gray-500 mb-6">Learn how to set up and optimize your new hardware.</p>
            <button className="text-blue-900 font-bold hover:underline">Read Guides</button>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Shield size={32} />
            </div>
            <h3 className="text-2xl font-black text-blue-900 mb-4">Warranty Info</h3>
            <p className="text-gray-500 mb-6">Check your product warranty status and coverage details.</p>
            <button className="text-blue-900 font-bold hover:underline">Check Warranty</button>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-blue-900 mb-4">Live Chat</h3>
            <p className="text-gray-500 mb-6">Talk to our technical experts for immediate assistance.</p>
            <button className="text-blue-900 font-bold hover:underline">Start Chat</button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <HelpCircle className="text-amber-500" size={24} />
                {faq.q}
              </h4>
              <p className="text-gray-600 leading-relaxed ml-9">
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
