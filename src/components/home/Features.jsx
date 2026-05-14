import React from 'react';
import { ShieldCheck, Truck, Clock, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Genuine Products',
      description: 'We only sell 100% authentic hardware from world-leading brands with official warranties.',
      icon: ShieldCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery services across Addis Ababa and major Ethiopian cities.',
      icon: Truck,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      title: 'Expert Support',
      description: 'Our certified technicians are always ready to help you with any technical issues.',
      icon: Clock,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Best Pricing',
      description: 'Competitive market prices for premium hardware, ensuring you get the best value.',
      icon: Award,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <section className="py-24 bg-blue-900 text-white overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800 rounded-full -ml-32 -mb-32 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Why Choose Ahadu?</h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">
            We are committed to providing the best technology solutions with unmatched service quality in the Ethiopian market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 ${feature.bg} rounded-3xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                <feature.icon size={36} className={feature.color} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-blue-100/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
