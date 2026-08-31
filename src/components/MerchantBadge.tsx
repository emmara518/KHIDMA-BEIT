import React, { useEffect } from 'react';
import { BUSINESS_CONFIG } from '../config/business';

const WIDGET_SCRIPT_ID = 'merchantWidgetScript';
const STARTED_FLAG = '__khidmaMerchantBadgeStarted';

/**
 * Google Customer Reviews / Store Widget badge.
 * Loads the official gstatic script and starts the widget with the configured
 * merchant id, position and region. mobileBottomMargin keeps the badge clear of
 * the mobile sticky CTA bar.
 */
export const MerchantBadge: React.FC = () => {
  useEffect(() => {
    const merchantId = BUSINESS_CONFIG.googleMerchantId;
    if (!merchantId || typeof window === 'undefined') return;

    const windowRef = window as unknown as {
      merchantwidget?: { start: (config: Record<string, unknown>) => void };
    };

    const start = () => {
      if ((window as unknown as Record<string, unknown>)[STARTED_FLAG]) return;
      (window as unknown as Record<string, unknown>)[STARTED_FLAG] = true;
      const widget = windowRef.merchantwidget;
      if (widget && typeof widget.start === 'function') {
        widget.start({
          merchant_id: merchantId,
          position: BUSINESS_CONFIG.merchantWidgetPosition || 'LEFT_BOTTOM',
          region: BUSINESS_CONFIG.deliveryCountry || 'SA',
          bottomMargin: 36,
          mobileBottomMargin: 96,
        });
      }
    };

    const existing = document.getElementById(WIDGET_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (windowRef.merchantwidget) {
        start();
      } else {
        existing.addEventListener('load', start);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = WIDGET_SCRIPT_ID;
    script.src = 'https://www.gstatic.com/shopping/merchant/merchantwidget.js';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', start);
    document.head.appendChild(script);
  }, []);

  return null;
};