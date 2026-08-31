import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl, buildPhoneUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { BUSINESS_CONFIG, CITIES_DATA, SERVICES_DATA } from '../config/business';
import { generateOrderReference } from '../utils/googleReviews';
import {
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Zap,
  Send,
  Mail,
  CalendarDays,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>(SERVICES_DATA[0].name);
  const [selectedCity, setSelectedCity] = useState<string>(CITIES_DATA[0].nameAr);
  const [propertyType, setPropertyType] = useState<string>('شقة سكنية');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');

  const handleWhatsAppClick = (location: string) => {
    trackEvent('whatsapp_click', { cta_location: location, service: selectedService, city: selectedCity });
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', { cta_location: 'hero_primary' });
  };

  const handleInteractiveBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const emailLine = customerEmail.trim() ? `\n- *البريد الإلكتروني:* ${customerEmail.trim()}` : '';
    const dateLine = preferredDate
      ? `\n- *الموعد المفضل:* ${preferredDate}`
      : '';
    const customMessage = `السلام عليكم ورحمة الله وبركاته،\nأرغب في حجز خدمة عبر موقع خدمة بيت:\n- *نوع الخدمة:* ${selectedService}\n- *المدينة:* ${selectedCity}\n- *نوع العقار/الطلب:* ${propertyType}${emailLine}${dateLine}\n\nيرجى تزويدي بالتفاصيل والتكلفة وأقرب موعد متاح. شكراً لكم.`;
    const targetUrl = buildWhatsAppUrl({
      service: selectedService,
      city: selectedCity,
      customMessage,
      source: 'hero_interactive_widget',
    });
    const orderId = generateOrderReference();
    trackEvent('hero_booking_submit', { service: selectedService, city: selectedCity, property: propertyType });
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    const confirmationParams = new URLSearchParams({
      order_id: orderId,
      email: customerEmail.trim(),
      date: preferredDate,
      service: selectedService,
      city: selectedCity,
    });
    window.location.assign(`/confirmation?${confirmationParams.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20 border-b border-[#E0E5E4] bg-gradient-to-b from-[#F1F7F6] via-[#FAFAF8] to-white">
      {/* Subtle corporate background grid pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#0F6B5C_0.75px,transparent_0.75px)] [background-size:20px_20px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Copy & Enterprise Value Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white text-[#1A3C34] text-xs sm:text-sm font-semibold border border-[#E0E5E4] shadow-2xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
              </span>
              <span>متاح الآن للحجز الفوري والتنسيق في المنطقة الشرقية</span>
            </div>

            {/* H1 Corporate Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A3C34] tracking-tight leading-[1.25]">
                خدمات منزلية احترافية <br />
                <span className="text-[#0F6B5C]">بمعايير مؤسسية موثوقة</span>
              </h1>

              {/* Sub-headline / Scope */}
              <p className="text-base sm:text-lg text-[#5C6B67] leading-relaxed max-w-2xl font-normal pt-1">
                نقدّم حلولاً متكاملة للعناية بمنزلك في الدمام والخبر والمنطقة الشرقية تشمل التنظيف الشامل، غسيل المفروشات، صيانة وتكييف، تنظيف الخزانات، ومكافحة الحشرات بمعدات حديثة وكوادر فنية متمرسة.
              </p>
            </div>

            {/* Corporate Guarantee Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E0E5E4] shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#0F6B5C] shrink-0" />
                <div className="text-right">
                  <div className="text-xs font-bold text-[#1A3C34]">مواد معتمدة وآمنة</div>
                  <div className="text-[11px] text-[#5C6B67]">مطابقة للاشتراطات</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E0E5E4] shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#0F6B5C] shrink-0" />
                <div className="text-right">
                  <div className="text-xs font-bold text-[#1A3C34]">كوادر فنية مدربة</div>
                  <div className="text-[11px] text-[#5C6B67]">أحدث أجهزة التنظيف</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E0E5E4] shadow-2xs">
                <Clock className="w-5 h-5 text-[#0F6B5C] shrink-0" />
                <div className="text-right">
                  <div className="text-xs font-bold text-[#1A3C34]">دقة في المواعيد</div>
                  <div className="text-[11px] text-[#5C6B67]">متابعة مستمرة</div>
                </div>
              </div>
            </div>

            {/* Conversion CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg">
              {/* Primary: WhatsApp CTA */}
              <a
                href={buildWhatsAppUrl({ source: 'hero_primary' })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('hero_primary')}
                className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-extrabold text-[#1A3C34] bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 text-center"
                id="hero-whatsapp-btn"
              >
                <WhatsAppIcon className="w-6 h-6 shrink-0" />
                <span>اطلب الخدمة عبر واتساب</span>
              </a>

              {/* Secondary: Phone Call */}
              <a
                href={buildPhoneUrl()}
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-[#1A3C34] bg-white hover:bg-[#F1F7F6] border border-[#E0E5E4] hover:border-[#0F6B5C]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F6B5C] text-center shadow-2xs"
                id="hero-call-btn"
              >
                <Phone className="w-5 h-5 text-[#0F6B5C]" />
                <span>اتصل: {BUSINESS_CONFIG.formattedPhoneDisplay}</span>
              </a>
            </div>

            {/* City Tags in Hero */}
            <div className="pt-1">
              <p className="text-xs font-bold text-[#5C6B67] mb-2">تغطية مباشرة تشمل:</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {CITIES_DATA.map((city) => (
                  <span
                    key={city.id}
                    className="inline-flex items-center px-3 py-1 text-xs font-semibold text-[#1A3C34] bg-white border border-[#E0E5E4] rounded-lg shadow-2xs"
                  >
                    {city.nameAr}
                  </span>
                ))}
              </div>
            </div>

            {/* Micro Trust Note */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#5C6B67] pt-1">
              <CheckCircle2 className="w-4 h-4 text-[#0F6B5C] shrink-0" />
              <span>رد سريع وتنسيق فوري عبر الواتساب بدون تسجيل حساب</span>
            </div>

          </div>

          {/* Left Column: Interactive Enterprise Booking Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#E0E5E4] shadow-md p-6 sm:p-7 relative text-right">
              
              {/* Card Header */}
              <div className="border-b border-[#E0E5E4] pb-4 mb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F7F6] text-[#0F6B5C] text-xs font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    حجز سريع ومباشر
                  </span>
                  <span className="text-[11px] text-[#5C6B67] font-medium">رد خلال دقائق</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-[#1A3C34]">
                  طلب خدمة وتحديد موعد
                </h2>
                <p className="text-xs text-[#5C6B67]">
                  حدد نوع الخدمة والمدينة للحصول على التفاصيل فوراً
                </p>
              </div>

              {/* Form Controls */}
              <form onSubmit={handleInteractiveBooking} className="space-y-3.5">
                
                {/* 1. Service Selection */}
                <div className="space-y-1">
                  <label htmlFor="hero-service-select" className="block text-xs font-bold text-[#1A3C34]">
                    نوع الخدمة المطلوبة:
                  </label>
                  <select
                    id="hero-service-select"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#E0E5E4] rounded-xl px-3.5 py-2 text-sm font-semibold text-[#1A3C34] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C] focus:bg-white transition-colors"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. City Selection */}
                <div className="space-y-1">
                  <label htmlFor="hero-city-select" className="block text-xs font-bold text-[#1A3C34]">
                    المدينة في المنطقة الشرقية:
                  </label>
                  <div className="relative">
                    <select
                      id="hero-city-select"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#E0E5E4] rounded-xl px-3.5 py-2 text-sm font-semibold text-[#1A3C34] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C] focus:bg-white transition-colors"
                    >
                      {CITIES_DATA.map((c) => (
                        <option key={c.id} value={c.nameAr}>
                          {c.nameAr}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6B67] pointer-events-none" />
                  </div>
                </div>

                {/* 3. Property Type / Scope Selection */}
                <div className="space-y-1">
                  <label htmlFor="hero-prop-select" className="block text-xs font-bold text-[#1A3C34]">
                    نوع العقار / نطاق العمل:
                  </label>
                  <select
                    id="hero-prop-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#E0E5E4] rounded-xl px-3.5 py-2 text-sm font-semibold text-[#1A3C34] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C] focus:bg-white transition-colors"
                  >
                    <option value="شقة سكنية (2 - 4 غرف)">شقة سكنية (2 - 4 غرف)</option>
                    <option value="فيلا سكنية / دوبلكس">فيلا سكنية / دوبلكس</option>
                    <option value="طقم كنب / مجلس عربي">طقم كنب / مجلس عربي</option>
                    <option value="مكيفات سبليت (1 - 5 وحدات)">مكيفات سبليت (1 - 5 وحدات)</option>
                    <option value="خزان مياه أرضي / علوي">خزان مياه أرضي / علوي</option>
                    <option value="مكافحة حشرات وقائية / علاجية">مكافحة حشرات وقائية / علاجية</option>
                    <option value="تسليك مجاري / بيارة">تسليك مجاري / بيارة</option>
                    <option value="مكتب تجاري أو محل">مكتب تجاري أو محل</option>
                  </select>
                </div>

                {/* 4. Customer Email */}
                <div className="space-y-1">
                  <label htmlFor="hero-email-input" className="block text-xs font-bold text-[#1A3C34]">
                    البريد الإلكتروني:
                  </label>
                  <input
                    id="hero-email-input"
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="w-full bg-[#FAFAF8] border border-[#E0E5E4] rounded-xl px-3.5 py-2 text-sm font-semibold text-[#1A3C34] placeholder:text-[#9AA8A4] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C] focus:bg-white transition-colors"
                  />
                  <p className="text-[11px] text-[#5C6B67]">
                    سنستخدمه لإرسال تفاصيل الطلب ودعوة تقييم من Google.
                  </p>
                </div>

                {/* 5. Preferred Service Date */}
                <div className="space-y-1">
                  <label htmlFor="hero-date-input" className="block text-xs font-bold text-[#1A3C34]">
                    الموعد المفضل للتنفيذ:
                  </label>
                  <div className="relative">
                    <input
                      id="hero-date-input"
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-[#FAFAF8] border border-[#E0E5E4] rounded-xl px-3.5 py-2 text-sm font-semibold text-[#1A3C34] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C] focus:bg-white transition-colors"
                    />
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6B67] pointer-events-none" />
                  </div>
                </div>

                {/* Summary Reassurance Box */}
                <div className="p-3 bg-[#F1F7F6] rounded-xl border border-[#E0E5E4] space-y-1 text-xs text-[#1A3C34]">
                  <div className="flex items-center justify-between font-bold">
                    <span>الخدمة:</span>
                    <span className="text-[#0F6B5C]">{selectedService}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#5C6B67]">
                    <span>المنطقة:</span>
                    <span>{selectedCity} • الشرقية</span>
                  </div>
                </div>

                {/* Submit to WhatsApp */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full font-extrabold text-sm text-[#1A3C34] bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 cursor-pointer"
                  id="hero-widget-submit-btn"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>تأكيد الطلب وحجز الموعد عبر واتساب</span>
                  <Send className="w-4 h-4 shrink-0 transform -rotate-45" />
                </button>

              </form>

              {/* Secure footer note */}
              <div className="mt-3 pt-2.5 border-t border-[#E0E5E4] text-center text-[11px] text-[#5C6B67]">
                🔒 تواصل مباشر ومجاني بالكامل عبر تطبيق واتساب
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

