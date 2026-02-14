
import React from 'react';
import { Product } from '../../types.ts';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, items, onRemove, onMoveToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-rose-50 flex justify-between items-center bg-rose-50/30">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-rose-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <h2 className="text-2xl font-bold text-maroon font-serif">Wishlist</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-floral rounded-full flex items-center justify-center text-rose-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <div>
                  <p className="text-gray-900 font-bold">Your wishlist is empty</p>
                  <p className="text-gray-500 text-sm">Save your favorite blooms for later!</p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 border border-maroon text-maroon rounded-full text-sm font-bold hover:bg-maroon hover:text-white transition-all"
                >
                  Discover Flowers
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="group relative flex gap-4 p-4 rounded-3xl border border-rose-50 hover:border-rose-200 transition-all bg-floral/20">
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-400 hover:text-rose-500 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                  <div className="w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 leading-tight mb-1">{item.name}</h3>
                    <p className="text-maroon font-bold text-sm mb-3">Rs. {item.price.toLocaleString()}</p>
                    <button 
                      onClick={() => onMoveToCart(item)}
                      className="text-xs font-bold uppercase tracking-widest text-rose-500 hover:text-maroon flex items-center gap-1 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-6 bg-floral/50 border-t border-rose-50 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Saved for your special moments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
