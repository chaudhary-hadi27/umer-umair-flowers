import React, { useState, useEffect, useCallback } from 'react';
import { generateFlowerHook } from '../services/geminiService.ts';
import { CAROUSEL_IMAGES } from '../../constants.tsx';

interface HeroProps {
  onBook: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBook }) => {
  const [hook, setHook] = useState("Exquisite floral couture for life's golden moments.");
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices for optimized experience
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      <div className="relative pt-20 sm:pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden min-h-[100svh] flex items-center">
        {/* Video Background - Desktop Only for Performance */}
        {!isMobile && (
            <>
              <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoadedData={() => setVideoLoaded(true)}
                    poster="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2000"
                >
                  {/* Multiple sources for browser compatibility */}
                  <source src="https://cdn.coverr.co/videos/coverr-elegant-flowers-in-a-vase-9719/1080p.mp4" type="video/mp4" />
                  <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=1ec9e0c3bc8a1e1b0c9b0c6c7c3c4c5c6c7c8c9c&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                </video>
              </div>
              {/* Video Overlay - Creates depth and readability */}
              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-floral/95 via-floral/80 to-transparent"></div>
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-floral/60"></div>
            </>
        )}

        {/* Mobile Optimized Background - Static gradient */}
        {isMobile && (
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-floral via-rose-50 to-floral"></div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-rose-50/20 -skew-x-0 md:-skew-x-12 translate-x-0 md:translate-x-1/4 pointer-events-none z-[2]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left w-full order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-sm border border-rose-100 shadow-sm mb-4 sm:mb-6 md:mb-10 animate-float">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-extrabold tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 uppercase">Artisanal Excellence</span>
              </div>

              {/* Main Heading - Responsive sizing */}
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] text-gray-900 mb-4 sm:mb-6 md:mb-8 tracking-tighter">
                Umer & <br />
                <span className="italic text-rose-600 font-serif font-light">Umair</span>
              </h1>

              {/* Dynamic Hook */}
              <div className="min-h-[60px] sm:min-h-[70px] md:min-h-[80px] mb-6 sm:mb-8 md:mb-10">
                {loading ? (
                    <div className="space-y-2 flex flex-col items-center lg:items-start">
                      <div className="h-3 sm:h-4 w-36 sm:w-48 bg-rose-100 rounded animate-pulse"></div>
                      <div className="h-3 sm:h-4 w-24 sm:w-32 bg-rose-50 rounded animate-pulse"></div>
                    </div>
                ) : (
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-xl italic mx-auto lg:mx-0 px-4 lg:px-0">
                      "{hook}"
                    </p>
                )}
              </div>

              {/* CTA Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start px-4 lg:px-0">
                <button
                    onClick={onBook}
                    className="magnetic-btn px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-maroon text-white rounded-full font-bold text-sm sm:text-base md:text-lg shadow-xl shadow-maroon/20 flex items-center justify-center gap-2 sm:gap-3 group active:scale-95 transition-all hover:shadow-2xl hover:shadow-maroon/30"
                >
                  <span className="whitespace-nowrap">Reserve a Designer</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
                <button
                    onClick={() => {
                      const el = document.getElementById('shop');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white/90 backdrop-blur-sm border border-rose-100 text-maroon rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-rose-50 transition-all shadow-sm active:scale-95"
                >
                  <span className="whitespace-nowrap">View Collection</span>
                </button>
              </div>
            </div>

            {/* Image Carousel Section */}
            <div className="flex-1 relative w-full max-w-md lg:max-w-[500px] order-1 lg:order-2">
              <div className="group relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-[30px] sm:rounded-[40px] md:rounded-[60px] lg:rounded-[80px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(93,0,0,0.15)] md:shadow-[0_30px_60px_-15px_rgba(93,0,0,0.15)] lg:shadow-[0_50px_100px_-20px_rgba(93,0,0,0.2)] transition-all duration-1000">
                {CAROUSEL_IMAGES.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
                    >
                      <img
                          src={slide.url}
                          alt={slide.caption}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                      <div className={`absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-16 left-4 sm:left-6 md:left-8 lg:left-12 right-4 sm:right-6 md:right-8 lg:right-12 transition-all duration-700 delay-300 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/70 font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-1 sm:mb-2 md:mb-3 block">Premium Curation</span>
                        <h3 className="text-white font-serif italic text-lg sm:text-xl md:text-2xl lg:text-4xl leading-tight">
                          {slide.caption}
                        </h3>
                      </div>
                    </div>
                ))}

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:block absolute top-1/2 left-4 lg:left-6 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={handlePrev} className="p-2 lg:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-maroon transition-all" aria-label="Previous slide">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                </div>
                <div className="hidden md:block absolute top-1/2 right-4 lg:right-6 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={handleNext} className="p-2 lg:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-maroon transition-all" aria-label="Next slide">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>

                {/* Mobile Carousel Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5 sm:gap-2">
                  {CAROUSEL_IMAGES.map((_, i) => (
                      <button
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/40 w-1.5'}`}
                          aria-label={`Go to slide ${i + 1}`}
                      />
                  ))}
                </div>
              </div>

              {/* Decorative Blurs */}
              <div className="absolute -top-8 sm:-top-10 -right-8 sm:-right-10 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-maroon rounded-full blur-[50px] sm:blur-[60px] md:blur-[100px] opacity-10 pointer-events-none"></div>
              <div className="absolute -bottom-8 sm:-bottom-10 -left-8 sm:-left-10 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-rose-400 rounded-full blur-[50px] sm:blur-[60px] md:blur-[100px] opacity-10 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Explore</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-maroon">
              <path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/>
            </svg>
          </div>
        </div>
      </div>
  );
};

export default Hero;