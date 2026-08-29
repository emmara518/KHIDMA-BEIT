import React, { useState } from 'react';
import { FAQS_DATA } from '../config/business';
import { trackEvent } from '../utils/analytics';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0]?.id || null);

  const toggleFAQ = (id: string, question: string) => {
    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);
    if (isOpening) {
      trackEvent('faq_expand', { faq_id: id, cta_location: 'faq_accordion' });
    }
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAFAF8] border-b border-[#E0E5E4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-right max-w-2xl mb-10 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E0E5E4] text-[#0F6B5C] text-xs font-bold shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>إجابات واضحة</span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3C34] tracking-tight border-r-4 border-[#0F6B5C] pr-4">
              الأسئلة الشائعة
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5C6B67] leading-relaxed pr-5">
            أبرز الاستفسارات المتعلقة بطلب وتنفيذ الخدمات المنزلية في المنطقة الشرقية.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E0E5E4] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id, faq.question)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-sm sm:text-base text-[#1A3C34] hover:text-[#0F6B5C] focus:outline-none focus:bg-[#FAFAF8] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="pr-1">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-[#F1F7F6] flex items-center justify-center text-[#5C6B67] shrink-0 mr-3 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#0F6B5C] text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C6B67] leading-relaxed border-t border-[#E0E5E4]/60 text-right"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
