import React from 'react';
import { BEFORE_AFTER_DATA } from '../config/business';

/**
 * Data-Driven Before/After Component.
 * STRICT RULE: Only renders when real, verified client work photos are provided.
 * Hides completely in production/development if data is empty (no fake stock or AI images).
 */
export const BeforeAfterSection: React.FC = () => {
  const verifiedItems = BEFORE_AFTER_DATA.filter((item) => item.verified);

  if (verifiedItems.length === 0) {
    return null; // Gracefully hidden per instructions until real client assets are available
  }

  return (
    <section className="py-16 bg-white border-b border-[#E5EBE8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16211E]">
            نماذج من أعمالنا
          </h2>
          <p className="text-sm text-[#5C6B67] mt-2">
            صور واقعية قبل وبعد تنفيذ الخدمة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verifiedItems.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#E5EBE8] overflow-hidden bg-[#FAFAF8] p-4 space-y-3">
              <h3 className="font-bold text-[#16211E]">{item.serviceName}</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs font-bold text-[#5C6B67] mb-1 block">قبل:</span>
                  <img src={item.beforeImgUrl} alt={`قبل تنفيذ ${item.serviceName}`} className="rounded-lg object-cover w-full h-48" loading="lazy" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0F6B5C] mb-1 block">بعد:</span>
                  <img src={item.afterImgUrl} alt={`بعد تنفيذ ${item.serviceName}`} className="rounded-lg object-cover w-full h-48" loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
