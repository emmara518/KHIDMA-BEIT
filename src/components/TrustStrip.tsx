import React from 'react';
import { TRUST_PILLARS } from '../config/business';
import { ServiceIcon } from './ServiceIcon';

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-8 bg-white border-b border-[#E0E5E4]" aria-label="مميزات الخدمة">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="flex items-start gap-3.5 text-right p-3 rounded-xl hover:bg-[#FAFAF8] transition-colors"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F1F7F6] text-[#0F6B5C] flex items-center justify-center border border-[#E0E5E4]">
                <ServiceIcon name={pillar.iconName} className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#16211E] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#5C6B67] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
