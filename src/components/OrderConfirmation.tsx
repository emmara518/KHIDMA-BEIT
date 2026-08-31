import React, { useEffect, useMemo } from 'react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { renderGoogleReviewsOptIn } from '../utils/googleReviews';
import { trackEvent } from '../utils/analytics';
import { buildWhatsAppUrl, buildPhoneUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

function formatDate(value: string): string {
  const parsed = new Date(`${value}T00:00:00`);
  if (isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

export const OrderConfirmation: React.FC = () => {
  const params = useMemo(
    () => (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()),
    []
  );

  const orderId = params.get('order_id') || '';
  const email = params.get('email') || '';
  const date = params.get('date') || '';
  const service = params.get('service') || '';
  const city = params.get('city') || '';

  useEffect(() => {
    trackEvent('confirmation_view', { service, city });
    if (!orderId || !email) return;
    renderGoogleReviewsOptIn({
      orderId,
      email,
      deliveryCountry: BUSINESS_CONFIG.deliveryCountry || 'SA',
      estimatedDeliveryDate: date,
    });
  }, [orderId, email, date, service, city]);

  const whatsappUrl = buildWhatsAppUrl({
    service: service || undefined,
    city: city || undefined,
    source: 'confirmation_page',
  } as Parameters<typeof buildWhatsAppUrl>[0]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#16211E]">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E5E4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#0F6B5C] text-white text-lg font-black">
              ب
            </span>
            <span className="text-lg font-black text-[#1A3C34]">
              خدمة بيت
            </span>
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F7F6] text-[#0F6B5C] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            تأكيد الطلب
          </span>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-4 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#0F6B5C_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-30" />
        <div className="relative w-full max-w-xl">
          <div className="bg-white rounded-3xl border border-[#E0E5E4] shadow-lg p-6 sm:p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366]/15 mx-auto">
              <CheckCircle2 className="w-9 h-9 text-[#25D366]" />
            </div>

            <h1 className="mt-5 text-2xl sm:text-3xl font-black text-[#1A3C34]">
              تم استلام طلبك بنجاح
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#5C6B67] leading-relaxed">
              شكراً لتواصلك مع خدمة بيت. طلبك مسجّل الآن وسيتم التواصل معك عبر واتساب
              لتأكيد التفاصيل وأقرب موعد متاح.
            </p>

            {orderId && (
              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F1F7F6] border border-[#E0E5E4] text-sm font-bold text-[#0F6B5C]">
                <PackageCheck className="w-4 h-4" />
                رقم الطلب: <span dir="ltr">{orderId}</span>
              </div>
            )}

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
              {service && (
                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E0E5E4]">
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6B67]">
                    <PackageCheck className="w-3.5 h-3.5" />
                    الخدمة المطلوبة
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#1A3C34]">{service}</dd>
                </div>
              )}
              {city && (
                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E0E5E4]">
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6B67]">
                    <MapPin className="w-3.5 h-3.5" />
                    الموقع
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#1A3C34]">
                    {city} • المنطقة الشرقية
                  </dd>
                </div>
              )}
              {date && (
                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E0E5E4]">
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6B67]">
                    <CalendarDays className="w-3.5 h-3.5" />
                    الموعد المفضل
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#1A3C34]">{formatDate(date)}</dd>
                </div>
              )}
              {email && (
                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E0E5E4]">
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6B67]">
                    <Mail className="w-3.5 h-3.5" />
                    البريد الإلكتروني
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#1A3C34]" dir="ltr">
                    {email}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-6 p-3.5 rounded-xl bg-[#F1F7F6] border border-[#E0E5E4] text-xs leading-relaxed text-[#1A3C34]">
              <p className="font-bold">تقويم تجربتك مع خدمة بيت على Google</p>
              <p className="mt-1 text-[#5C6B67]">
                بعد قدوم الفريق وتنفيذ الخدمة، ستصلك دعوة من Google لتقييم تجربتك. تقييمك
                يساعدنا في تحسين خدماتنا ومساعدة عملاء جدد في قرارهم — شكراً لك مقدماً.
              </p>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { cta_location: 'confirmation_page' })}
                className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full font-extrabold text-sm text-[#1A3C34] bg-[#25D366] hover:bg-[#1EBE5D] transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                متابعة عبر واتساب
              </a>
              <a
                href={buildPhoneUrl()}
                onClick={() => trackEvent('phone_click', { cta_location: 'confirmation_page' })}
                className="inline-flex items-center justify-center py-3.5 px-5 rounded-full font-bold text-sm text-[#1A3C34] bg-white hover:bg-[#F1F7F6] border border-[#E0E5E4] transition-colors shadow-2xs"
              >
                اتصل: {BUSINESS_CONFIG.formattedPhoneDisplay}
              </a>
            </div>

            <a
              href="/"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0F6B5C] hover:text-[#0B5146] transition-colors"
            >
              العودة للصفحة الرئيسية
              <ArrowRight className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E0E5E4] py-5 text-center text-xs text-[#5C6B67]">
        خدمة بيت — خدمات منزلية في الدمام والخبر والمنطقة الشرقية • {BUSINESS_CONFIG.formattedPhoneDisplay}
      </footer>
    </div>
  );
};