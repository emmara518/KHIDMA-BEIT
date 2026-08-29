import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl, buildPhoneUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { Phone, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const FinalCTA: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { cta_location: 'final_cta_primary' });
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', { cta_location: 'final_cta_secondary' });
  };

  return (
    <section className="py-16 md:py-20 bg-[#1A3C34] text-white relative overflow-hidden">
      
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#0F6B5C]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#25D366] text-xs font-bold border border-white/15">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>تواصل مباشر وسريع</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
          تحتاج خدمة لمنزلك؟
        </h2>

        <p className="text-sm sm:text-base text-[#BCC9C5] max-w-xl mx-auto leading-relaxed">
          اختر الخدمة المناسبة لمنزلك في الدمام والخبر والمنطقة الشرقية وتواصل معنا مباشرة عبر واتساب أو الهاتف لتحديد الموعد.
        </p>

        {/* Big Conversion Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch max-w-md mx-auto">
          {/* Primary WhatsApp CTA */}
          <a
            href={buildWhatsAppUrl({ source: 'final_cta' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-extrabold text-[#1A3C34] bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 text-center"
            id="final-cta-whatsapp-btn"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            <span>تواصل عبر واتساب</span>
          </a>

          {/* Secondary Phone CTA */}
          <a
            href={buildPhoneUrl()}
            onClick={handlePhoneClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-transparent hover:bg-white/10 border border-white/30 hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-white text-center shadow-2xs"
            id="final-cta-call-btn"
          >
            <Phone className="w-5 h-5 text-[#25D366]" />
            <span>اتصل الآن ({BUSINESS_CONFIG.formattedPhoneDisplay})</span>
          </a>
        </div>

        {/* Reassurance text */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#BCC9C5]">
          <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
          <span>خدمة متكاملة وسرعة في الرد والتنسيق</span>
        </div>

      </div>
    </section>
  );
};
