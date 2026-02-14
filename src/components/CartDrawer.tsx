
import React from 'react';
import { OrderItem } from '../../types.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-rose-50 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-maroon font-serif">Shopping Bag</h2>
            <button onClick={onClose} className="p-2 hover:bg-floral rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-floral rounded-full flex items-center justify-center text-rose-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                </div>
                <div>
                  <p className="text-gray-900 font-bold">Your bag is empty</p>
                  <p className="text-gray-500 text-sm">Add some beautiful blooms to get started!</p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 border border-maroon text-maroon rounded-full text-sm font-bold hover:bg-maroon hover:text-white transition-all"
                >
                  Browse Shop
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-floral rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                    <p className="text-maroon font-bold text-sm mt-1">Rs. {item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-lg border border-rose-100 flex items-center justify-center text-gray-500 hover:border-maroon hover:text-maroon transition-all"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-lg border border-rose-100 flex items-center justify-center text-gray-500 hover:border-maroon hover:text-maroon transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-rose-50 bg-floral/30 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-xl font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 text-center">Taxes and delivery calculated at checkout.</p>
              <button 
                onClick={onCheckout}
                className="w-full bg-maroon text-white font-bold py-4 rounded-full shadow-lg hover:bg-rose-900 transition-all flex items-center justify-center gap-3"
              >
                Proceed to Checkout
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
