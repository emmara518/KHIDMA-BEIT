import React from 'react';
import { BUSINESS_CONFIG } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { MapPin, ExternalLink, Clock, Navigation } from 'lucide-react';

const DEFAULT_GEO = {
  latitude: 26.4207,
  longitude: 50.0888,
};

function resolveGeo() {
  return BUSINESS_CONFIG.geo ?? DEFAULT_GEO;
}

function resolveMapsUrl(): string {
  if (BUSINESS_CONFIG.mapsUrl) {
    return BUSINESS_CONFIG.mapsUrl;
  }
  const geo = resolveGeo();
  return `https://www.google.com/maps/search/?api=1&query=${geo.latitude},${geo.longitude}`;
}

function resolveEmbedUrl(): string {
  if (BUSINESS_CONFIG.mapsEmbedUrl) {
    return BUSINESS_CONFIG.mapsEmbedUrl;
  }
  const geo = resolveGeo();
  return `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}&z=10&hl=ar&output=embed`;
}

export const LocationMap: React.FC = () => {
  const mapsUrl = resolveMapsUrl();
  const embedUrl = resolveEmbedUrl();
  const cityLabel = BUSINESS_CONFIG.addressCity || 'المنطقة الشرقية';

  const handleOpenMaps = () => {
    trackEvent('location_click', { cta_location: 'location_map', city: cityLabel });
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-white border-b border-[#E0E5E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text & Info Column */}
          <div className="lg:col-span-4 text-right space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F7F6] border border-[#E0E5E4] text-[#0F6B5C] text-xs font-bold shadow-2xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>موقعك على الخريطة</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3C34] tracking-tight border-r-4 border-[#0F6B5C] pr-4">
              نخدمك في {cityLabel} والمنطقة الشرقية
            </h2>

            <p className="text-sm sm:text-base text-[#5C6B67] leading-relaxed">
              تصل فرقنا الفنية إلى مختلف مدن وأحياء المنطقة الشرقية. افتح موقعك على خرائط جوجل لمعرفة أقرب خطوط خدمتنا، أو راسلنا مباشرة لتحديد موعدك.
            </p>

            {BUSINESS_CONFIG.openingHours?.description && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAFAF8] border border-[#E0E5E4]">
                <Clock className="w-5 h-5 text-[#0F6B5C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#1A3C34]">ساعات العمل</div>
                  <div className="text-xs text-[#5C6B67]">{BUSINESS_CONFIG.openingHours.description}</div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOpenMaps}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white bg-[#0F6B5C] hover:bg-[#0a5549] transition-colors shadow-sm"
                id="open-maps-btn"
              >
                <Navigation className="w-4 h-4" />
                <span>افتح في خرائط جوجل</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={buildWhatsAppUrl({ city: cityLabel, source: 'location_map' })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOpenMaps}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-[#1A3C34] bg-white hover:bg-[#F1F7F6] border border-[#E0E5E4] hover:border-[#0F6B5C]/40 transition-colors"
              >
                <span>احجز موعدك الآن</span>
              </a>
            </div>
          </div>

          {/* Map Embed Column */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl border border-[#E0E5E4] shadow-sm overflow-hidden bg-[#F1F7F6]">
              <iframe
                src={embedUrl}
                title={`خريطة مواقع عمل خدمة بيت في ${cityLabel} والمنطقة الشرقية`}
                width="100%"
                height="440"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block w-full h-[440px] border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};