
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Shop from './components/Shop';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutForm from './components/CheckoutForm';
import WhatsAppButton from './components/WhatsAppButton';
import { ViewState, Service, Product, OrderItem } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('umair_cart');
    const savedWishlist = localStorage.getItem('umair_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('umair_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('umair_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleBookService = (service?: Service) => {
    setSelectedService(service);
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleBookingSuccess = () => {
    alert("Thank you! Your booking request has been received. Our team will contact you on WhatsApp shortly.");
    setCurrentView('home');
  };

  const handleOrderSuccess = () => {
    alert("Order Placed Successfully! We will call you to confirm your delivery in Lahore.");
    setCart([]);
    setCurrentView('home');
  };

  if (currentView === 'admin') {
    return (
      <>
        <Navbar 
          onNavigate={setCurrentView} 
          currentView={currentView} 
          cartCount={cart.length} 
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />
        <AdminDashboard />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        onNavigate={setCurrentView} 
        currentView={currentView} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <WhatsAppButton />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={(id) => setWishlist(prev => prev.filter(i => i.id !== id))}
        onMoveToCart={(product) => {
          handleAddToCart(product);
          setWishlist(prev => prev.filter(i => i.id !== product.id));
          setIsWishlistOpen(false);
        }}
      />
      
      {currentView === 'home' && (
        <main className="animate-in fade-in duration-700">
          <Hero onBook={() => handleBookService()} />
          
          {/* Shop is now first after Hero */}
          <Shop 
            onAddToCart={handleAddToCart} 
            onToggleWishlist={handleToggleWishlist} 
            wishlistIds={wishlist.map(i => i.id)}
          />

          <Services onBook={handleBookService} />
          
          <section className="py-20 bg-maroon text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 font-serif">A Legacy of Floral Excellence</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <div className="text-5xl font-bold text-gold mb-2">5000+</div>
                  <p className="text-rose-100 uppercase tracking-widest text-sm font-bold">Events Stylized</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gold mb-2">150+</div>
                  <p className="text-rose-100 uppercase tracking-widest text-sm font-bold">Master Florists</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gold mb-2">2018</div>
                  <p className="text-rose-100 uppercase tracking-widest text-sm font-bold">Established</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/floral-paper.png')]"></div>
          </section>

          <Testimonials />
          <Contact />
          
          <footer className="bg-white border-t border-rose-100 py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-maroon font-serif text-3xl font-bold mb-4 tracking-tighter">Umer & Umair Flowers</p>
              <p className="text-gray-500 text-sm italic mb-12 max-w-md mx-auto leading-relaxed text-center">Defining the art of luxury floral design in Pakistan for those who appreciate the finer things in life.</p>
              
              <div className="border-t border-rose-50 pt-8 mt-8">
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">© 2024 UMER & UMAIR FLOWERS • ALL RIGHTS RESERVED</p>
                <button 
                  onClick={() => setCurrentView('admin')}
                  className="mt-6 text-[10px] text-gray-300 hover:text-maroon transition-colors uppercase font-bold tracking-widest"
                >
                  Administrator Portal
                </button>
              </div>
            </div>
          </footer>
        </main>
      )}

      {currentView === 'booking' && (
        <div className="pt-32 pb-24 px-4 bg-floral min-h-screen">
          <BookingForm 
            preselectedService={selectedService}
            onSuccess={handleBookingSuccess}
            onCancel={() => setCurrentView('home')}
          />
        </div>
      )}

      {currentView === 'checkout' && (
        <div className="pt-32 pb-24 px-4 bg-floral min-h-screen">
          <CheckoutForm 
            items={cart}
            onSuccess={handleOrderSuccess}
            onCancel={() => {
              setCurrentView('home');
              setIsCartOpen(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
