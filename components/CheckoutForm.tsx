
import React, { useState } from 'react';
import { OrderItem } from '../types';
import { storageService } from '../services/storageService';

interface CheckoutFormProps {
  items: OrderItem[];
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ items, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await storageService.saveOrder({
        ...formData,
        items,
        total
      });
      if (result) {
        onSuccess();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-[32px] p-8 shadow-xl border border-rose-50">
        <h2 className="text-3xl font-bold text-maroon mb-8 font-serif">Delivery Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Name</label>
            <input 
              required
              type="text"
              className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              placeholder="Full Name"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
            <input 
              required
              type="tel"
              className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              placeholder="+92 3XX XXXXXXX"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address in Lahore</label>
            <textarea 
              required
              rows={3}
              className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              placeholder="House #, Street, Block, Area Name"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-4 space-y-4">
            <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 space-y-3">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-rose-500 mt-1 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                <div className="text-xs text-rose-900 leading-relaxed">
                  <strong className="block mb-1">Payment Options:</strong>
                  <ul className="space-y-1">
                    <li>• Cash on Delivery (COD)</li>
                    <li>• EasyPaisa: <span className="font-black">0321-4455667</span></li>
                    <li>• JazzCash: <span className="font-black">0321-4455667</span></li>
                  </ul>
                  <p className="mt-2 text-[10px] opacity-70">Please send a screenshot of the receipt to our WhatsApp after payment.</p>
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-maroon text-white font-bold py-4 rounded-full shadow-lg hover:shadow-rose-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing Order...' : 'Place Order Now'}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-4 text-gray-500 font-semibold hover:text-gray-700 transition-colors"
            >
              Go Back to Bag
            </button>
          </div>
        </form>
      </div>

      <div className="bg-floral/50 rounded-[32px] p-8 h-fit border border-rose-100/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Order Summary</h3>
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{item.name} <span className="text-gray-400 ml-1">x{item.quantity}</span></span>
              <span className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-rose-100 pt-4 space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Delivery Fee</span>
            <span>Rs. 250</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold text-maroon pt-2">
            <span>Total</span>
            <span>Rs. {(total + 250).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
