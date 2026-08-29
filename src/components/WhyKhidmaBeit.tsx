import React from 'react';
import { WHY_REASONS } from '../config/business';
import { ServiceIcon } from './ServiceIcon';

export const WhyKhidmaBeit: React.FC = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-[#FAFAF8] border-b border-[#E0E5E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-right max-w-2xl mb-10 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E0E5E4] text-[#0F6B5C] text-xs font-bold shadow-2xs">
            <span>● مزايا التعامل</span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3C34] tracking-tight border-r-4 border-[#0F6B5C] pr-4">
              لماذا خدمة بيت؟
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5C6B67] leading-relaxed pr-5">
            نسهّل عليك العناية بمنزلك من خلال تجربة تواصل واضحة ومباشرة بدون تعقيد.
          </p>
        </div>

        {/* 4 Practical Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {WHY_REASONS.map((reason) => (
            <div
              key={reason.id}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[#E0E5E4] text-right shadow-2xs hover:border-[#0F6B5C] transition-colors"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#F1F7F6] text-[#0F6B5C] flex items-center justify-center border border-[#E0E5E4]">
                <ServiceIcon name={reason.iconName} className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#1A3C34]">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6B67] leading-relaxed font-normal">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
