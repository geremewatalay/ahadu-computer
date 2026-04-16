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
      className="bg-white min-h-screen pb-24"
    >
      {/* Header */}
      <section className="bg-gray-50 py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 mb-6 uppercase tracking-tight">Get in Touch</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have a question or need technical support? Our team is here to help you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-900 text-white p-10 rounded-[2.5rem] shadow-xl">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-lg font-bold">+251 905 027 162</p>
                    <p className="text-lg font-bold">+251 984 249 649</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-lg font-bold">info@ahaducomputer.com</p>
                    <p className="text-lg font-bold">support@ahaducomputer.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-lg font-bold leading-snug">Bole Road, Mega Building, 3rd Floor, Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-6">Business Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Monday - Friday</span>
                  <span className="text-blue-900 font-bold">8:30 AM - 6:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Saturday</span>
                  <span className="text-blue-900 font-bold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Sunday</span>
                  <span className="text-amber-600 font-bold uppercase text-xs tracking-widest">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-2xl">
              <h2 className="text-3xl font-black text-blue-900 mb-8 uppercase tracking-tight">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" placeholder="John Doe" />
                  <Input label="Email Address" type="email" placeholder="john@example.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Phone Number" placeholder="+251 9..." />
                  <Input label="Subject" placeholder="Inquiry about..." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                  <textarea 
                    rows="5" 
                    placeholder="How can we help you?"
                    className="px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-900 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <Button className="w-full py-5 text-lg">
                  <Send size={20} /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-96 bg-gray-100 rounded-[3rem] overflow-hidden relative border border-gray-200">
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <MapPin size={48} className="text-blue-900 animate-bounce" />
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em]">Interactive Map Coming Soon</p>
          </div>
          <img 
            src="https://picsum.photos/seed/addis-map/1200/400?grayscale" 
            alt="Map" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
