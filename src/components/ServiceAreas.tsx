import React, { useState } from 'react';
import { CITIES_DATA } from '../config/business';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { MapPin, ArrowLeft, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const ServiceAreas: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>(CITIES_DATA[0].id);

  const currentCity = CITIES_DATA.find((c) => c.id === selectedCityId) || CITIES_DATA[0];

  const handleCityClick = (cityName: string, citySlug: string) => {
    trackEvent('location_click', { city: citySlug, cta_location: 'cities_grid' });
    trackEvent('whatsapp_click', { city: citySlug, cta_location: 'cities_grid' });
  };

  return (
    <section id="cities" className="py-16 md:py-24 bg-[#FAFAF8] border-b border-[#E0E5E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-right max-w-2xl mb-10 md:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E0E5E4] text-[#0F6B5C] text-xs font-bold shadow-2xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>نطاق التغطية الجغرافية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3C34] tracking-tight border-r-4 border-[#0F6B5C] pr-4">
            تغطية شاملة لمدن وأحياء المنطقة الشرقية
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B67] leading-relaxed pr-5">
            تصل فرقنا الفنية إلى مختلف الأحياء السكنية والتجارية في المنطقة الشرقية بسيارات مجهزة بالكامل ومعدات حديثة.
          </p>
        </div>

        {/* Interactive City Navigator */}
        <div className="bg-white rounded-2xl border border-[#E0E5E4] p-6 sm:p-8 shadow-sm mb-10">
          
          {/* City Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#E0E5E4]/80 scrollbar-none" aria-label="اختر المدينة لعرض الأحياء">
            {CITIES_DATA.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => {
                  setSelectedCityId(city.id);
                  trackEvent('city_tab_switch', { city: city.slug });
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCityId === city.id
                    ? 'bg-[#0F6B5C] text-white shadow-xs'
                    : 'bg-[#FAFAF8] text-[#5C6B67] hover:text-[#1A3C34] hover:bg-[#F1F7F6] border border-[#E0E5E4]'
                }`}
              >
                {city.nameAr}
              </button>
            ))}
          </div>

          {/* Active City Details Panel */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-right">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-black text-[#1A3C34]">
                  خدماتنا في مدينة {currentCity.nameAr}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7F2] text-[#0F6B5C] text-xs font-bold border border-[#0F6B5C]/20">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  جاهزية تامة وتغطية يومية
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5C6B67] leading-relaxed">
                {currentCity.descriptionNote || `نوفر كافة خدمات التنظيف، التكييف، الخزانات، والمكافحة في ${currentCity.nameAr} مع التزام دقيق بالمواعيد.`}
              </p>

              {/* Popular Neighborhoods */}
              {currentCity.popularDistricts && currentCity.popularDistricts.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-[#1A3C34] block">أبرز الأحياء والمخططات المشمولة بالتغطية:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentCity.popularDistricts.map((district, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#FAFAF8] border border-[#E0E5E4] text-xs font-medium text-[#1A3C34]"
                      >
                        <Building className="w-3 h-3 text-[#0F6B5C]" />
                        {district}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct City WhatsApp Action */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-end justify-center pt-2 lg:pt-0">
              <a
                href={buildWhatsAppUrl({ city: currentCity.nameAr, source: `interactive_city_${currentCity.slug}` })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCityClick(currentCity.nameAr, currentCity.slug)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full text-sm font-extrabold text-[#1A3C34] bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] transition-all shadow-sm text-center"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>طلب موعد في {currentCity.nameAr}</span>
                <ArrowLeft className="w-4 h-4 shrink-0" />
              </a>
              <span className="text-[11px] text-[#5C6B67] mt-2">تأكيد الموعد والتفاصيل مباشرة عبر واتساب</span>
            </div>
          </div>

        </div>

        {/* Quick City Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {CITIES_DATA.map((city) => (
            <a
              key={city.id}
              href={buildWhatsAppUrl({ city: city.nameAr, source: `quick_city_${city.slug}` })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCityClick(city.nameAr, city.slug)}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white border border-[#E0E5E4] hover:border-[#0F6B5C] hover:shadow-xs transition-all text-center group"
            >
              <div className="w-8 h-8 rounded-full bg-[#F1F7F6] group-hover:bg-[#25D366] text-[#0F6B5C] group-hover:text-white flex items-center justify-center transition-colors mb-2">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#1A3C34] group-hover:text-[#0F6B5C]">
                {city.nameAr}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

