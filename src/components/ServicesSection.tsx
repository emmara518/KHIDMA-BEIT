import React, { useState } from 'react';
import { SERVICES_DATA } from '../config/business';
import { ServiceIcon } from './ServiceIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'جميع الخدمات' },
  { id: 'cleaning', label: 'نظافة عامة وفلل' },
  { id: 'furniture', label: 'مفروشات ومجالس' },
  { id: 'ac_water', label: 'تكييف وخزانات' },
  { id: 'pest_drain', label: 'مكافحة وصرف' },
];

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.categorySlug === activeCategory);

  const handleServiceClick = (serviceName: string, serviceSlug: string) => {
    trackEvent('service_view', { service: serviceSlug, cta_location: 'service_card' });
    trackEvent('whatsapp_click', { service: serviceSlug, cta_location: 'service_card' });
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#FAFAF8] border-b border-[#E0E5E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-right">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E0E5E4] text-[#0F6B5C] text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دليل الخدمات المتكاملة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3C34] tracking-tight border-r-4 border-[#0F6B5C] pr-4">
              حلول منزلية شاملة بمعايير مؤسسية
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B67] leading-relaxed pr-5">
              نقدّم باقة متكاملة من خدمات النظافة، الصيانة، والتعقيم بأيدي فنيين متخصصين ومعدات حديثة تلبي أعلى معايير الجودة.
            </p>
          </div>

          {/* Quick SLA reassurance */}
          <div className="hidden lg:flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[#E0E5E4] text-xs font-bold text-[#1A3C34]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>تأكيد الموعد متاح في كافة مدن الشرقية</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" aria-label="تصفية حسب نوع الخدمة">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveCategory(tab.id);
                trackEvent('service_category_tab', { category: tab.id });
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#0F6B5C] text-white shadow-sm'
                  : 'bg-white text-[#5C6B67] hover:text-[#1A3C34] border border-[#E0E5E4] hover:border-[#0F6B5C]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-[#E0E5E4] hover:border-[#0F6B5C] hover:shadow-md transition-all duration-200 group text-right shadow-2xs"
              id={`service-card-${service.id}`}
            >
              <div className="space-y-4">
                {/* Service Top Info */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F7F6] text-[#0F6B5C] group-hover:bg-[#0F6B5C] group-hover:text-white flex items-center justify-center border border-[#E0E5E4] group-hover:border-[#0F6B5C] transition-colors duration-200">
                    <ServiceIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  {service.category && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#F1F7F6] text-[#0F6B5C] border border-[#E0E5E4]/60">
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Service Name */}
                <h3 className="text-lg font-bold text-[#1A3C34] group-hover:text-[#0F6B5C] transition-colors">
                  {service.name}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-[#5C6B67] leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Highlights Checklist */}
                {service.highlights && service.highlights.length > 0 && (
                  <div className="pt-2 border-t border-[#E0E5E4]/50 space-y-1.5">
                    <p className="text-[11px] font-bold text-[#1A3C34]">ما تشمله الخدمة:</p>
                    <ul className="space-y-1">
                      {service.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#5C6B67] leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6B5C] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Service CTA Button */}
              <div className="pt-5 mt-4 border-t border-[#E0E5E4]/60">
                <a
                  href={buildWhatsAppUrl({ service: service.name, source: `service_${service.slug}` })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleServiceClick(service.name, service.slug)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-bold text-[#1A3C34] group-hover:text-white bg-[#F1F7F6] group-hover:bg-[#25D366] rounded-full transition-all duration-200 text-center shadow-2xs"
                  aria-label={`طلب خدمة ${service.name} عبر واتساب`}
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>اطلب عبر واتساب</span>
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0 transform group-hover:-translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

