import { AnalyticsEventParams } from '../types';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventType =
  | 'whatsapp_click'
  | 'phone_click'
  | 'cta_click'
  | 'service_view'
  | 'location_click'
  | 'faq_expand'
  | 'share_feedback_click'
  | 'hero_booking_submit'
  | 'confirmation_view'
  | 'scope_calculator_submit'
  | 'city_tab_switch'
  | 'service_category_tab';

/**
 * Standardized, privacy-safe analytics dispatcher.
 * Never sends customer names, phone numbers, or WhatsApp message bodies.
 */
export function trackEvent(
  eventName: AnalyticsEventType,
  params: AnalyticsEventParams = {}
): void {
  try {
    const sanitizedParams: Record<string, unknown> = {
      event: eventName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
      timestamp: new Date().toISOString(),
      ...params,
    };

    // Remove any accidental personal information fields
    delete sanitizedParams.phone;
    delete sanitizedParams.name;
    delete sanitizedParams.message;

    // Dispatch to GTM dataLayer if present
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(sanitizedParams);
    }

    // Dispatch to GA4 gtag if present
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, sanitizedParams);
    }

    // Safe debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event] ${eventName}:`, sanitizedParams);
    }
  } catch (error) {
    // Fail silently in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Analytics tracking error:', error);
    }
  }
}
