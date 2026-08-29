import React from 'react';
import { StructuredData } from './components/StructuredData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { QuickServicePicker } from './components/QuickServicePicker';
import { WhyKhidmaBeit } from './components/WhyKhidmaBeit';
import { HowItWorks } from './components/HowItWorks';
import { ServiceAreas } from './components/ServiceAreas';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ProofSection } from './components/ProofSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#16211E]">
      {/* Structured Data / JSON-LD */}
      <StructuredData />

      {/* 1 — Header */}
      <Header />

      {/* Main Content Sections in exact specification order */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* 2 — Hero */}
        <Hero />

        {/* 3 — Trust Strip */}
        <TrustStrip />

        {/* 4 — Services */}
        <ServicesSection />

        {/* 5 — Quick Service CTA */}
        <QuickServicePicker />

        {/* 6 — Why Khidma Beit */}
        <WhyKhidmaBeit />

        {/* 7 — How It Works */}
        <HowItWorks />

        {/* 8 — Service Areas */}
        <ServiceAreas />

        {/* 9 — Before / After (Conditional) */}
        <BeforeAfterSection />

        {/* 10 — Trust / Proof (Conditional) */}
        <ProofSection />

        {/* 11 — Reviews & Feedback Invitation */}
        <ReviewsSection />

        {/* 12 — FAQ Accordion */}
        <FAQSection />

        {/* 13 — Final CTA */}
        <FinalCTA />
      </main>

      {/* 14 — Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Conversion Bar */}
      <MobileStickyBar />
    </div>
  );
}

