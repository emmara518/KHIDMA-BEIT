import React from 'react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BUSINESS_CONFIG, SERVICES_DATA, CITIES_DATA } from '../config/business';
import { buildWhatsAppUrl, buildPhoneUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { Phone, MapPin, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { cta_location: 'footer' });
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', { cta_location: 'footer' });
  };

  return (
    <footer className="bg-white text-[#16211E] pt-14 pb-24 md:pb-12 border-t border-[#E0E5E4]" aria-label="تذييل الصفحة">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#E0E5E4] text-right">
          
          {/* Brand & Descriptor Column */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo />
            <p className="text-xs sm:text-sm text-[#5C6B67] leading-relaxed max-w-sm">
              خدمات منزلية متكاملة تشمل التنظيف، المفروشات، صيانة المكيفات، تنظيف الخزانات، مكافحة الحشرات، وتسليك الصرف الصحي في المنطقة الشرقية.
            </p>

            <div className="pt-1 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#1A3C34] font-medium">
                <MapPin className="w-4 h-4 text-[#0F6B5C] shrink-0" />
                <span>المملكة العربية السعودية — المنطقة الشرقية</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#1A3C34] tracking-wide border-b border-[#E0E5E4] pb-2">
              الخدمات المنزلية
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C6B67]">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href={buildWhatsAppUrl({ service: service.name, source: 'footer_service' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="hover:text-[#0F6B5C] transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities & Direct Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-[#1A3C34] tracking-wide border-b border-[#E0E5E4] pb-2">
              نطاق التغطية والتواصل
            </h3>
            
            {/* Cities Tags */}
            <div className="flex flex-wrap gap-1.5">
              {CITIES_DATA.map((city) => (
                <span
                  key={city.id}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#FAFAF8] border border-[#E0E5E4] text-[#1A3C34] font-semibold"
                >
                  {city.nameAr}
                </span>
              ))}
            </div>

            {/* Quick Contact CTAs in Footer */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={buildWhatsAppUrl({ source: 'footer_contact' })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-colors w-fit shadow-2xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>محادثة واتساب</span>
              </a>

              <a
                href={buildPhoneUrl()}
                onClick={handlePhoneClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#FAFAF8] border border-[#E0E5E4] text-[#1A3C34] text-xs font-semibold transition-colors w-fit shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#0F6B5C]" />
                <span>اتصال: {BUSINESS_CONFIG.formattedPhoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C6B67] gap-3">
          <p>© {currentYear} {BUSINESS_CONFIG.name}. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 font-semibold text-[#1A3C34] flex-wrap justify-center">
            {CITIES_DATA.map((c) => (
              <span key={c.id}>{c.nameAr}</span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
