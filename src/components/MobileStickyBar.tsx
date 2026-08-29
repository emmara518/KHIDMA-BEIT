import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl, buildPhoneUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const MobileStickyBar: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { cta_location: 'mobile_sticky_bar' });
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', { cta_location: 'mobile_sticky_bar' });
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E0E5E4] px-3 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
      aria-label="أزرار التواصل السريع"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Primary WhatsApp CTA (Larger conversion share) */}
        <a
          href={buildWhatsAppUrl({ source: 'mobile_sticky_bar' })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="flex-1 flex items-center justify-center gap-2 h-12 px-4 rounded-full font-extrabold text-sm text-white bg-[#25D366] active:bg-[#1EBE5D] shadow-xs transition-transform active:scale-[0.98] focus:outline-none"
          id="mobile-sticky-whatsapp"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          <span>طلب عبر واتساب</span>
        </a>

        {/* Secondary Phone Call CTA */}
        <a
          href={buildPhoneUrl()}
          onClick={handlePhoneClick}
          className="flex items-center justify-center gap-2 h-12 px-4 rounded-full font-bold text-xs sm:text-sm text-[#1A3C34] bg-white border border-[#E0E5E4] active:bg-[#FAFAF8] shadow-2xs transition-transform active:scale-[0.98] focus:outline-none"
          id="mobile-sticky-phone"
          aria-label={`اتصال هاتفي: ${BUSINESS_CONFIG.formattedPhoneDisplay}`}
        >
          <Phone className="w-4 h-4 text-[#0F6B5C] shrink-0" />
          <span>اتصال</span>
        </a>

      </div>
    </div>
  );
};
