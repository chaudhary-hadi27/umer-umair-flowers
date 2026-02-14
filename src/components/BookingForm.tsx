import React, { useState } from 'react';
import { Service } from '../../types.ts';
import { storageService } from '../services/storageService.ts';

interface BookingFormProps {
  preselectedService?: Service;
  onSuccess: () => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ preselectedService, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    serviceType: preselectedService?.title || 'Luxury Car Decoration',
    date: '',
    location: '',
    specialInstructions: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await storageService.saveBooking(formData);
      if (result) {
        onSuccess();
      } else {
        alert("There was an issue processing your booking. Please try again or contact us via WhatsApp.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-rose-50">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-maroon mb-2 font-serif">Request a Booking</h2>
        <p className="text-gray-500">Share your details and we'll contact you to confirm the design.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Full Name</label>
            <input 
              required
              type="text"
              className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              placeholder="e.g. Ali Ahmed"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
            <input 
              required
              type="tel"
              className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 transition-all outline-none"
              placeholder="+92 300 1234567"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Needed</label>
            <select 
              className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none"
              value={formData.serviceType}
              onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            >
              <option>Luxury Car Decoration</option>
              <option>Event Stage Floral</option>
              <option>Premium Bridal Bouquets</option>
              <option>Flower Jewelry (Gajray)</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
            <input 
              required
              type="date"
              className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location in City</label>
          <input 
            required
            type="text"
            className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none"
            placeholder="e.g. Gulberg, Lahore"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Special Notes (Optional)</label>
          <textarea 
            rows={3}
            className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none"
            placeholder="Mention car model or specific flower colors..."
            value={formData.specialInstructions}
            onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 bg-maroon text-white font-bold py-4 rounded-full shadow-lg hover:shadow-rose-200 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Confirm Request'}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-8 py-4 text-gray-500 font-semibold hover:text-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;