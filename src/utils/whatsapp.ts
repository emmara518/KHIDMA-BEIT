import { BUSINESS_CONFIG } from '../config/business';
import { WhatsAppUrlOptions } from '../types';

/**
 * Builds a standardized, pre-filled WhatsApp click-to-chat URL.
 * Ensures consistent messaging format across all conversion points.
 */
export function buildWhatsAppUrl(options: WhatsAppUrlOptions = {}): string {
  const { service, city, customMessage } = options;
  const phoneNumber = BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

  let text = 'السلام عليكم، أحتاج الاستفسار عن خدمات خدمة بيت.';

  if (customMessage) {
    text = customMessage;
  } else if (service && city) {
    text = `السلام عليكم، أحتاج خدمة ${service} في ${city}.`;
  } else if (service) {
    text = `السلام عليكم، أحتاج خدمة ${service}.`;
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}

/**
 * Builds a clean, tel: link for phone dialers.
 */
export function buildPhoneUrl(customPhone?: string): string {
  const phone = customPhone || BUSINESS_CONFIG.phone;
  const sanitized = phone.replace(/[^0-9+]/g, '');
  return `tel:+${sanitized.replace(/^\+/, '')}`;
}
