import React, { useState } from 'react';
import { SERVICES_DATA, CITIES_DATA } from '../config/business';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { Sparkles, Calculator, CheckCircle2, Send, ArrowLeft } from 'lucide-react';

export const QuickServicePicker: React.FC = () => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);
  const [unitCount, setUnitCount] = useState<number>(3);
  const [selectedCity, setSelectedCity] = useState<string>(CITIES_DATA[0].nameAr);
  const [notes, setNotes] = useState<string>('');

  const activeService = SERVICES_DATA[selectedServiceIndex] || SERVICES_DATA[0];

  const handleCustomInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const customMessage = `السلام عليكم ورحمة الله،\nأرغب في طلب تسعير وتنسيق لخدمة: *${activeService.name}*\n- *الكمية/العدد التقريبي:* ${unitCount}\n- *المدينة:* ${selectedCity}\n${notes ? `- *ملاحظات إضافية:* ${notes}\n` : ''}\nأرجو إفادتي بالتكلفة المعتمدة وأقرب موعد للتنفيذ. شكراً لكم.`;

    const targetUrl = buildWhatsAppUrl({
      service: activeService.name,
      city: selectedCity,
      customMessage,
      source: 'scope_calculator_widget',
    });

    trackEvent('scope_calculator_submit', {
      service: activeService.name,
      units: unitCount,
      city: selectedCity,
    });

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-14 md:py-20 bg-white border-b border-[#E0E5E4]" aria-label="حاسبة نطاق الخدمة الفورية">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1F7F6] text-[#0F6B5C] text-xs font-bold border border-[#E0E5E4]">
            <Calculator className="w-3.5 h-3.5" />
            <span>تخصيص الطلب والتسعير المباشر</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#1A3C34] tracking-tight">
            احسب نطاق خدمتك واطلب فوراً
          </h2>
          
          <p className="text-xs sm:text-sm text-[#5C6B67]">
            حدد نوع الخدمة والحجم التقريبي لتجهيز الطلب وإرساله إلى مسؤول العمليات مباشرة عبر واتساب
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="bg-[#FAFAF8] rounded-2xl border border-[#E0E5E4] p-6 sm:p-8 shadow-xs text-right">
          <form onSubmit={handleCustomInquiry} className="space-y-6">
            
            {/* Step 1: Select Service Tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A3C34]">
                1. اختر نوع الخدمة المنزلية:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SERVICES_DATA.map((srv, idx) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all text-right flex flex-col justify-between cursor-pointer border ${
                      selectedServiceIndex === idx
                        ? 'bg-[#0F6B5C] text-white border-[#0F6B5C] shadow-xs'
                        : 'bg-white text-[#1A3C34] border-[#E0E5E4] hover:border-[#0F6B5C]/40 hover:bg-[#F1F7F6]'
                    }`}
                  >
                    <span>{srv.name}</span>
                    <span className={`text-[10px] mt-1 ${selectedServiceIndex === idx ? 'text-white/80' : 'text-[#5C6B67]'}`}>
                      {srv.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 & 3: Quantity & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#E0E5E4]">
              
              {/* Scope/Units Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="unit-counter-input" className="text-xs font-bold text-[#1A3C34]">
                    2. الحجم / العدد التقريبي (غرف، أطقم، وحدات، مساحة):
                  </label>
                  <span className="text-xs font-bold text-[#0F6B5C] px-2 py-0.5 rounded-md bg-white border border-[#E0E5E4]">
                    {unitCount} {unitCount > 10 ? 'متر/وحدة' : 'وحدات تقريبية'}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setUnitCount(Math.max(1, unitCount - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-[#E0E5E4] hover:bg-[#F1F7F6] text-lg font-bold text-[#1A3C34] flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    -
                  </button>
                  <input
                    id="unit-counter-input"
                    type="range"
                    min="1"
                    max="20"
                    value={unitCount}
                    onChange={(e) => setUnitCount(Number(e.target.value))}
                    className="flex-1 accent-[#0F6B5C] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setUnitCount(Math.min(30, unitCount + 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-[#E0E5E4] hover:bg-[#F1F7F6] text-lg font-bold text-[#1A3C34] flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* City Selection */}
              <div className="space-y-2">
                <label htmlFor="calc-city-select" className="block text-xs font-bold text-[#1A3C34]">
                  3. المدينة في المنطقة الشرقية:
                </label>
                <select
                  id="calc-city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white border border-[#E0E5E4] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#1A3C34] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]"
                >
                  {CITIES_DATA.map((c) => (
                    <option key={c.id} value={c.nameAr}>
                      {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Step 4: Optional Notes */}
            <div className="space-y-1.5 pt-2">
              <label htmlFor="calc-notes" className="block text-xs font-bold text-[#1A3C34]">
                ملاحظات أو مواصفات خاصة (اختياري):
              </label>
              <input
                id="calc-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: شقة دور ثاني بدون مصعد، أو تحديد موعد معين..."
                className="w-full bg-white border border-[#E0E5E4] rounded-xl px-4 py-2.5 text-xs text-[#1A3C34] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]"
              />
            </div>

            {/* Calculated Order Summary & CTA */}
            <div className="p-4 bg-white rounded-xl border border-[#E0E5E4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-right w-full sm:w-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A3C34]">
                  <CheckCircle2 className="w-4 h-4 text-[#0F6B5C]" />
                  <span>طلب مجهز: {activeService.name} ({unitCount} وحدات) في {selectedCity}</span>
                </div>
                <div className="text-[11px] text-[#5C6B67]">
                  سيتم فتح محادثة واتساب الرسمية مع كافة التفاصيل للتأكيد الفوري
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-extrabold text-sm text-[#1A3C34] bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.99] transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>إرسال تفاصيل الطلب عبر واتساب</span>
                <ArrowLeft className="w-4 h-4 shrink-0" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

