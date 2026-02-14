
import React, { useState, useEffect } from 'react';

const WhatsAppButton: React.FC = () => {
  const [showBubble, setShowBubble] = useState(false);
  const whatsappNumber = "+923214455667"; // Brand's WhatsApp
  const message = "Hi Umer & Umair Flowers, I'm interested in your floral services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Show the help bubble after a short delay to catch the user's eye
    const timer = setTimeout(() => setShowBubble(true), 3500);
    // Hide it after a while so it's not intrusive, but show it again on hover
    const hideTimer = setTimeout(() => setShowBubble(false), 10000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] flex flex-col items-end gap-1">
      {/* Floating Message Bubble */}
      <div 
        className={`transition-all duration-500 ease-out transform origin-bottom-right ${
          showBubble ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <div className="bg-white px-5 py-3.5 rounded-[20px] shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-rose-50 relative mb-3">
          <p className="text-[11px] md:text-xs font-bold text-gray-800 whitespace-nowrap flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Need styling advice? <span className="text-rose-500">Ask us!</span>
          </p>
          
          {/* Perfect Arrow / Speech Bubble Tail */}
          <div className="absolute -bottom-[7px] right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-rose-50 rounded-sm"></div>
        </div>
      </div>

      {/* Main WhatsApp Button */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowBubble(true)}
        className="relative group flex items-center justify-center bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_20px_40px_-5px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-500"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping group-hover:animate-none"></span>
        
        {/* Clean, Perfect WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          className="md:w-9 md:h-9" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.12.554 4.189 1.602 6.006L0 24l6.149-1.613a11.815 11.815 0 005.9 1.532h.005c6.634 0 12.032-5.39 12.035-12.028a11.795 11.795 0 00-3.417-8.52"/>
        </svg>

        {/* Hover Text Label (Desktop) */}
        <span className="absolute right-full mr-4 bg-maroon text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest uppercase whitespace-nowrap">
          Live Chat
        </span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
