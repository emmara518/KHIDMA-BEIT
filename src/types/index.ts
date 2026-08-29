export interface BusinessConfig {
  name: string;
  descriptor: string;
  phone: string;
  whatsappNumber: string;
  formattedPhoneDisplay: string;
  region: string;
  email?: string | null;
  address?: string | null;
  addressCity?: string | null;
  postalCode?: string | null;
  licenseNumber?: string | null;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
  } | null;
  yearsExperience?: number | null;
  guaranteeNote?: string | null;
  geo?: {
    latitude: number;
    longitude: number;
  } | null;
  mapsUrl?: string | null;
  mapsEmbedUrl?: string | null;
  openingHours?: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
    description?: string;
  } | null;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
  category?: string;
  categorySlug?: 'cleaning' | 'furniture' | 'ac_water' | 'pest_drain';
  highlights?: string[];
  estimatedTime?: string;
  startingPrice?: string | null;
}

export interface CityItem {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  isPopular?: boolean;
  descriptionNote?: string;
  popularDistricts?: string[];
}

export interface TrustPillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhyReason {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ProofItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  verified: boolean;
}

export interface BeforeAfterItem {
  id: string;
  serviceName: string;
  beforeImgUrl: string;
  afterImgUrl: string;
  verified: boolean;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  cityName?: string;
  serviceUsed?: string;
  comment: string;
  verified: boolean;
}

export interface WhatsAppUrlOptions {
  service?: string;
  city?: string;
  source?: string;
  customMessage?: string;
}

export interface AnalyticsEventParams {
  page_path?: string;
  service?: string;
  city?: string;
  cta_location?: string;
  [key: string]: unknown;
}
