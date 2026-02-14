
import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, cartCount, wishlistCount, onOpenCart, onOpenWishlist }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-2 border-b border-rose-100 shadow-sm' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex-shrink-0 cursor-pointer group active:scale-95 transition-transform"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-lg md:text-2xl font-bold tracking-tighter text-maroon flex items-center gap-2">
              <span className="text-rose-500 animate-float text-xl md:text-2xl">❀</span>
              <span className="hidden xs:inline uppercase">Umer & Umair</span>
              <span className="xs:hidden uppercase">U & U</span>
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {['Collection', 'Shop', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  if (item === 'Collection') onNavigate('home');
                  else {
                    const el = document.getElementById(item.toLowerCase());
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] hover:text-rose-500 transition-colors ${currentView === 'home' && item === 'Collection' ? 'text-rose-600' : 'text-gray-500'}`}
              >
                {item}
              </button>
            ))}
            
            <div className="h-4 w-px bg-rose-200 mx-2"></div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onOpenWishlist}
                className="p-2 text-gray-500 hover:text-rose-500 transition-all relative active:scale-125 group"
                aria-label="Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-rose-50"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-heart-pop shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button 
                onClick={onOpenCart}
                className="p-2 text-gray-500 hover:text-maroon transition-all relative active:scale-125 group"
                aria-label="Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-maroon/10"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-maroon text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => onNavigate('booking')}
                className="bg-maroon text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-950 transition-all shadow-xl shadow-maroon/20 active:scale-95 border-2 border-maroon"
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={onOpenWishlist} className="p-2 relative active:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              {wishlistCount > 0 && <span className="absolute top-1 right-1 bg-rose-500 w-2.5 h-2.5 rounded-full border border-white"></span>}
            </button>
            <button onClick={onOpenCart} className="p-2 relative active:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {cartCount > 0 && <span className="absolute top-1 right-1 bg-maroon w-2.5 h-2.5 rounded-full border border-white"></span>}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-maroon active:scale-90 transition-transform"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-rose-100 p-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-500 rounded-b-[40px]">
          <div className="grid grid-cols-1 gap-4">
            {['Collection', 'Shop', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (item === 'Collection') onNavigate('home');
                  else {
                    const el = document.getElementById(item.toLowerCase());
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="py-4 px-6 bg-floral rounded-2xl text-[10px] font-black uppercase tracking-widest text-maroon flex justify-between items-center group active:bg-rose-50"
              >
                {item}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              onNavigate('booking');
            }}
            className="w-full bg-maroon text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-maroon/20 active:scale-[0.98] transition-all"
          >
            Request VIP Booking
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
