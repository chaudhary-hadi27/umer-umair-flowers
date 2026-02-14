
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-floral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl overflow-hidden relative border border-rose-50 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-maroon mb-6 font-serif">Visit Our Studio</h2>
            <p className="text-gray-600 mb-10">We invite you to our showroom to see our fresh collection and discuss your event decor in person.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Flagship Shop</h4>
                  <p className="text-gray-500">Shop #12, Liberty Market, Gulberg III, Lahore, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Call / WhatsApp</h4>
                  <p className="text-gray-500 font-bold">+92 321 4455667</p>
                  <div className="mt-2 p-3 bg-floral rounded-xl border border-rose-50">
                    <p className="text-[10px] uppercase font-bold text-maroon tracking-widest mb-1">Payment Wallets</p>
                    <p className="text-xs text-gray-600 italic">EasyPaisa & JazzCash: 0321-4455667</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Working Hours</h4>
                  <p className="text-gray-500">Mon - Sun: 10:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[400px] rounded-3xl overflow-hidden bg-rose-100 relative group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-maroon/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-2xl animate-bounce">
              <div className="w-4 h-4 bg-maroon rounded-full"></div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg">
              <p className="text-sm font-bold">Umer & Umair Flowers Studio</p>
              <p className="text-xs text-gray-500">Liberty Market, Lahore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
