import React from 'react';
import {
  BUSINESS_CONFIG,
  CITIES_DATA,
  SERVICES_DATA,
  FAQS_DATA,
  REVIEWS_DATA,
} from '../config/business';

/**
 * StructuredData Component
 * Dynamically constructs and injects valid Schema.org JSON-LD scripts
 * according to current business configuration, active cities, services, and FAQs.
 */
export const StructuredData: React.FC = () => {
  const currentOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://khidmabeit.com';

  // 1. Filter verified reviews (if any exist in business config)
  const verifiedReviews = REVIEWS_DATA.filter((r) => r.verified);

  // 2. Extract valid social links if provided
  const socialLinksArray: string[] = [];
  if (BUSINESS_CONFIG.socialLinks) {
    Object.values(BUSINESS_CONFIG.socialLinks).forEach((link) => {
      if (link && typeof link === 'string') {
        socialLinksArray.push(link);
      }
    });
  }

  // 3. Dynamic LocalBusiness / HomeAndConstructionBusiness Schema
  const localBusinessSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${currentOrigin}/#business`,
    name: BUSINESS_CONFIG.name,
    alternateName: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.descriptor}`,
    description: `خدمات منزلية متكاملة تشمل ${SERVICES_DATA.map((s) => s.name).join('، ')} في ${BUSINESS_CONFIG.region}.`,
    url: currentOrigin,
    telephone: `+${BUSINESS_CONFIG.phone}`,
    priceRange: '$$',
    image: `${currentOrigin}/icon.png`,
    address: {
      '@type': 'PostalAddress',
      ...(BUSINESS_CONFIG.address ? { streetAddress: BUSINESS_CONFIG.address } : {}),
      addressRegion: 'المنطقة الشرقية',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.4207,
      longitude: 50.0888,
    },
    areaServed: CITIES_DATA.map((city) => ({
      '@type': 'City',
      name: city.nameAr,
      alternateName: city.nameEn,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'المنطقة الشرقية',
        addressCountry: 'SA',
      },
    })),
    knowsAbout: SERVICES_DATA.map((s) => s.name),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'قائمة الخدمات المنزلية',
      itemListElement: SERVICES_DATA.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.shortDescription,
          serviceType: service.category || 'خدمات منزلية',
          provider: {
            '@type': 'HomeAndConstructionBusiness',
            name: BUSINESS_CONFIG.name,
          },
        },
      })),
    },
    ...(BUSINESS_CONFIG.email ? { email: BUSINESS_CONFIG.email } : {}),
    ...(BUSINESS_CONFIG.licenseNumber ? { taxID: BUSINESS_CONFIG.licenseNumber } : {}),
    ...(socialLinksArray.length > 0 ? { sameAs: socialLinksArray } : {}),
  };

  // Only attach review/rating if real verified reviews exist
  if (verifiedReviews.length > 0) {
    localBusinessSchema.review = verifiedReviews.map((rev) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.authorName,
      },
      reviewBody: rev.comment,
      ...(rev.serviceUsed
        ? {
            itemReviewed: {
              '@type': 'Service',
              name: rev.serviceUsed,
            },
          }
        : {}),
    }));
  }

  // 4. Dynamic FAQPage Schema
  const faqSchema =
    FAQS_DATA.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS_DATA.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  // 5. Dynamic WebSite Schema
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${currentOrigin}/#website`,
    url: currentOrigin,
    name: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.descriptor}`,
    description: `موقع ${BUSINESS_CONFIG.name} لخدمات المنازل في المنطقة الشرقية (الدمام، الخبر، القطيف، الظهران، سيهات، الجبيل، الأحساء).`,
    inLanguage: 'ar-SA',
    publisher: {
      '@id': `${currentOrigin}/#business`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
};

