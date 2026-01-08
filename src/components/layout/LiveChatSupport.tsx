'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/social';

export default function LiveChatSupport() {
  const phoneNumber = '447440011355'; // UK Number: 07440 011355 -> 447440011355
  const message = "Hi! I need help with ShopThings."; 
  
  const handleClick = () => {
    const url = generateWhatsAppUrl(phoneNumber, message);
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      aria-label="Contact Support on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium text-sm hidden md:block">
        Chat with us
      </span>
    </button>
  );
}
