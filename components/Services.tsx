
import React from 'react';
import { SERVICES } from '../constants';
import { Service } from '../types';

interface ServicesProps {
  onBook: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onBook }) => {
  return (
    <section id="services" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-rose-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">Our Expertise</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">Bespoke Event Florals</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">From majestic bridal entries to luxury car decor, we bring your floral dreams to life with the freshest blooms in Pakistan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group bg-floral rounded-3xl p-4 transition-all hover:shadow-2xl hover:-translate-y-2 border border-rose-50 flex flex-col h-full active:scale-[0.98]"
            >
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden mb-6">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 font-serif">{service.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-rose-50/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">From</span>
                    <span className="text-maroon font-bold text-sm md:text-base">{service.priceStart}</span>
                  </div>
                  <button 
                    onClick={() => onBook(service)}
                    className="p-2.5 bg-white rounded-full text-maroon hover:bg-maroon hover:text-white transition-all shadow-sm border border-rose-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
