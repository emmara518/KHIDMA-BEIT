import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../config/business';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { ArrowLeft } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { cta_location: 'how_it_works' });
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-[#E0E5E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-right max-w-2xl mb-10 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F7F6] border border-[#E0E5E4] text-[#0F6B5C] text-xs font-bold shadow-2xs">
            <span>● خطوات بسيطة</span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3C34] tracking-tight border-r-4 border-[#0F6B5C] pr-4">
              طلب الخدمة أسهل مما تتوقع
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5C6B67] leading-relaxed pr-5">
            ثلاث خطوات ميسرة للحصول على الخدمة المنزلية التي تحتاجها في المنطقة الشرقية.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-[#E0E5E4] text-right flex flex-col justify-between shadow-2xs hover:border-[#0F6B5C] transition-colors"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-[#0F6B5C] font-mono tracking-tighter">
                    {step.number}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#F1F7F6] border border-[#E0E5E4] text-[#0F6B5C] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-[#1A3C34] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6B67] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-10 text-center">
          <a
            href={buildWhatsAppUrl({ source: 'how_it_works' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-xs"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>ابدأ الآن وأرسل طلبك عبر واتساب</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
