
import React, { useState, useEffect, useCallback } from 'react';
import { generateFlowerHook } from '../services/geminiService';
import { CAROUSEL_IMAGES } from '../constants';

interface HeroProps {
  onBook: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBook }) => {
  const [hook, setHook] = useState("Exquisite floral couture for life's golden moments.");
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchHook = async () => {
      const generated = await generateFlowerHook();
      setHook(generated);
      setLoading(false);
    };
    fetchHook();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <div className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-floral min-h-[90vh] md:min-h-[95vh] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-rose-50/20 -skew-x-0 md:-skew-x-12 translate-x-0 md:translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 md:gap-16 relative z-10">
        <div className="flex-1 text-center lg:text-left w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm mb-6 md:mb-10 animate-float">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-extrabold tracking-[0.3em] text-gray-400 uppercase">Artisanal Excellence</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] text-gray-900 mb-6 md:mb-8 tracking-tighter">
            Pure <br />
            <span className="italic text-rose-600 font-serif font-light">Romance</span>
          </h1>
          
          <div className="min-h-[80px] md:h-20 mb-8 md:mb-10">
            {loading ? (
              <div className="space-y-2 flex flex-col items-center lg:items-start">
                <div className="h-4 w-48 bg-rose-100 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-rose-50 rounded animate-pulse"></div>
              </div>
            ) : (
              <p className="text-lg md:text-2xl text-gray-600 font-light leading-relaxed max-w-xl italic mx-auto lg:mx-0">
                "{hook}"
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center lg:justify-start">
            <button 
              onClick={onBook}
              className="magnetic-btn px-8 md:px-10 py-4 md:py-5 bg-maroon text-white rounded-full font-bold text-base md:text-lg shadow-xl shadow-maroon/20 flex items-center justify-center gap-3 group active:scale-95"
            >
              Reserve a Designer
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('shop');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 md:px-10 py-4 md:py-5 bg-white border border-rose-100 text-maroon rounded-full font-bold text-base md:text-lg hover:bg-rose-50 transition-all shadow-sm active:scale-95"
            >
              View All Collection
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative w-full lg:max-w-[500px]">
          <div className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[40px] md:rounded-[80px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(93,0,0,0.15)] md:shadow-[0_50px_100px_-20px_rgba(93,0,0,0.2)] transition-all duration-1000">
            {CAROUSEL_IMAGES.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
              >
                <img 
                  src={slide.url} 
                  alt={slide.caption} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <div className={`absolute bottom-8 md:bottom-16 left-6 md:left-12 right-6 md:right-12 transition-all duration-700 delay-300 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="text-[8px] md:text-[10px] text-white/70 font-bold uppercase tracking-[0.5em] mb-2 md:mb-3 block">Premium Curation</span>
                  <h3 className="text-white font-serif italic text-2xl md:text-4xl leading-tight">
                    {slide.caption}
                  </h3>
                </div>
              </div>
            ))}

            <div className="hidden md:block absolute top-1/2 left-6 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={handlePrev} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-maroon transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            </div>
            <div className="hidden md:block absolute top-1/2 right-6 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={handleNext} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-maroon transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6 6-6"/></svg>
              </button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 md:hidden">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-white w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-24 h-24 md:w-40 md:h-40 bg-maroon rounded-full blur-[60px] md:blur-[100px] opacity-10 pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-40 md:h-40 bg-rose-400 rounded-full blur-[60px] md:blur-[100px] opacity-10 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
