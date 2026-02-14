
import React, { useState } from 'react';
import { PRODUCTS } from '../../constants.tsx';
import { Product } from '../../types.ts';

interface ShopProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

const Shop: React.FC<ShopProps> = ({ onAddToCart, onToggleWishlist, wishlistIds }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | Product['category']>('all');

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 md:mb-16 gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-rose-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-3 md:mb-4 block">Lahore's Fresh Selection</span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 font-serif leading-tight">Touch of <span className="text-rose-600">Love</span></h2>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {(['all', 'bouquet', 'gift'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all active:scale-90 ${activeCategory === cat ? 'bg-maroon text-white shadow-lg' : 'bg-floral text-gray-500 hover:bg-rose-50 border border-rose-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div key={product.id} className="group card-reveal flex flex-col active:scale-[0.98]">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-[30px] md:rounded-[40px] overflow-hidden mb-5 md:mb-6 bg-floral border border-rose-50 shadow-sm">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-sm z-10">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-maroon">Limited</span>
                  </div>

                  {/* Additive Heart Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-4 md:top-6 left-4 md:left-6 p-3 md:p-4 rounded-full glass transition-all duration-300 z-20 active:scale-125 ${isWishlisted ? 'text-rose-500 scale-110 shadow-lg' : 'text-gray-400 hover:text-rose-500'}`}
                    aria-label="Add to wishlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" className={isWishlisted ? 'animate-heart-pop' : ''}>
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </button>

                  {/* Overlay Action - simplified for touch devices */}
                  <div className="absolute inset-0 bg-maroon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="hidden md:block bg-white text-maroon font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-maroon hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>

                <div className="px-2 md:px-3">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-serif leading-tight">{product.name}</h3>
                    <div className="text-[9px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">NEW</div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 font-light line-clamp-2 mb-4 md:mb-6 leading-relaxed">{product.description}</p>
                  
                  <div className="flex justify-between items-center border-t border-rose-50 pt-4 md:pt-5">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Premium</span>
                      <span className="text-lg md:text-xl font-black text-maroon">Rs. {product.price.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="p-3 bg-floral text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90 border border-rose-50"
                      aria-label="Add to cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-20 md:mt-32 text-center">
          <div className="inline-block p-1 bg-floral rounded-3xl md:rounded-full border border-rose-100">
            <div className="flex flex-col sm:flex-row items-center gap-2 px-6 md:px-8 py-4">
              <span className="text-xs md:text-sm text-gray-500 font-medium">Looking for a custom masterpiece?</span>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-maroon font-black border-b-2 border-maroon/20 hover:border-maroon transition-all sm:ml-2 text-xs md:text-sm"
              >
                Start Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
