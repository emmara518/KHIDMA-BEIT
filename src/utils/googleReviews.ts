import { BUSINESS_CONFIG } from '../config/business';

declare global {
  interface Window {
    gapi?: {
      load: (moduleName: string, callback: () => void) => void;
      surveyoptin: {
        render: (config: Record<string, unknown>) => void;
      };
    };
    renderOptIn?: () => void;
  }
}

/**
 * Loads the Google platform.js library exactly once and resolves when it is ready.
 * Mirrors the official snippet: <script src="https://apis.google.com/js/platform.js?onload=renderOptIn" async defer>
 */
let libraryPromise: Promise<void> | null = null;

export function loadGoogleReviewsLibrary(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.gapi && typeof window.gapi.load === 'function') return Promise.resolve();
  if (libraryPromise) return libraryPromise;

  libraryPromise = new Promise<void>((resolve) => {
    window.renderOptIn = () => resolve();
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
  return libraryPromise;
}

export interface GoogleReviewsOptInParams {
  orderId: string;
  email: string;
  deliveryCountry?: string;
  estimatedDeliveryDate: string;
  products?: Array<{
    gtin?: string;
    brand?: string;
    category?: string;
    name?: string;
    quantity?: number;
  }>;
}

/**
 * Renders the Google Customer Reviews survey opt-in (shown on the order confirmation page).
 * See https://support.google.com/merchants/answer/14629205
 */
export function renderGoogleReviewsOptIn(params: GoogleReviewsOptInParams): Promise<boolean> {
  return loadGoogleReviewsLibrary()
    .then(() => {
      const gapi = window.gapi;
      if (!gapi || typeof gapi.load !== 'function') return false;

      gapi.load('surveyoptin', () => {
        gapi.surveyoptin.render({
          merchant_id: BUSINESS_CONFIG.googleMerchantId,
          order_id: params.orderId,
          email: params.email,
          delivery_country: params.deliveryCountry || BUSINESS_CONFIG.deliveryCountry || 'SA',
          estimated_delivery_date: params.estimatedDeliveryDate,
          ...(params.products && params.products.length ? { products: params.products } : {}),
        });
      });
      return true;
    })
    .catch(() => false);
}

/**
 * Generates a short, human-friendly order reference for WhatsApp + Google Customer Reviews.
 */
export function generateOrderReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(Math.random() * 0xffff)
    .toString(36)
    .toUpperCase()
    .padStart(3, '0');
  return `KB-${stamp}${random}`;
}