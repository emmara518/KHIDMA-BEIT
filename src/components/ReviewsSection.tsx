import React from 'react';
import { REVIEWS_DATA } from '../config/business';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { MessageSquarePlus } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const verifiedReviews = REVIEWS_DATA.filter((r) => r.verified);

  const handleFeedbackClick = () => {
    trackEvent('share_feedback_click', { cta_location: 'reviews_section' });
  };

  return (
    <section className="py-14 bg-white border-b border-[#E0E5E4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* If verified reviews exist, render them */}
        {verifiedReviews.length > 0 && (
          <div className="mb-10 space-y-6">
            <div className="text-right">
              <h2 className="text-2xl font-extrabold text-[#1A3C34] border-r-4 border-[#0F6B5C] pr-3">آراء عملائنا</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verifiedReviews.map((review) => (
                <div key={review.id} className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E0E5E4] text-right space-y-2 shadow-2xs">
                  <p className="text-sm text-[#1A3C34] font-medium leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#5C6B67] pt-2 border-t border-[#E0E5E4]">
                    <span className="font-bold text-[#1A3C34]">{review.authorName}</span>
                    {review.cityName && <span>{review.cityName}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genuine Customer Feedback Invitation Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-[#E0E5E4] text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-[#F1F7F6] text-[#0F6B5C] mx-auto flex items-center justify-center border border-[#E0E5E4]">
            <MessageSquarePlus className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1A3C34]">
              جرّبت خدمتنا؟ شاركنا تجربتك
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B67] max-w-md mx-auto leading-relaxed">
              رأيك واقتراحاتك تهمنا دائماً لتطوير مستوى خدماتنا المنزلية في المنطقة الشرقية.
            </p>
          </div>

          <div>
            <a
              href={buildWhatsAppUrl({
                customMessage: 'السلام عليكم، أود مشاركة رأيي وملاحظاتي حول الخدمة.',
                source: 'feedback_invitation',
              })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFeedbackClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#0F6B5C] text-[#1A3C34] hover:text-white border border-[#E0E5E4] hover:border-[#0F6B5C] text-xs sm:text-sm font-bold transition-all shadow-2xs"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>إرسال تقييمك أو ملاحظاتك عبر واتساب</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
