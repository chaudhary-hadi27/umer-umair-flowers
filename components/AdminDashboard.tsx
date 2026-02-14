import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Booking, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'orders'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [allBookings, allOrders] = await Promise.all([
        storageService.getAllBookings(),
        storageService.getAllOrders()
      ]);
      setBookings(allBookings);
      setOrders(allOrders);
    } catch (err) {
      console.error('Data refresh error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'umair123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect Password');
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    const success = await storageService.updateBookingStatus(id, status);
    if (success) refreshData();
  };

  const handleUpdateOrderStatus = async (id: string, status: Order['status']) => {
    const success = await storageService.updateOrderStatus(id, status);
    if (success) refreshData();
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Delete this booking?')) {
      const success = await storageService.deleteBooking(id);
      if (success) refreshData();
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (window.confirm('Delete this order?')) {
      const success = await storageService.deleteOrder(id);
      if (success) refreshData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-floral px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-rose-100">
          <h2 className="text-3xl font-bold text-center text-maroon mb-8 font-serif">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-5 py-4 bg-floral text-gray-900 border border-rose-100/50 rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
              />
            </div>
            {error && <p className="text-rose-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-maroon text-white font-bold py-4 rounded-full shadow-lg">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-floral py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-serif">Umer & Umair Portal</h1>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'bookings' ? 'bg-maroon text-white' : 'bg-white text-gray-500 hover:bg-rose-50'}`}
              >
                Service Bookings ({bookings.length})
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-maroon text-white' : 'bg-white text-gray-500 hover:bg-rose-50'}`}
              >
                Direct Orders ({orders.length})
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {loading && <div className="animate-spin text-maroon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>}
            <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-rose-600 font-semibold">Logout</button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-rose-50">
          {activeTab === 'bookings' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-floral border-b border-rose-50">
                  <tr>
                    <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
                    <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase">Service</th>
                    <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-8 py-6 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-rose-50/30">
                      <td className="px-8 py-6">
                        <div className="font-bold">{b.customerName}</div>
                        <div className="text-sm text-rose-600">{b.phoneNumber}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-semibold text-maroon">{b.serviceType}</div>
                        <div className="text-xs text-gray-500">{b.location} • {b.date}</div>
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          className="text-xs font-bold p-1 rounded bg-white border border-rose-100 outline-none"
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => handleDeleteBooking(b.id)} className="text-gray-400 hover:text-rose-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && !loading && <tr><td colSpan={4} className="p-20 text-center text-gray-400 italic">No bookings found in database.</td></tr>}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-floral border-b border-rose-50">
                  <tr>
                    <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase">Order Details</th>
                    <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase">Items</th>
                    <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>
                    <th className="px-8 py-6 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-8 py-6 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-rose-50/30">
                      <td className="px-8 py-6">
                        <div className="text-xs font-mono text-gray-400 mb-1">{o.id}</div>
                        <div className="font-bold">{o.customerName}</div>
                        <div className="text-xs text-rose-600">{o.phoneNumber}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{o.address}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-xs space-y-1">
                          {o.items.map((item: any) => (
                            <div key={item.id} className="text-gray-600">• {item.name} x{item.quantity}</div>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-maroon text-sm">
                        Rs. {o.total.toLocaleString()}
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          className="text-xs font-bold p-1 rounded bg-white border border-rose-100 outline-none"
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => handleDeleteOrder(o.id)} className="text-gray-400 hover:text-rose-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && !loading && <tr><td colSpan={5} className="p-20 text-center text-gray-400 italic">No orders found in database.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;