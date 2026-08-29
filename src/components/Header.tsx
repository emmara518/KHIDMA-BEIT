import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl, buildPhoneUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { Phone, Menu, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = (location: string) => {
    trackEvent('whatsapp_click', { cta_location: location });
  };

  const handlePhoneClick = (location: string) => {
    trackEvent('phone_click', { cta_location: location });
  };

  const navLinks = [
    { label: 'الخدمات', href: '#services' },
    { label: 'المدن', href: '#cities' },
    { label: 'موقعنا', href: '#location' },
    { label: 'لماذا خدمة بيت؟', href: '#why-us' },
    { label: 'كيف نعمل', href: '#how-it-works' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E0E5E4] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="focus:outline-none focus:ring-2 focus:ring-[#0F6B5C] rounded-lg"
          aria-label="خدمة بيت - الرئيسية"
        >
          <BrandLogo />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[#1A3C34] font-medium text-sm" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#0F6B5C] transition-colors duration-150 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Header CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={buildPhoneUrl()}
            onClick={() => handlePhoneClick('header_desktop')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#1A3C34] hover:text-[#0F6B5C] transition-colors rounded-full border border-[#E0E5E4] hover:border-[#0F6B5C]/40 bg-white"
            aria-label={`اتصل بنا: ${BUSINESS_CONFIG.formattedPhoneDisplay}`}
          >
            <Phone className="w-4 h-4 text-[#0F6B5C]" />
            <span>{BUSINESS_CONFIG.formattedPhoneDisplay}</span>
          </a>

          <a
            href={buildWhatsAppUrl({ source: 'header' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick('header_desktop')}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors duration-200 rounded-full shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>اطلب عبر واتساب</span>
          </a>
        </div>

        {/* Mobile Menu & Quick WhatsApp Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <a
            href={buildWhatsAppUrl({ source: 'header_mobile_icon' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick('header_mobile_icon')}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white shadow-xs"
            aria-label="تواصل عبر واتساب"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#16211E] hover:text-[#0F6B5C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAFAF8] border-b border-[#E0E5E4] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1A3C34] hover:text-[#0F6B5C] text-base font-semibold py-2 px-3 rounded-lg hover:bg-[#0F6B5C]/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#E0E5E4] space-y-2.5">
            <a
              href={buildWhatsAppUrl({ source: 'header_mobile_menu' })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleWhatsAppClick('header_mobile_menu');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-[#25D366] active:bg-[#1EBE5D] rounded-full shadow-xs"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>اطلب الخدمة عبر واتساب</span>
            </a>

            <a
              href={buildPhoneUrl()}
              onClick={() => {
                handlePhoneClick('header_mobile_menu');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-[#1A3C34] bg-white border border-[#E0E5E4] rounded-full"
            >
              <Phone className="w-4 h-4 text-[#0F6B5C]" />
              <span>اتصل بنا ({BUSINESS_CONFIG.formattedPhoneDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
